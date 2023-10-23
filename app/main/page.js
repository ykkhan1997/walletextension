'use client'
import Style from '../../styles/page.module.css';
import { createContext, useEffect, useState } from 'react';
export const MainContext=createContext();
const Main = ({children}) => {
  const [selectedChain,setSelectedChain]=useState('0x1');
  const [wallet, setWallet] = useState(null);
  const [seedPhrase, setSeedPhrase] = useState(null);
  const [saveData,setSaveData]=useState(seedPhrase);

  console.log(seedPhrase);
  return (
    <div className={Style.App}>
    <MainContext.Provider value={{selectedChain,setSelectedChain,wallet,setWallet,seedPhrase,setSeedPhrase}}>
      {children}
    </MainContext.Provider>
    </div>
  )
}

export default Main