export class CreateStoryDTO {
  created_at: string;
  title: string;
  author: string;
  story_id: number;
  story_title: string;
  story_url: string;
  url: string;
  deleted: boolean;
}

export class DeleteStoryDTO {
  story_id: number;
}
