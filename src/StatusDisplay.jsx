import React from 'react';

function StatusDisplay({ deploymentStatus, txHash, contractAddress }) {
  if (!deploymentStatus) return null;

  return (
    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
      <h3 className="font-semibold text-blue-800 mb-2">Status</h3>
      <p className="text-blue-700">{deploymentStatus}</p>
      
      {txHash && (
        <div className="mt-2">
          <span className="text-sm font-medium text-blue-800">Transaction Hash:</span>
          <p className="text-sm text-blue-600 break-all">{txHash}</p>
        </div>
      )}
      
      {contractAddress && (
        <div className="mt-2">
          <span className="text-sm font-medium text-blue-800">Contract Address:</span>
          <p className="text-sm text-blue-600 break-all">{contractAddress}</p>
        </div>
      )}
    </div>
  );
}

export default StatusDisplay;