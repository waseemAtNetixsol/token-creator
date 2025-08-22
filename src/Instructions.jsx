import React from 'react';

function Instructions() {
  return (
    <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
      <h3 className="font-semibold text-yellow-800 mb-2">Instructions</h3>
      <ul className="text-sm text-yellow-700 space-y-1">
        <li>• Connect your wallet using the button above</li>
        <li>• Paste your contract bytecode (compilation output)</li>
        <li>• If constructor requires parameters, encode them and add to constructor params field</li>
        <li>• Adjust gas limit if needed (default: 2,000,000)</li>
        <li>• Click Deploy Contract to deploy</li>
      </ul>
    </div>
  );
}

export default Instructions;