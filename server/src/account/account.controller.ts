import { Body, Controller, Post } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountDTO } from './dto/account.dto';
import { Account } from './schemas/account.schema';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('getNset')
  async setAndGetAccountData(@Body() body: AccountDTO): Promise<Account> {
    return await this.accountService.setAndGetAccountData(body);
  }
}
