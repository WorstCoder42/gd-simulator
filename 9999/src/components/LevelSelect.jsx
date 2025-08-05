import React from 'react';
import LevelCard from './LevelCard';
import { officialLevels } from '../data/levels';

export default function LevelSelect() {
  return (
    <div className="grid grid-cols-3 gap-6">
      {officialLevels.map(level => (
        <LevelCard key={level.id} level={level} />
      ))}
    </div>
  );
}