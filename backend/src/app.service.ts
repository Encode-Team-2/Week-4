import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import * as tokenJson from './assets/MyToken.json';
import * as ballotJson from './assets/TokenizedBallot.json';

@Injectable()
export class MyTokenService {
  contract: ethers.Contract;
  provider: ethers.JsonRpcProvider;
  wallet: ethers.Wallet;

  constructor() {
    this.provider = new ethers.JsonRpcProvider(
      process.env.RPC_ENCPOINT_URL ?? '',
    );
    this.wallet = new ethers.Wallet(
      process.env.PRIVATE_KEY ?? '',
      this.provider,
    );
    this.contract = new ethers.Contract(
      process.env.TOKEN_ADDRESS,
      tokenJson.abi,
      this.wallet,
    );
  }

  getTokenAddress(): any {
    return { address: process.env.TOKEN_ADDRESS };
  }

  async getTotalSupply() {
    const balance_ = await this.contract.totalSupply();
    return { balance: Number(balance_) };
  }

  async getTokenBalance(address: string): Promise<any> {
    const balance_ = await this.contract.balanceOf(address);

    return { balance: Number(balance_) };
  }

  async mintTokens(address: string): Promise<any> {
    console.log(`Minting transaction: ${address}`);
    const tx = await this.contract.mint(address, ethers.parseUnits('1'));
    const receipt = await tx.wait(3); // Wait for 3 confirmations
    console.log(`Receipt: ${receipt}`);

    return { success: true, txHash: receipt.hash };
  }
}

@Injectable()
export class TokenizedBallotService {
  contract: ethers.Contract;
  provider: ethers.JsonRpcProvider;
  wallet: ethers.Wallet;

  constructor() {
    this.provider = new ethers.JsonRpcProvider(
      process.env.RPC_ENCPOINT_URL ?? '',
    );
    this.wallet = new ethers.Wallet(
      process.env.PRIVATE_KEY ?? '',
      this.provider,
    );
    this.contract = new ethers.Contract(
      process.env.TOKENIZED_BALLOT_ADDRESS,
      ballotJson.abi,
      this.wallet,
    );
  }

  getContractAddress(): any {
    return { address: process.env.TOKENIZED_BALLOT_ADDRESS };
  }

  async getWinningProposal(): Promise<number> {
    return await this.contract.winningProposal();
  }

  async getWinnerName(): Promise<string> {
    return await this.contract
      .winnerName()
      .then((data) => ethers.decodeBytes32String(data));
  }
}
