import React from 'react';

function DeploymentForm({ 
  bytecode, 
  setBytecode,
  constructorParams,
  setConstructorParams,
  gasLimit,
  setGasLimit,
  gasPrice,
  setGasPrice,
  onDeploy,
  onReset,
  isDeploying,
  isConnected 
}) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Contract Bytecode *
        </label>
        <textarea
          value={bytecode}
          onChange={(e) => setBytecode(e.target.value)}
          className="w-full h-32 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter contract bytecode (with or without 0x prefix)"
          disabled={isDeploying}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Constructor Parameters (ABI Encoded)
        </label>
        <input
          type="text"
          value={constructorParams}
          onChange={(e) => setConstructorParams(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="0x... (optional, if constructor requires parameters)"
          disabled={isDeploying}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gas Limit
          </label>
          <input
            type="number"
            value={gasLimit}
            onChange={(e) => setGasLimit(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="2000000"
            disabled={isDeploying}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gas Price (wei, optional)
          </label>
          <input
            type="number"
            value={gasPrice}
            onChange={(e) => setGasPrice(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Leave empty for auto"
            disabled={isDeploying}
          />
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onDeploy}
          disabled={!isConnected || isDeploying}
          className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-md transition-colors"
        >
          {isDeploying ? 'Deploying...' : 'Deploy Contract'}
        </button>
        
        <button
          onClick={onReset}
          disabled={isDeploying}
          className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-50 disabled:opacity-50 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default DeploymentForm;