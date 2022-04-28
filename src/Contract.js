import axios from 'axios';
import React, { useState } from 'react'
import Web3 from 'web3';
const URL = 'https://api.etherscan.io/api?module=contract&action=getabi&address=';
const web3 = new Web3('https://mainnet.infura.io/v3/35a21f83c4bb4ff28cb99ce7f2c051ee');


function Contract() {

    const [contractAddress, setContractAddress] = useState('');
    const [symbol, setSymbol] = useState('');
    const [decimal, setDecimal] = useState('');

    const importContract = async() => {
        let {data} = await axios.get(`${URL}${contractAddress}`);
        let abi = JSON.parse(data.result);
        let conractInstance = new web3.eth.Contract(abi, contractAddress);
        let symbol = await conractInstance.methods.symbol().call();
        let decimal = await conractInstance.methods.decimals().call();
        setSymbol(symbol); setDecimal(decimal);
    }

  return (
    <>
    <input type={'text'} onChange={(e)=> setContractAddress(e.target.value)} />
        <button onClick={importContract} >Import Contract</button> <br />
    <label>Address: {contractAddress}</label> <br />
    <label>Symbol: {symbol} </label> <br />
    <label>Decimal: {decimal} </label> <br />
    </>
  )
}

export default Contract