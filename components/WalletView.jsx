'use client'
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { NFT1,NFT2, NoImage } from "@/public";
import Image from "next/image";
import axios from 'axios';
import {
  Divider,
  Tooltip,
  List,
  Avatar,
  Spin,
  Tabs,
  Input,
  Button,
} from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import Style from "./styles/WalletView.module.css";
import { Chain_Config } from "@/chain";
import { ethers } from "ethers";
// const token =[
//   {
//     symbol: "ETH",
//     name: "Ethereum",
//     balance: 100000000000,
//     decimals: 18,
//   },
//   {
//     symbol: "Link",
//     name: "Chainlink",
//     balance: 100000000000,
//     decimals: 18,
//   },
//   {
//     symbol: "UNI",
//     name: "Uniswap",
//     balance: 1000000000000,
//     decimals: 18,
//   },
// ];
// const nfts = [
//   {
//     value:NFT1
//   },
//   {
//     value:NFT2
//   }
// ];
const WalletView = ({ wallet, setWallet, seedPhrase, setSeedPhrase,selectedChain}) => {
  const [tokens,setTokens]=useState(null);
  const [nfts,setNfts]=useState(null);
  const [balance,setBalance]=useState(0);
  const [fetching,setFetching]=useState(true);
  const [amountSend,setAmountSend]=useState(null);
  const [sendAddress,setSendAddress]=useState(null);
  const [processing,setProcessing]=useState(false);
  const [hash,setHash]=useState(null);
  const router=useRouter();
  const items=[
    {
      key:'3',
      label:'Token',
      children:(
        <>
        {
          tokens?(
            <>
            <List
            bordered
            itemLayout='horizontal'
            dataSource={tokens}
            renderItem={(item,index)=>(
              <List.Item style={{textAlign:'left'}}>
                <List.Item.Meta
                avatar={<Avatar src={`${item.logo}&key=${index}`}/>}
                title={item.symbol}
                description={item.name}
                />
                <div>
                  {(
                    Number(item.balance)/10**Number(item.decimals)
                  ).toFixed(2)}{" "}
                  Tokens
                </div>
              </List.Item>
            )}
            />
            </>
          ):(
            <>
            <span>Seem you don't have any token yet</span>
            <p className={Style.frontPageBottom}>
              Find Alt coin GEMS:{' '}
              <a
              href="https://morailsmoney.com/"
              target="_blank"
              rel="noreference"
              >
                money.morails.io
              </a>
            </p>
            </>
          )
        }
        </>
      )
    },
    {
      key:'2',
      label:'NFT',
      children:(
        <>
        {
          nfts? (nfts.map((el,i)=>{
            return(
              <>
              {
                el && 
                <Image key={i} src={el.value}
                alt="nftImage" className={Style.nftImage} width={300} height={300}/>
              }
              </>
  
            )
          })):(
            <>
            <span>Seem you don't have any token yet</span>
            <p className={Style.frontPageBottom}>
              Find Alt coin GEMS:{' '}
              <a
              href="https://morailsmoney.com/"
              target="_blank"
              rel="noreference"
              >
                money.morails.io
              </a>
            </p>
            </>
          )
        }
        </>
      )
    },
    {
      key:'1',
      label:'Transfer',
      children:(
        <>
        <h3>Native Balance</h3>
        <h1>
          {balance} {Chain_Config[selectedChain].ticker}
        </h1>
        <div className={Style.sendRow}>
          <p style={{width:'90px',textAlign:'left'}}>To:</p>
          <Input
          placeholder="0x0000"
          value={sendAddress}
          onChange={(e)=>setSendAddress(e.target.value)}
          />
        </div>
        <div className={Style.sendRow}>
          <p style={{width:'90px',textAlign:'left'}}>Amount:</p>
          <Input
          placeholder="Please enter amount to send"
          value={amountSend}
          onChange={(e)=>setAmountSend(e.target.value)}
          />
        </div>
        <Button
        type="primary"
        style={{width:'100%',marginTop:'20px',marginBottom:'20px'}}
        onClick={()=>sendTransaction(sendAddress,amountSend)}
        >
          Send Token
        </Button>
        {
          processing && (
            <>
            <Spin/>
            {
              hash && (
                <Tooltip title={hash}><p>Hover for Trx Hash</p></Tooltip>
              )
            }
            </>
          )
        }
        </>
      )
    }
  ]

  let res;
  const getAccountToken=async()=>{
    setFetching(true);
    try {
      res=await axios.get(`https://joyful-kitsune-e3749f.netlify.app/getTokens`,{
        params:{
          userAddress:wallet,
          chain:selectedChain
        }
      });
      const response=res.data;
      if(response.tokens.length>0){
        setTokens(response.tokens);
      }
      if(response.nft.length>0){
        setNfts(response.nft);
      }
      setBalance(response.balances);
      setFetching(false);
    } catch (error) {
      console.log(error);
    }
  }
  const sendTransaction=async(to,amount)=>{
    const chain=Chain_Config[selectedChain];
    const provider=new ethers.JsonRpcProvider(chain.rpcUrl);
    const privateKey=ethers.Wallet.fromPhrase(seedPhrase).privateKey;
    const wallets=new ethers.Wallet(privateKey,provider);
    const tx={
      to:to,
      value:ethers.parseEther(amount)
    }
    try {
      setProcessing(true);
      const transaction=await wallets.sendTransaction(tx);
      setHash(transaction.hash);
      const receipt=await transaction.wait();
      setHash(null);
      setProcessing(false);
      setAmountSend(null);
      setSendAddress(null);
      if(receipt.status===1){
        getAccountToken();
      }else{
        console.log('failed');
      }
    } catch (error) {
      setHash(null);
      setProcessing(false);
      setAmountSend(null);
      setSendAddress(null);
      console.log(error.message);
    }

  }
  const logout=()=>{
    setSeedPhrase(null);
    setWallet(null);
    setBalance(0);
    setNfts(null);
    setTokens(null);
    router.push('/')
  }
  useEffect(()=>{
    if(!wallet || !selectedChain) return;
    setNfts(null);
    setBalance(0);
    setTokens(null);
    getAccountToken();
  },[]);
  useEffect(()=>{
    if(!wallet) return;
      setNfts(null);
      setTokens(null);
      setBalance(0);
      getAccountToken();
  },[selectedChain]);
  
  return (
    <div className={Style.Content}>
      <div className={Style.LogoutButton} onClick={logout}>
        <LogoutOutlined />
      </div>
      <div className={Style.walletName}>Wallet</div>
      <Tooltip title={wallet}>
        <div>{wallet.slice(0,4)}...{wallet.slice(38)}</div>
      </Tooltip>
      <Divider/>
      {
        fetching?
        (
          <Spin/>
        ):(
          <Tabs defaultActiveKey="1" items={items} className={Style.walletView}/>
        )
      }
    </div>
  );
};

export default WalletView;
