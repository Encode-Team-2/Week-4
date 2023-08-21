import { Module } from '@nestjs/common';
import { MyTokenController, TokenizedBallotController } from './app.controller';
import { MyTokenService, TokenizedBallotService } from './app.service';

@Module({
  imports: [],
  controllers: [MyTokenController, TokenizedBallotController],
  providers: [MyTokenService, TokenizedBallotService],
})
export class AppModule {}
