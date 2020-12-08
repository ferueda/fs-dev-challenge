import styled from 'styled-components';

function Header() {
  return (
    <HeaderContainer>
      <Title>HN Feed</Title>
      <Subtitle>We &lt;3 hacker news!</Subtitle>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;

  align-items: flex-start;
  justify-content: center;

  min-height: 25vh;
  width: 100%;
  padding: 2rem 3rem;
  background-color: #222831;
  color: #fff;
`;

const Title = styled.h1`
  font-size: 5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.h2`
  font-size: 1.75rem;
`;

export default Header;
