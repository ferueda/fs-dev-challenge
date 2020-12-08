import GlobalStyles from './globalStyles';

import useStories from './hooks/useStories';

import Header from './components/Header';
import StoriesList from './components/StoriesList';

function App() {
  const { stories, handleDeleteStory } = useStories();

  return (
    <>
      <GlobalStyles />

      <main>
        <Header />
        <StoriesList stories={stories} handleDeleteStory={handleDeleteStory} />
      </main>
    </>
  );
}

export default App;
