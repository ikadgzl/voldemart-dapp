import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ account, balance, connectWallet }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (balance) {
      Number(balance) === 0
        ? navigate('/profile')
        : navigate(`/buy-token/${account}`);
    }
  }, [balance, account, navigate]);

  return (
    <div>
      Please connect to your wallet, you will be redirected afterwards...
      {!account && <button onClick={connectWallet}>Connect Wallet</button>}
    </div>
  );
};

export default Home;
