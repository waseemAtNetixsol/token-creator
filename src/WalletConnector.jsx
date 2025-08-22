import React from 'react';
import { useAccount } from 'wagmi';

function WalletConnector() {
  const { address, isConnected } = useAccount();

  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Wallet Connection</h2>
      {isConnected ? (
        <div className="flex items-center justify-between">
          <span className="text-green-600">
            Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
          </span>
          <w3m-button />
        </div>
      ) : (
        <w3m-button />
      )}
    </div>
  );
}

export default WalletConnector;