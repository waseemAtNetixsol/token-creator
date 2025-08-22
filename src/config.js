import { QueryClient } from '@tanstack/react-query';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { arbitrum, mainnet, polygon } from 'wagmi/chains';

// Configuration
export const projectId = '3967f2b7d8494757a6032585f17d11cd';

// Custom Kasplex testnet chain
const kasplexTestnet = {
  id: 167012,
  name: 'Kasplex Testnet',
  network: 'kasplex-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Kasplex',
    symbol: 'KAS',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.kasplextest.xyz'],
    },
    public: {
      http: ['https://rpc.kasplextest.xyz'],
    },
  },  
};

export const metadata = {
  name: 'Token Deployer',
  description: 'Deploy tokens using bytecode',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
};

export const chains = [mainnet, arbitrum, polygon, kasplexTestnet];
export const queryClient = new QueryClient();
export const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

// Initialize Web3Modal
createWeb3Modal({ wagmiConfig, projectId });