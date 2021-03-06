import { useState } from 'react';

const Profile = ({ account, web3 }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    web3.eth.sign(web3.utils.keccak256(username), account).then(console.log);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Wallet adress:
          <input type='text' value={account} disabled />
        </label>
        <label>
          Username:
          <input
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>

        <button type='submit'>Save</button>
      </form>
    </div>
  );
};

export default Profile;
