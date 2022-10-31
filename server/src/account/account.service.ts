import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AccountDTO } from './dto/account.dto';
import { Account, AccountDocument } from './schemas/account.schema';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account.name)
    private readonly account: Model<AccountDocument>,
  ) {}

  private readonly logger = new Logger(AccountService.name);

  async setAndGetAccountData(data: AccountDTO): Promise<Account> {
    const findDocument = await this.account.findOne({ address: data.address });

    if (
      !findDocument ||
      (!!findDocument && data.balance !== findDocument.balance)
    ) {
      const result = await this.account.findOneAndUpdate(
        { address: data.address },
        data as Account,
        {
          upsert: true,
        },
      );
      this.logger.log('Updated/Added new values in the Database');
      return result as Account;
    }

    return findDocument as Account;
  }
}
