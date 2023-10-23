'use client'
import { MainContext } from '@/app/main/page';
import React,{useState,useContext, useEffect} from 'react'
import { Button,Card } from 'antd';
import {ExclamationCircleOutlined} from '@ant-design/icons';
import Style from './styles/CreateAccount.module.css';
import { useRouter } from 'next/navigation';
import { ethers } from 'ethers';
const CreateAccount = () => {
  const {setWallet,setSeedPhrase}=useContext(MainContext);
  const router=useRouter();
  const [newSeedPhrase,setNewSeedPhrase]=useState(null);
  const generateWallet=()=>{
    const mnemonic=ethers.Wallet.createRandom().mnemonic.phrase;
    setNewSeedPhrase(mnemonic);
  }
  const setWalletAndMenmonic=()=>{
    setSeedPhrase(newSeedPhrase);
    setWallet(ethers.Wallet.fromPhrase(newSeedPhrase).address);
  }
  return (
    <div className={Style.Content}>
      <div className={Style.Mnemonic}>
      <ExclamationCircleOutlined style={{fontSize:'20px'}}/>
      <div>
        Once you generate the seed phrase,save it securely in order to recover your wallet in the futuer.
      </div>
      </div>
      <Button className={Style.frontPageButton}
      type='primary'
      onClick={()=>generateWallet()}
      >
        Generate Seed Phrase
      </Button>
      <Card className={Style.seedPhraseContainer}>
        {newSeedPhrase && <pre style={{whiteSpace:'pre-wrap'}}>{newSeedPhrase}</pre>}
      </Card>
      <Button className={Style.frontPageButton}
      type='default'
      onClick={()=>setWalletAndMenmonic()}
      >
        Open Your New Wallet
      </Button>
      <p className={Style.frontPageButton} onClick={()=>{router.push('/')}}>Back Home</p>
    </div>
  )
}

export default CreateAccount