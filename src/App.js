
import Web3 from 'web3';
import { useEffect } from 'react';
const web3 = new Web3('http://localhost:8545');



function App() {
  

// console.log('wallet is', thulasiWallet1['0'].address, thulasiWallet2['0'].address,);
  useEffect(()=> {
      // addWallet()
      // addWallet();
  }, []);
  const addwallet = async () =>{
    const thulasiWallet1 = web3.eth.accounts.wallet.create(1, 'suriya ss');
const thulasiWallet2 = web3.eth.accounts.wallet.create(1, 'ss');
    // console.log('add wallet ',await web3.eth.accounts.wallet.add(privateKey));
    console.log('walelt added ',  thulasiWallet1.add(thulasiWallet2['0'].privateKey))
    // console.log(await web3.eth.getAccounts())
     console.log('save wallet ',web3.eth.accounts.wallet.save('suriya ss'))
    // console.log('wallet load', await wallet.clear('wallet'))
    console.log('total ', web3.eth.accounts.wallet.load('suriya ss', 'myWalletKey'))
}
  return (
    <div className="App">
     <button onClick={addwallet}>Save</button>
    </div>
  );
}

export default App;
