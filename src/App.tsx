import { Route, Routes } from 'react-router-dom';
import Page404 from './layout/Page404/Page404';
import AboutPage from './layout/About/AboutPage';
import Layout from './layout/Layout';
import DetailLayout from './layout/DetailLayuot';
import SearchPage from './layout/SearchResults';

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
