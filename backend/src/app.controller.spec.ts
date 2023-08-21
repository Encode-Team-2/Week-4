import { Test, TestingModule } from '@nestjs/testing';
import { MyTokenController } from './app.controller';
import { MyTokenService } from './app.service';

describe('AppController', () => {
  let appController: MyTokenController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MyTokenController],
      providers: [MyTokenService],
    }).compile();

    appController = app.get<MyTokenController>(MyTokenController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
