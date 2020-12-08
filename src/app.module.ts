import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { StoriesModule } from './stories/stories.module';
import { CronModule } from './cron/cron.module';

@Module({
  imports: [
    StoriesModule,
    CronModule,
    MongooseModule.forRoot('mongodb://mongo:27017/fs-dev-challenge', {
      useFindAndModify: false,
    }),
  ],
})
export class AppModule {}
