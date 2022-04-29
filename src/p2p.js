import Web3 from 'web3';
import { useState } from 'react';
const web3 = new Web3('http://localhost:8545');

const p2p = ({to, value, privateKey, publicAddress}) =>{
     
    const [alert,setAlert] =useState(false);
    const p2pTransfer = async() => {
    const nonce = await web3.eth.getTransactionCount(publicAddress, 'latest'); // nonce starts counting from 0
    const transaction = {
     'to': to, // faucet address to return eth
     'value': value,
     'gas': 30000,
     'maxFeePerGas': 1000000108,
     'nonce': nonce,
     // optional data field to send message or execute smart contract
    };
    const signedTx = await web3.eth.accounts.signTransaction(transaction, privateKey);
    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
        if (!error) {
        console.log(":tada: The hash of your transaction is: ", hash, "\n Check etherscan to view the status of your transaction!");
      } else {
        alert(":exclamation:Something went wrong while submitting your transaction:", error)
      }
    setAlert(true)
   }
   );
   return(
        <>
            <button onClick={p2pTransfer}> Transfer ETH </button>
            {alert && <p>Transfered successfully</p>}
        </>
        );
}
}
export default p2p