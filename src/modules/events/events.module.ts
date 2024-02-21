import { Module } from '@nestjs/common';
import { eventsProviders } from './events.providers';
import { EventsController } from './controllers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Events } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Events], process.env.DB_NAME)],
  controllers: [EventsController],
  providers: eventsProviders,
})
export class EventsModule {}
