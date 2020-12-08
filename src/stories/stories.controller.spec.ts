import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Story } from './interfaces/story.interface';

import { StoriesController } from './stories.controller';
import { StoriesService } from './stories.service';
import { StorySchema } from './schemas/story.schema';

import {
  rootMongooseTestModule,
  closeMongodConnection,
} from '../../test/utils';

const stories = [
  {
    deleted: false,
    created_at: '2020-12-06T05:11:21.000Z',
    title: null,
    author: 'JHonaker',
    story_id: 25315982,
    url: null,
    story_title: 'Improbable Inspiration: Bayesian Networks (1996)',
    story_url: 'https://www.cs.ubc.ca/~murphyk/Bayes/la.times.html',
  },
  {
    deleted: false,
    created_at: '2020-12-06T02:54:24.000Z',
    title: null,
    author: 'bawolff',
    url: null,
    story_id: 25314106,
    story_title: 'Exotic Programming Ideas',
    story_url: 'https://www.stephendiehl.com/posts/exotic04.html',
  },
];

describe('Stories', () => {
  let controller: StoriesController;
  let service: StoriesService;
  let StoryModel: Model<Story>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: 'Story', schema: StorySchema }]),
      ],
      providers: [StoriesService],
      controllers: [StoriesController],
    }).compile();

    service = module.get<StoriesService>(StoriesService);
    controller = module.get<StoriesController>(StoriesController);
    StoryModel = module.get<Model<Story>>('StoryModel');
  });

  afterEach(async () => {
    await StoryModel.deleteMany({});
  });

  afterAll(async () => {
    await closeMongodConnection();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
    expect(StoryModel).toBeDefined();
  });

  it('/GET should return []', async () => {
    const stories = await service.getStories();
    expect(stories).toHaveLength(0);
  });

  it('/GET should return saved stories', async () => {
    for (const story of stories) {
      const newStory = new StoryModel(story);
      await newStory.save();
    }

    const savedStories = await StoryModel.find({});

    expect(savedStories).toHaveLength(stories.length);

    savedStories.forEach((story, index) => {
      expect(story.story_id).toBe(stories[index].story_id);
    });
  });

  it('/POST should create stories and save them to db', async () => {
    const dbInitialState = await StoryModel.find({});
    expect(dbInitialState).toHaveLength(0);

    for (const story of stories) {
      await service.createStory(story);
    }

    const savedStories = await StoryModel.find({});

    expect(savedStories).toHaveLength(stories.length);
    savedStories.forEach((story, index) => {
      expect(story.story_id).toBe(stories[index].story_id);
    });
  });

  it('delete /POST should update stories with deleted property set to true', async () => {
    for (const story of stories) {
      const newStory = new StoryModel(story);
      await newStory.save();
    }

    const savedStories = await StoryModel.find({ deleted: false });
    expect(savedStories).toHaveLength(2);

    await service.deleteStory(stories[0].story_id);

    const updatedStories = await StoryModel.find({ deleted: true });
    expect(updatedStories).toHaveLength(1);

    const notUpdated = await StoryModel.find({ deleted: false });
    expect(notUpdated).toHaveLength(1);
  });
});
