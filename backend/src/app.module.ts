import { Module } from '@nestjs/common';
import { MyTokenController } from './app.controller';
import { MyTokenService } from './app.service';

@Module({
  imports: [],
  controllers: [MyTokenController],
  providers: [MyTokenService],
})
export class AppModule {}
