import { Injectable, HttpService } from '@nestjs/common';
import { Cron, CronExpression, Timeout } from '@nestjs/schedule';
import { StoriesService } from '../stories/stories.service';

@Injectable()
export class CronService {
  constructor(
    private httpService: HttpService,
    private storiesService: StoriesService,
  ) {}

  async updateStories(): Promise<void> {
    const res = await this.httpService
      .get('https://hn.algolia.com/api/v1/search_by_date?query=nodejs')
      .toPromise();

    const data = await res.data;

    const savedStories = await this.storiesService.getStories();

    const savedStoriesIds = savedStories.map(({ story_id }) => story_id);

    const newStories = data.hits.filter(
      ({ story_id }) => !savedStoriesIds.includes(story_id),
    );

    for (const story of newStories) {
      await this.storiesService.createStory(story);
    }
  }

  @Timeout(0)
  async initialInsert() {
    await this.updateStories();
  }

  @Cron(CronExpression.EVERY_HOUR)
  async cronInsert() {
    await this.updateStories();
  }
}
