import React, { useContext } from 'react';
import { PlayerProvider, PlayerContext } from './context/PlayerContext';
import LevelSelect from './components/LevelSelect';

function AppContent() {
  const { playerSkill } = useContext(PlayerContext);
  return (
    <div className="app-container">
      <header className="header p-4 bg-gray-800 text-white flex justify-between items-center">
        <h1 className="text-xl font-bold">Average GD Player:</h1>
        <div>Skill: {playerSkill.toFixed(2)}</div>
      </header>
      <main className="p-4">
        <LevelSelect />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <PlayerProvider>
      <AppContent />
    </PlayerProvider>
  );
}

