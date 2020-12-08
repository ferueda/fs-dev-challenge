import { Module, HttpModule } from '@nestjs/common';
import { StoriesModule } from 'src/stories/stories.module';
import { CronService } from './cron.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot(), HttpModule, StoriesModule],
  providers: [CronService],
})
export class CronModule {}
