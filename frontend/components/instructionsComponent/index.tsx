import { useAccount, useNetwork } from "wagmi";
import styles from "./instructionsComponent.module.css";
import * as tokenJson from "../../assets/MyToken.json";
import { useEffect, useState } from "react";

export default function InstructionsComponent() {
  return (
    <div className={styles.container}>
      <div className={styles.get_started}>
        <PageBody></PageBody>
      </div>
    </div>
  );
}

function PageBody() {
  return (
    <div>
      <WalletInfo></WalletInfo>
    </div>
  );
}

function WalletInfo() {
  const { address, isConnecting, isDisconnected } = useAccount();
  const { chain } = useNetwork();
  if (address)
    return (
      <div>
        <p>Your account address is {address}</p>
        <p>Connected to the network {chain?.name}</p>

        <TokenAddressFromApi></TokenAddressFromApi>
        <BallotAddressFromApi></BallotAddressFromApi>
        <TotalSupplyFromApi></TotalSupplyFromApi>
        <TokenBalanceFromApi address={address}></TokenBalanceFromApi>
        <RequestTokenToBeMinted address={address}></RequestTokenToBeMinted>
      </div>
    );
  if (isConnecting)
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  if (isDisconnected)
    return (
      <div>
        <p>Wallet disconnected. Connect wallet to continue</p>
      </div>
    );
  return (
    <div>
      <p>Connect wallet to continue</p>
    </div>
  );
}

function TokenAddressFromApi() {
  const [data, setData] = useState<{ address: string }>();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/token/address")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading token address from API...</p>;
  if (!data) return <p>No token address information</p>;

  return (
    <div>
      <p>Token address from API: {data.address}</p>
    </div>
  );
}

function BallotAddressFromApi() {
  const [data, setData] = useState<{ address: string }>();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/ballot/address")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading ballot address from API...</p>;
  if (!data) return <p>No ballot address information</p>;

  return (
    <div>
      <p>Ballot address from API: {data.address}</p>
    </div>
  );
}

function RequestTokenToBeMinted(params: { address: `0x${string}` }) {
  const [data, setData] = useState<any>(null);
  const [isLoading, setLoading] = useState(false);

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ address: params.address }),
  };

  if (isLoading) return <p>Requesting tokens from API...</p>;
  if (!data)
    return (
      <button
        disabled={isLoading}
        onClick={() => {
          setLoading(true);
          fetch("http://localhost:3001/token/mint", requestOptions)
            .then((res) => res.json())
            .then((data) => {
              setData(data);
              setLoading(false);
            });
        }}
      >
        Request tokens
      </button>
    );
  return (
    <div>
      <p>Mint success: {data.result ? "worked" : "failed"}</p>
      <p>Transaction hash: {data.txHash}</p>
    </div>
  );
}

function TokenBalanceFromApi(params: { address: `0x${string}` }) {
  const [data, setData] = useState<{ balance: string }>();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3001/token/balance/${params.address}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading token balance from API...</p>;
  if (!data) return <p>No token balance information</p>;

  return (
    <div>
      <p>Token balance from API: {data.balance}</p>
    </div>
  );
}

function TotalSupplyFromApi() {
  const [data, setData] = useState<{ balance: string }>();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3001/token/total-supply`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading total supply from API...</p>;
  if (!data) return <p>No total supply information</p>;

  return (
    <div>
      <p>Total supply from API: {data.balance}</p>
    </div>
  );
}
