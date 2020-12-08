import styled from 'styled-components';
import dayjs from 'dayjs';

import StoryRow from './StoryRow';

function getTimestamp(ISOdate) {
  return dayjs(ISOdate).valueOf();
}

function StoriesList({ stories, handleDeleteStory }) {
  const sortedStories = stories.sort(
    (a, b) => getTimestamp(b.created_at) - getTimestamp(a.created_at),
  );

  const storiesToShow = sortedStories.filter(
    (story) =>
      (story.title || story.story_title) && (story.url || story.story_url),
  );

  return (
    <StoriesContainer>
      {storiesToShow.map((story) => (
        <StoryRow
          key={story.story_id}
          story={story}
          handleDeleteStory={handleDeleteStory}
        />
      ))}
    </StoriesContainer>
  );
}

const StoriesContainer = styled.section`
  padding: 0 2rem;
`;

export default StoriesList;
