import React, { useContext, useState } from 'react';
import { PlayerContext } from '../context/PlayerContext';
import ProgressOverlay from './ProgressOverlay';

// Box-Muller 방법으로 표준 정규분포 샘플링
function gaussianRandom() {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

export default function LevelCard({ level }) {
  const { playerSkill, levelSkills, improveGlobalSkill, improveLevelSkill } = useContext(PlayerContext);
  const [best, setBest] = useState(0);
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);

  // 레벨별 현재 스킬 (없으면 1)
  const lvlSkill = levelSkills[level.id] || 1;
  const targetSkill = level.baseSkill * Math.pow(level.difficulty, level.id);
  const skillRatio = lvlSkill / targetSkill;

  const attempt = () => {
    if (running) return;
    setRunning(true);
    setProgress(0);

    // 로그노말 분포로 진행도 샘플링
    const k = 6.5;
    const sigma = 1.0;
    const mu = Math.log(skillRatio / k);
    const raw = Math.exp(mu + sigma * gaussianRandom());
    const sample = Math.min(1, raw);
    const finalPercent = sample * 100;

    const duration = (90 * finalPercent) / 100;
    const steps = Math.ceil(duration);
    let elapsed = 0;

    const interval = setInterval(() => {
      elapsed += 1 / 20;
      setProgress((finalPercent * elapsed) / steps);
      if (elapsed >= steps) {
        clearInterval(interval);
        setRunning(false);
        setBest(prev => Math.max(prev, finalPercent));
        // 스킬 증가: 글로벌 및 레벨별
        improveGlobalSkill(1 / 10000);
        improveLevelSkill(level.id, 1 / 100);
      }
    }, 16);
  };

  return (
    <div className="card border p-4 rounded shadow">
      <h3 className="font-semibold mb-1">{level.name}</h3>
      <p className="text-sm">Required Skill: {targetSkill.toFixed(1)}</p>
      <p className="text-sm">Level Skill: {lvlSkill.toFixed(2)}</p>
      <p className="text-sm mb-2">Best: {best.toFixed(1)}%</p>
      <button
        className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50 mb-2"
        onClick={attempt}
        disabled={running}
      >
        {running ? 'Running...' : 'Attempt'}
      </button>
      {running && <ProgressOverlay progress={progress} />}
    </div>
  );
}