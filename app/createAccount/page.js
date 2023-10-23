"use client";
import React, { useState,useContext } from "react";
import {CreateAccount, WalletView,} from "@/components";
import { MainContext } from "../main/page";
const createAccount = () => {
  const {wallet,setWallet,seedPhrase,setSeedPhrase,setSelectedChain,selectedChain}=useContext(MainContext);
  return (
    <div>
      {wallet && seedPhrase ? (
        <WalletView
          wallet={wallet}
          setWallet={setWallet}
          seedPhrase={seedPhrase}
          setSeedPhrase={setSeedPhrase}
          setSelectedChain={setSelectedChain}
          selectedChain={selectedChain}
        />
      ) : (
        <CreateAccount
          setSeedPhrase={setSeedPhrase}
          setWallet={setWallet}
          wallet={wallet}
        />
      )}
    </div>
  );
};

export default createAccount;
