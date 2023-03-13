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

import stakingABI from "../utils/staking.json";

const Stake = () => {
  const contractAddress = "0xb5B81A928A20070e5E9E888615f018affEbfe8de";
  const [stakes, setStakes] = useState(null);

  const { data: account } = useAccount();

  const { data: stakedAmount } = useContractRead({
    address: contractAddress,
    abi: stakingABI,
    functionName: "stakedAmount",
    args: [account],
  });

  const prepareStake = usePrepareContractWrite({
    abi: stakingABI,
    functionName: "stake",
  });

  const [token, setToken] = useState("");
  const [amount, setAmount] = useState("");

  const handleTokenChange = (event) => {
    setToken(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleStake = async () => {
    try {
      const tx = await prepareStake({
        args: [token, amount],
        value: 0,
      });
      await tx.wait();
      setToken("");
      setAmount("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="bg-black text-white">
        <h2>Stake</h2>
        <div>
          <label htmlFor="token">Token:</label>
          <input
            type="text"
            id="token"
            value={token}
            className="text-black"
            onChange={handleTokenChange}
          />
        </div>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            type="text"
            id="amount"
            value={amount}
            className="text-black"
            onChange={handleAmountChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Stake;
