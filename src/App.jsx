import { Routes, Route } from 'react-router';
import PrivateRoute from './routes/private-route';
import Login from './pages/login';
import Listings from './pages/listings';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* Private routes */}
      <Route element={<PrivateRoute />}>
        <Route path="/listings" element={<Listings />} />
      </Route>
    </Routes>
  );
}
export default App;
