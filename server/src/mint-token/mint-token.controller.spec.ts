import { Test, TestingModule } from '@nestjs/testing';
import { MintTokenController } from './mint-token.controller';

describe('MintTokenController', () => {
  let controller: MintTokenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MintTokenController],
    }).compile();

    controller = module.get<MintTokenController>(MintTokenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
