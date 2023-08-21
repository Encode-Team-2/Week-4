import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import * as tokenJson from './assets/MyToken.json';
import { ApiTags } from '@nestjs/swagger';

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

  getContractAddress(): any {
    return { address: process.env.TOKENIZED_BALLOT_ADDRESS };
  }

  getTotalSupply() {
    return this.contract.totalSupply();
  }

  getTokenBalance(address: string) {
    return this.contract.balanceOf(address);
  }

  async mintTokens(address: string): Promise<any> {
    console.log(`Minting transaction: ${address}`);
    const tx = await this.contract.mint(address, ethers.parseUnits('1'));
    const receipt = await tx.wait(3); // Wait for 3 confirmations
    console.log(`Receipt: ${receipt}`);
    
    return { success: true, txHash: receipt.hash };
  }
}
