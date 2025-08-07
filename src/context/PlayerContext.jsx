import React, { createContext, useState } from 'react';

export const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const [playerSkill, setPlayerSkill] = useState(1);
  // levelSkills: { [levelId]: skill }
  const [levelSkills, setLevelSkills] = useState({});

  const improveGlobalSkill = (amount) => setPlayerSkill(prev => prev + amount);
  const improveLevelSkill = (levelId, amount) => {
    setLevelSkills(prev => ({
      ...prev,
      [levelId]: (prev[levelId] || 1) + amount
    }));
  };

  return (
    <PlayerContext.Provider value={{
      playerSkill,
      levelSkills,
      improveGlobalSkill,
      improveLevelSkill
    }}>
      {children}
    </PlayerContext.Provider>
  );
}
