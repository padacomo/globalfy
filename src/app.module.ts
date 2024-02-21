import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EventsModule } from './modules/events/events.module';
import { typeOrmConfig } from './infra/configs';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(typeOrmConfig),
    EventsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
