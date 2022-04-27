
import Web3 from 'web3';
import { useEffect, useState } from 'react';
import ImportAccount from "./ImportAccount.js";
const web3 = new Web3('http://localhost:8545');

function App() {
  const [privateKey, setprivateKey]= useState('')
  const [password, setPassword] = useState('');

  // console.log('wallet is', thulasiWallet1['0'].address, thulasiWallet2['0'].address,);
  useEffect(() => {
    // addWallet()
    // addWallet();
  }, []);
  const createWallet = async () => {
    if (password) {
      const thulasiWallet1 = web3.eth.accounts.wallet.create(1, password);
      // const thulasiWallet2 = web3.eth.accounts.wallet.create(1, 'ss');
      // console.log('add wallet ',await web3.eth.accounts.wallet.add(privateKey));
      // console.log('walelt added ',  thulasiWallet1.add(thulasiWallet2['0'].privateKey))
      // console.log(await web3.eth.getAccounts())
      console.log('save wallet ', web3.eth.accounts.wallet.save(password, 'add'))
      // console.log('wallet load', await wallet.clear('wallet'))
      console.log('load wallet ', web3.eth.accounts.wallet.load(password, 'add'))
    } else {
      alert('Please type password');
    }
  }
  const addAccountToWallet = () => {
    try {
      let wallet = web3.eth.accounts.wallet.load(password, 'add');
     let account = web3.eth.accounts.create();
     wallet.add(account.privateKey);
     web3.eth.accounts.wallet.save(password, 'add')
     console.log(web3.eth.accounts.wallet.load(password, 'add'))
    } catch (error) {
      console.log('error in add account to wallet', error.message, error.stack)
    }
  }

  const showWallet = () => {
    console.log(web3.eth.accounts.wallet.load(password, 'add'));
  }

  return (
    <div className="App">
      <label>Password</label>
      <input type='text' value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={createWallet}>Create Wallet</button>
      <button onClick={addAccountToWallet}>Add Account to Wallet</button>
      <button onClick={showWallet}>Show Wallet</button>
      <input type="text" value={privateKey} onChange={(e) => setprivateKey(e.target.value)}/>
      <ImportAccount privateKey={privateKey} />
    </div>
  );
}

export default App;
