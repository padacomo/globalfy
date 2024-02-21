import { Module } from '@nestjs/common';
import { eventsProviders } from './events.providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Events } from './entities';
import { EventsController } from './controllers';

@Module({
  imports: [TypeOrmModule.forFeature([Events], process.env.DB_NAME)],
  controllers: [EventsController],
  providers: eventsProviders,
})
export class EventsModule {}
