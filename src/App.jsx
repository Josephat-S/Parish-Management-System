import { Routes, Route } from 'react-router-dom';
import DashboardLayoutBasic from './components/DashboardLayoutBasic';
import Home from './pages/Home';
import Members from './pages/Members';
import Events from './pages/Events';
import Contributions from './pages/Contributions';
import Reports from './pages/Reports';

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayoutBasic />}>
        <Route index element={<Home />} />
        <Route path="members" element={<Members />} />
        <Route path="events" element={<Events />} />
        <Route path="contributions" element={<Contributions />} />
        <Route path="reports" element={<Reports />} />
      </Route>
    </Routes>
  );
}

export default App;
