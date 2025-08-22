import React, { useState } from 'react';
import { useAccount, usePublicClient, useWalletClient } from 'wagmi';
import Header from './Header';
import WalletConnector from './WalletConnector';
import DeploymentForm from './DeploymentForm';
import StatusDisplay from './StatusDisplay';
import Instructions from './Instructions';

function TokenDeployer() {
  const [bytecode, setBytecode] = useState('');
  const [constructorParams, setConstructorParams] = useState('');
  const [gasLimit, setGasLimit] = useState('2000000');
  const [gasPrice, setGasPrice] = useState('');
  const [deploymentStatus, setDeploymentStatus] = useState('');
  const [txHash, setTxHash] = useState('');
  const [contractAddress, setContractAddress] = useState('');
  const [isDeploying, setIsDeploying] = useState(false);

  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();

  const deployContract = async () => {
    if (!isConnected || !walletClient) {
      setDeploymentStatus('Please connect your wallet first');
      return;
    }

    if (!bytecode) {
      setDeploymentStatus('Please enter bytecode');
      return;
    }

    setIsDeploying(true);
    setDeploymentStatus('Preparing deployment...');

    try {
      // Clean bytecode (remove 0x if present)
      let cleanBytecode = bytecode.trim();
      if (cleanBytecode.startsWith('0x')) {
        cleanBytecode = cleanBytecode.slice(2);
      }

      // Prepare constructor parameters if provided
      let fullBytecode = cleanBytecode;
      if (constructorParams) {
        let cleanParams = constructorParams.trim();
        if (cleanParams.startsWith('0x')) {
          cleanParams = cleanParams.slice(2);
        }
        fullBytecode = cleanBytecode + cleanParams;
      }

      setDeploymentStatus('Sending transaction...');

      // Deploy contract using wallet client
      const hash = await walletClient.sendTransaction({
        data: `0x${fullBytecode}`,
        gas: BigInt(gasLimit),
        gasPrice: gasPrice ? BigInt(gasPrice) : undefined,
      });

      setTxHash(hash);
      setDeploymentStatus('Transaction sent. Waiting for confirmation...');

      // Wait for transaction receipt
      const receipt = await publicClient.waitForTransactionReceipt({ hash });

      if (receipt.status === 'success') {
        setContractAddress(receipt.contractAddress || '');
        setDeploymentStatus('Contract deployed successfully!');
      } else {
        setDeploymentStatus('Transaction failed');
      }
    } catch (error) {
      console.error('Deployment error:', error);
      setDeploymentStatus(`Deployment failed: ${error.message || 'Unknown error'}`);
    } finally {
      setIsDeploying(false);
    }
  };

  const resetForm = () => {
    setBytecode('');
    setConstructorParams('');
    setGasLimit('2000000');
    setGasPrice('');
    setDeploymentStatus('');
    setTxHash('');
    setContractAddress('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <Header />
          
          <WalletConnector />

          <DeploymentForm
            bytecode={bytecode}
            setBytecode={setBytecode}
            constructorParams={constructorParams}
            setConstructorParams={setConstructorParams}
            gasLimit={gasLimit}
            setGasLimit={setGasLimit}
            gasPrice={gasPrice}
            setGasPrice={setGasPrice}
            onDeploy={deployContract}
            onReset={resetForm}
            isDeploying={isDeploying}
            isConnected={isConnected}
          />

          <StatusDisplay 
            deploymentStatus={deploymentStatus}
            txHash={txHash}
            contractAddress={contractAddress}
          />

          <Instructions />
        </div>
      </div>
    </div>
  );
}

export default TokenDeployer;