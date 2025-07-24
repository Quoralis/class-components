import NavMenu from './components/NavMenu.tsx';
import { Route, Routes } from 'react-router-dom';
import SearchPage from './components/pages/SearchResults';

function App() {
  return (
    <div className="container">
      <NavMenu />
      <Routes>
        <Route path="/" element={<SearchPage />}></Route>
      </Routes>
    </div>
  );
}
export default App;
