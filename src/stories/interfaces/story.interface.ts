import { Document } from 'mongoose';

export interface Story extends Document {
  created_at: string;
  title: string;
  author: string;
  story_id: number;
  story_title: string;
  story_url: string;
  url: string;
  deleted: boolean;
}
