import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Receipt } from './dto/mint-token.dto';
import { MintTokenService } from './mint-token.service';

@Controller('mint-token')
export class MintTokenController {
  constructor(private readonly mintTokenService: MintTokenService) {}

  @Post('/addMintEvent')
  async addMintEvent(@Body() body: Receipt) {
    return await this.mintTokenService.addMintEvent(body);
  }
}
