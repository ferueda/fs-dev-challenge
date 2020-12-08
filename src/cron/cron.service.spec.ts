import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';

import { CronService } from './cron.service';
import { HttpModule } from '@nestjs/common';
import { StoriesModule } from '../stories/stories.module';
import { ScheduleModule } from '@nestjs/schedule';
import { StorySchema } from '../stories/schemas/story.schema';

import {
  rootMongooseTestModule,
  closeMongodConnection,
} from '../../test/utils';

describe('CronService', () => {
  let cronService: CronService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CronService],
      imports: [
        ScheduleModule.forRoot(),
        HttpModule,
        StoriesModule,
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: 'Story', schema: StorySchema }]),
      ],
    }).compile();

    afterAll(async () => {
      await closeMongodConnection();
    });

    cronService = module.get<CronService>(CronService);
  });

  it('should be defined', () => {
    expect(cronService).toBeDefined();
  });
});
