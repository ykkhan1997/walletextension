"use client";
import React, { useState } from "react";
import { WalletLogo } from "@/public";
import Style from "./styles/Home.module.css";
import Image from "next/image";
import { Button } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
const Home = () => {
  const router = useRouter();
  return (
    <>
      <div className={Style.Content}>
        <Image
          width={300}
          height={80}
          src={WalletLogo}
          alt="logo"
          className={Style.frontPageButton}
        />
        <h2>Hey There 👋</h2>
        <h4 className={Style.h4}>Welcome to the Web3 Wallet</h4>
        <Button
          className={Style.frontPageButton}
          type="primary"
          onClick={() => {
            router.push(`/createAccount`);
          }}
        >
          Create a Wallet
        </Button>
        <Button
          className={Style.frontPageButton}
          type="default"
          onClick={() => router.push(`/recoverAccount`)}
        >
          Sign In With Seed Phrase
        </Button>
        <p className={Style.frontPageBottom}>
          Find Alt Coin Gems:{" "}
          <Link href={"/https://moralismoney.com/"}>money.morails.io</Link>
        </p>
      </div>
    </>
  );
};

export default Home;
