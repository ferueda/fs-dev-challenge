import {
  Controller,
  Get,
  Post,
  Body,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { StoriesService } from './stories.service';
import { CreateStoryDTO, DeleteStoryDTO } from './dto/story.dto';
import { Story } from './interfaces/story.interface';

@Controller('stories')
export class StoriesController {
  constructor(private readonly storiesService: StoriesService) {}

  @Get()
  async getStories(): Promise<Story[]> {
    return await this.storiesService.getStories();
  }

  @Post()
  async createStory(@Body() createStoryDTO: CreateStoryDTO) {
    const story = await this.storiesService.createStory(createStoryDTO);

    if (story.error) {
      throw new ConflictException('story already exists');
    }

    return story;
  }

  @Post('/delete')
  async deleteStory(@Body() deleteStoryDTO: DeleteStoryDTO) {
    if (typeof deleteStoryDTO.story_id !== 'number') {
      return { error: 'Bad request' };
    }

    const deleted = await this.storiesService.deleteStory(
      deleteStoryDTO.story_id,
    );

    if (!deleted) {
      throw new NotFoundException('No such story');
    }

    return await this.storiesService.getStories();
  }
}
