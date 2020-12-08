import styled from 'styled-components';
import dayjs from 'dayjs';

import { BsFillTrashFill } from 'react-icons/bs';

function StoryRow({ story, handleDeleteStory }) {
  const date = dayjs(story.created_at);
  const now = dayjs();

  const dateDay = date.date();
  const nowDay = now.date();

  const dateToShow =
    nowDay === dateDay
      ? date.format('hh:mm a')
      : nowDay - dateDay > 1
      ? date.format('MMM D')
      : 'Yesterday';

  const url = story.url || story.story_url;

  const onDelete = (e) => {
    e.preventDefault();
    handleDeleteStory(story.story_id);
  };

  return (
    <Row>
      <Link href={url} target="_blank" rel="noreferrer">
        <Left>
          <Title>{story.title || story.story_title}</Title>
          <Author>- {story.author} -</Author>
        </Left>

        <Right>
          <Time>{dateToShow}</Time>
          <TrashIconButton onClick={onDelete}>
            <BsFillTrashFill fontSize={20} />
          </TrashIconButton>
        </Right>
      </Link>
    </Row>
  );
}

const Row = styled.article`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
  background-color: #fff;

  &:hover {
    background-color: #fafafa;
    button {
      display: flex;
    }
  }
`;

const Link = styled.a`
  display: flex;
  width: 100%;
  height: 85px;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  padding: 0 2rem;
`;

const Left = styled.div`
  display: flex;
`;

const Right = styled.div`
  width: 200px;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 1fr 36px;
  grid-template-rows: 1fr;
  align-items: center;
  padding-left: 0.5rem;
`;

const Title = styled.h3`
  color: #333;
  font-size: 13pt;
  margin-right: 0.5rem;
`;

const Author = styled.div`
  color: #999;
`;

const Time = styled.div`
  color: #333;
  font-size: 13pt;
`;

const TrashIconButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: inherit;
  border: none;
  padding: 0.5rem 0;

  display: none;
`;

export default StoryRow;
