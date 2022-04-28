import Web3 from 'web3';
import { useState } from 'react';
const web3 = new Web3('http://localhost:8545');

 const ImportAccount = ({privateKey}) => {
     const [afterImport, setAfterImport]=useState(false)
     const importAccountFromPkey = () => {
         try {
            let newAccount = web3.eth.accounts.privateKeyToAccount(privateKey);        
            console.log("import success", newAccount)
            setAfterImport(true)
         } catch (error) {
              alert('Entered private key is wrong',error);
         }
     }    
    return(
        <>
        <button onClick={importAccountFromPkey}> Import </button>
        {afterImport && <p>Imported new account succesfully..!</p>}
        </>
    )
}

export default ImportAccount;