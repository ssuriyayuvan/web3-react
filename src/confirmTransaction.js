import Web3 from 'web3';
import { useState } from 'react';
const web3 = new Web3('http://localhost:8545');

const ConfirmTransaction = ({ tx, password }) => {
	
    const [acknowledge,setacknowledge] =useState(false);

    const signTransaction = async() =>{
        try {
            delete tx.type;
        const loadAccount =  web3.eth.accounts.wallet.load(password,"magnetar_wallet")
        console.log('err', loadAccount[0].privateKey, tx)
        const privateKey = loadAccount[0].privateKey
        const signedtx = await web3.eth.accounts.signTransaction(tx, privateKey)
        console.log('signed transaction',signedtx)
        setacknowledge(true)
        } catch (error) {
            console.log('err...', error.message);
            // alert("wrong signature", error.message)
        }
     
    }
		return(
            <>
            <button onClick={signTransaction}> confirm </button>
            {acknowledge && <p>signed successfully</p>}
            </>
        );
}
export default ConfirmTransaction