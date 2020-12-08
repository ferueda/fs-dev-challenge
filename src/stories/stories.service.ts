import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Story } from './interfaces/story.interface';
import { CreateStoryDTO } from './dto/story.dto';

@Injectable()
export class StoriesService {
  constructor(
    @InjectModel('Story') private readonly storyModel: Model<Story>,
  ) {}

  async getStories(): Promise<Story[]> {
    return await this.storyModel.find({ deleted: false });
  }

  async createStory(createStoryDTO: CreateStoryDTO): Promise<any> {
    const exists = await this.storyModel.exists({
      story_id: createStoryDTO.story_id,
    });

    if (exists) {
      return {
        error: 'story already exists',
      };
    }

    const story = new this.storyModel(createStoryDTO);
    return await story.save();
  }

  async deleteStory(storyId: number): Promise<any> {
    return await this.storyModel.findOneAndUpdate(
      { story_id: storyId },
      {
        $set: {
          deleted: true,
        },
      },
    );
  }
}
