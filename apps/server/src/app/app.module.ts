import { Module } from '@nestjs/common';

import { PrismaModule } from '@crud-api/prisma';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
