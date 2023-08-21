import { Controller, Get, Param } from '@nestjs/common';
import { MyTokenService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('MyToken')
@Controller('token')
export class MyTokenController {
  constructor(private readonly appService: MyTokenService) {}

  @Get('address')
  getContractAddress(): string {
    return this.appService.getContractAddress();
  }

  @Get('total-supply')
  getTotalSupplyAddress() {
    return this.appService.getTotalSupply();
  }

  @Get('balance/:address')
  getTokenBalance(@Param('address') address: string) {
    return this.appService.getTokenBalance(address);
  }
}
