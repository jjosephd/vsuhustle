import { Routes, Route } from 'react-router';
import PrivateRoute from './routes/private-route';
import Login from './components/login/login';
import Listings from './pages/listings';
import Layout from './components/layout';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* Private routes */}
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Layout />}>
          <Route path="/listings" element={<Listings />} />
        </Route>
      </Route>
    </Routes>
  );
}
export default App;
