import NavMenu from './components/NavMenu.tsx';
import { Route, Routes } from 'react-router-dom';
import SearchPage from './components/pages/SearchResults';
import Page404 from './components/pages/Page404/Page404.tsx';
import AboutPage from './components/pages/About/AboutPage.tsx';

function App() {
  return (
    <div className="container">
      <NavMenu />
      <Routes>
        <Route path="/" element={<SearchPage />}></Route>
        <Route path="/about" element={<AboutPage />}></Route>
        <Route path="*" element={<Page404 />}></Route>
      </Routes>
    </div>
  );
}
export default App;
