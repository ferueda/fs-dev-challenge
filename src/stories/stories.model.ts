export class Story {
  constructor(
    public created_at: string,
    public title: string,
    public author: string,
    public story_id: number,
    public story_title: string,
    public story_url: string,
    public deleted: boolean,
  ) {}
}
