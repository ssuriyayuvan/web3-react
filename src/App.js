
import Web3 from 'web3';
import { useEffect, useState } from 'react';
const web3 = new Web3('https://ropsten.infura.io/v3/35a21f83c4bb4ff28cb99ce7f2c051ee');
const WALLET_NAME = 'magnetar_wallet';


function App() {

  const [password, setPassword] = useState('');
  const [list, setList] = useState([]);
  const [importKey, setImportKey] = useState('');

  // console.log('wallet is', thulasiWallet1['0'].address, thulasiWallet2['0'].address,);
  useEffect(() => {
    // addWallet()
    // addWallet();
  }, []);
  const createWallet = async () => {
    if (password) {
      const thulasiWallet1 =  web3.eth.accounts.wallet.create(1);
      const encrypted = thulasiWallet1.encrypt('myJSONenc');
     const savedWallet =  web3.eth.accounts.wallet.save(password, WALLET_NAME);
     console.log('encrypted json',JSON.stringify(encrypted));
     console.log('save wallet', savedWallet)
      console.log(thulasiWallet1)
     
      // console.log('wallet load', await wallet.clear('wallet'))
      // console.log('load wallet ', web3.eth.accounts.wallet.load(password, 'add'))
    } else {
      alert('Please type password');
    }
  }
  const addAccountToWallet = () => {
    try {
      let wallet = web3.eth.accounts.wallet.load(password, WALLET_NAME);
     let account = web3.eth.accounts.create();
     wallet.add(account.privateKey);
     wallet.encrypt('NewWallet');
     console.log(wallet.save(password, WALLET_NAME))
     console.log(wallet.load(password, WALLET_NAME))
    } catch (error) {
      console.log('error in add account to wallet', error.message, error.stack)
    }
  }

  const showWallet =async  () => {
    // console.log(web3.eth.accounts.wallet.load(password, WALLET_NAME));
    let data = await web3.eth.accounts.wallet.load(password, WALLET_NAME);
      console.log('wallet list is ', data.length, data[0])
      let temp = []
      for (let i = 0; i < data.length; i++) {
        data[i].balance = await web3.eth.getBalance(data[i].address)
        temp.push(data[i])
      }
      setList(temp)
  }

  const importFromPrivateKey = () => {
    try {
      if(importKey) {
        let data = web3.eth.accounts.privateKeyToAccount(importKey);
       let addtoWallet =  web3.eth.accounts.wallet.add({
          address: data.address, privateKey: data.privateKey
        });
        web3.eth.accounts.wallet.save(password, WALLET_NAME);
        // addtoWalle
        console.log('data is', data)
      } else {
        alert('Please enter private key to import')
      }
     
    } catch (error) {
      alert('Wrong private key');
    }
  }

  return (
    <div className="App">
      <label>Password</label>
      <input type='text' value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={createWallet}>Create Wallet</button>
      <button onClick={addAccountToWallet}>Add Account to Wallet</button>
      <button onClick={showWallet}>Show Wallet</button><br />
      <label>Import Key</label>
      <input type={'text'} onChange={(e)=> setImportKey(e.target.value)} />
      <button onClick={importFromPrivateKey} >Import Account</button>
      <h2>Account List</h2>
      <table>
      <thead>
        <tr>
            <th>SI #</th>
            <th>Address</th>
            <th>Private Key</th>
            <th>Balance Key</th>
        </tr>
        </thead>
        <tbody>
      {list.length > 0 ? list.map((ele, i)=> {
        console.log(ele)
        return (
         <tr key={i}>
           <td>{i+1}</td>
           <td>{ele.address}</td>
           <td>{ele.privateKey}</td>
           <td>{web3.utils.fromWei(ele.balance, 'ether')}</td>
         </tr>
        )
      }) : <tr><td></td><td>No Account Found.</td><td></td></tr>}
      </tbody>
      </table>
    </div>
  );
}

export default App;
