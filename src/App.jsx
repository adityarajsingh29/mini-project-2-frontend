import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Profile from "./pages/Profile.jsx";
import Repositories from "./pages/Repositories.jsx";
import Languages from "./pages/Languages.jsx";
import Contributions from "./pages/Contributions.jsx";
import Favorites from "./pages/Favorites.jsx";
import History from "./pages/History.jsx";
import { ProfileProvider } from "./context/ProfileContext.jsx";

export default function App() {
  return (
    <ProfileProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/repositories" element={<Repositories />} />
          <Route path="/languages" element={<Languages />} />
          <Route path="/contributions" element={<Contributions />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </Layout>
    </ProfileProvider>
  );
}
