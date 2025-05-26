import { Routes, Route } from 'react-router';
import PrivateRoute from './routes/private-route';
import Login from './components/login/login';
import Listings from './pages/listings';
import Layout from './components/layout';
import Home from './pages/home';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Private routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/listings" element={<Listings />} />
        </Route>
      </Route>
    </Routes>
  );
}
export default App;
