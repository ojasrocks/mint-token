import { Test, TestingModule } from '@nestjs/testing';
import { MintTokenService } from './mint-token.service';

describe('MintTokenService', () => {
  let service: MintTokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MintTokenService],
    }).compile();

    service = module.get<MintTokenService>(MintTokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
