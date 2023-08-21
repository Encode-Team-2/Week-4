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
