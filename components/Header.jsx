"use client";
import React, { useState } from "react";
import Style from "../styles/page.module.css";
import { Select } from "antd";
import { LogoWallet } from "@/public";
import Image from "next/image";
import Link from "next/link";
import { MainContext } from "@/app/main/page";
import { useContext } from "react";
const Header = () => {
  const {selectedChain,setSelectedChain}=useContext(MainContext);
  return (
    <>
      <header>
        <Link href={{ pathname: "/" }}>
          <Image
            src={LogoWallet}
            width={100}
            height={100}
            className={Style.headerLogo}
            alt="logo"
          />
        </Link>
        <Select
        onChange={(val)=>setSelectedChain(val)}
          value={selectedChain}
          options={[{
            label: "Ethereum",
            value: "0x1",
          },
          {
            label: "Mumbai Testnet",
            value: "0x13881",
          },
          {
            label: "Polygon",
            value: "0x89",
          },
          {
            label: "Avalanche",
            value: "0xa86a",
          },]}
          className={Style.dropdown}
        ></Select>
      </header>
    </>
  );
};

export default Header;
