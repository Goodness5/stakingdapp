import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  erc20ABI,
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

import staking_Abi from "../utils/staking.json";

const Stake = ()=>{

    const contractAddress = "0xb5B81A928A20070e5E9E888615f018affEbfe8de";
const [staketoken, setstakeToken] = useState("");

const { data:stakes, isLoading } = useContractRead({
    address: contractAddress,
    abi: stakingAbi,
    functionName: "stake",
  });



}