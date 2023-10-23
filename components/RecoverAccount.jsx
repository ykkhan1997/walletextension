'use client'
import React,{useContext} from 'react'
import { BulbOutlined } from '@ant-design/icons';
import { Button,Input } from 'antd';
import { useState } from 'react';
import { ethers } from 'ethers';
import Style from './styles/Recover.module.css';
import { MainContext } from '@/app/main/page'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
const {TextArea}=Input;
const RecoverAccount = () => {
  const {setWallet,setSeedPhrase}=useContext(MainContext);
  const router=useRouter();
  const [typeSeed,setTypeSeed]=useState("");
  const [nonValid,setNonValid]=useState(false);
  const seedAdjust=(e)=>{
    setNonValid(false);
    setTypeSeed(e.target.value);
  }
  const recoverWallet=()=>{
    let recoverWallet;
    try {
      recoverWallet=ethers.Wallet.fromPhrase(typeSeed);
    } catch (error) {
      setNonValid(true);
      return;
    }
    setSeedPhrase(typeSeed);
    setWallet(recoverWallet.address);
    router.push('/createAccount');
    return;

  }
  return (
    <>
    <div className={Style.Content}>
      <div className={Style.Menmonic}>
        <BulbOutlined style={{fontSize:'20px'}}/>
      <div>
        Type Your Seed Phrase in the field below to recover your wallet (it shoul inclue 12 words separate with spaces)
      </div>
      </div>
      <TextArea
      value={typeSeed}
      onChange={seedAdjust}
      rows={4}
      className={Style.SeedPhraseContainer}
      placeholder='Type your seed phrase here'
      />
      <Button
      disabled={typeSeed.split(" ").length!==12 ||typeSeed.slice(-1)===' '}
      className={Style.frontPageButton}
      onClick={()=>{recoverWallet()}}
      type='primary'
      >
        Recover Wallet
      </Button>
      {nonValid && <p style={{color:'red'}}>Invalid Seed Phrase</p>}
      <Link className={Style.frontPageBottom} href={{pathname:'/'}}>
        <span style={{cursor:'pointer'}}>Back Home</span>
      </Link>
    </div>
    </>
    
  )
}

export default RecoverAccount