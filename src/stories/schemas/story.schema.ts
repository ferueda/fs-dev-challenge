import { Schema } from 'mongoose';

export const StorySchema = new Schema({
  created_at: String,
  title: String,
  author: String,
  story_id: Number,
  story_title: String,
  story_url: String,
  url: String,
  deleted: {
    type: Boolean,
    default: false,
  },
});
