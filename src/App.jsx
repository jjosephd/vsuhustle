import { Routes, Route } from 'react-router';
import PrivateRoute from './routes/private-route';
import Login from './components/login/login';
import Listings from './pages/listings';
import Layout from './components/layout';
import Home from './pages/home';
import Businesses from './pages/businesses/businesses';
import ListingsPage from './pages/listings/listings-page';
import CategoryPage from './pages/category/category-page';
import NewListingPage from './pages/businesses/create/new-listing-page';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Private routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/businesses" element={<Businesses />} />
          <Route path="/businesses/new-listing" element={<NewListingPage />} />
          <Route path="/listings/:id" element={<ListingsPage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/listings" element={<Listings />} />
        </Route>
      </Route>
    </Routes>
  );
}
export default App;
