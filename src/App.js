import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Web3 from 'web3';
import { useEffect, useState } from 'react';
import Buy from './pages/Buy';
import Profile from './pages/Profile';
import Home from './pages/Home';

const web3 = new Web3(window.ethereum);

function App() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState(null);

  const connectWallet = async () => {
    try {
      let account = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      const balance = await web3.eth.getBalance(account[0]);
      setAccount(account[0]);
      setBalance(balance);

      window.ethereum.on('accountsChanged', async (changedAccount) => {
        const balance = await web3.eth.getBalance(changedAccount[0]);
        setAccount(changedAccount[0]);
        setBalance(balance);
      });

      setError(null);
    } catch (error) {
      setError('Please log in to one of your accounts');
    }
  };

  useEffect(() => {
    if (!window.ethereum.isMetaMask) {
      setError('Please install MetaMask wallet to continue...');
      return;
    }
  }, [balance]);

  return (
    <div className='App'>
      {error && error}
      <Router>
        <Routes>
          <Route
            path='/'
            element={
              <Home
                connectWallet={connectWallet}
                balance={balance}
                account={account}
              />
            }
          />
          <Route
            path='/buy-token/:walletAddress'
            element={<Buy account={account} balance={balance} />}
          />
          <Route
            path='/profile'
            element={<Profile web3={web3} account={account} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
