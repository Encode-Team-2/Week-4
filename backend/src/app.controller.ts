import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MyTokenService, TokenizedBallotService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { MintTokenDTO } from './dtos/mintToken.dto';

@ApiTags('MyToken')
@Controller('token')
export class MyTokenController {
  constructor(private readonly appService: MyTokenService) {}

  @Get('address')
  getTokenAddress(): string {
    return this.appService.getTokenAddress();
  }

  @Get('total-supply')
  getTotalSupplyAddress() {
    return this.appService.getTotalSupply();
  }

  @Get('balance/:address')
  getTokenBalance(@Param('address') address: string) {
    return this.appService.getTokenBalance(address);
  }

  @Post('mint')
  mintTokens(@Body() body: MintTokenDTO): Promise<any> {
    return this.appService.mintTokens(body.address);
  }
}

@ApiTags('TokenizedBallot')
@Controller('ballot')
export class TokenizedBallotController {
  constructor(private readonly ballotService: TokenizedBallotService) {}

  @Get('address')
  getContractAddress(): string {
    return this.ballotService.getContractAddress();
  }
}
