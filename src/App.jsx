import React from 'react';
import { WagmiProvider } from 'wagmi';
import { QueryClientProvider } from '@tanstack/react-query';
import { wagmiConfig, queryClient } from './config';
import TokenDeployer from './TokenDeployer';

function App() {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <TokenDeployer />
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;