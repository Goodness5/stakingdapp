import React, { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import stakingAbi from "../utils/staking.json";




const ListOfStakableTokens = () => {

    const contractAddress = "0xb5B81A928A20070e5E9E888615f018affEbfe8de";
  const [stakableTokens, setStakableTokens] = useState([]);

  const { data: symbols, isLoading } = useContractRead({
    address: contractAddress,
    abi: stakingAbi,
    functionName: "getStakableTokenSymbols",
  });

  useEffect(() => {
    if (symbols?.length > 0) {
      setStakableTokens(symbols);
    }
  }, [symbols]);

  return (
    <div className="mt-10">
      {isLoading ? (
        <div className="text-center">THE PAGE IS LOADING!</div>
      ) : (
        <div className="grid grid-cols-4 gap-5">
          {stakableTokens.map((symbol, index) => (
            <div key={index} className="col-span-1 border border-teal-400 rounded-xl p-4 mb-4">
              <div className="flex">
                Symbol: <span className="">{symbol}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListOfStakableTokens;
