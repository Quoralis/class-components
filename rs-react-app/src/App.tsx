import { Route, Routes } from 'react-router-dom';
import Page404 from './components/pages/Page404/Page404.tsx';
import AboutPage from './components/pages/About/AboutPage.tsx';
import Layout from './Layout.tsx';
import DetailLayout from './DetailLayuot.tsx';
import SearchPage from './components/pages/SearchResults';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<SearchPage />} />
        <Route path="details/:id" element={<DetailLayout />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<Page404 />} />
      </Route>
    </Routes>
  );
}
export default App;
