import React from 'react';

export default function ProgressOverlay({ progress }) {
  return (
    <div className="overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow">
        <p className="text-lg font-semibold">{progress.toFixed(1)}%</p>
      </div>
    </div>
  );
}
