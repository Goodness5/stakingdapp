import { ethers } from "ethers";
import React, { useState } from "react";
import { erc20ABI, useContractWrite, useWaitForTransaction } from "wagmi";

import stakingAbi from "../utils/staking.json";

function StakingForm() {
  const [tokenAddress, setTokenAddress] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenDecimals, setTokenDecimals] = useState("");

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const { write: addStakableToken, isLoading } = useContractWrite({
    mode: "waitToConfirm",
    address: "0xb5B81A928A20070e5E9E888615f018affEbfe8de",
    abi: stakingAbi,
    functionName: "addStakableToken",
    signer: signer
  });

  const { data: approveTransaction, isLoading: isApproving } =
    useWaitForTransaction({
      onSuccess(data) {
        console.log("APPROVE SUCCESSFUL");
        console.log(data);
      },
      onError(error) {
        console.log(error);
      },
    });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const tokenContract = new ethers.Contract(
        tokenAddress,
        erc20ABI,
        signer
      );

      const symbol = await tokenContract.symbol();
      const decimals = await tokenContract.decimals();

      await addStakableToken(tokenAddress, decimals);

      setTokenSymbol(symbol);
      setTokenDecimals(decimals);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-2 bg-blue-50 flex flex-col">
      <form onSubmit={handleSubmit}>
        <label>
          Token address:
          <input
            type="text"
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
          />
        </label>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Add token"}
        </button>

        {tokenSymbol && (
          <p>
            Added token <strong>{tokenSymbol}</strong> with{" "}
            <strong>{tokenDecimals}</strong> decimals.
          </p>
        )}
      </form>
    </div>
  );
}

export default StakingForm;
