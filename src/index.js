import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'
import { bscTestnet } from 'viem/chains'
import { WagmiConfig } from 'wagmi';


const root = ReactDOM.createRoot(document.getElementById('root'));
// 1. Get projectId at https://cloud.walletconnect.com
const projectId = '094f792bdb976987a70ebccdc0f7f7d1'

// 2. Create wagmiConfig
const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [bscTestnet]
const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  enableAnalytics: true // Optional - defaults to your Cloud configuration
})

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains })
root.render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
     <App />
    </WagmiConfig>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
