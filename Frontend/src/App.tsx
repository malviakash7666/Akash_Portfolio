
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/public/Home";
import AdminPage from "./pages/admin/AdminPage";
import LoginPage from "./pages/admin/LoginPage";
import AllProjects from "./pages/public/AllProjects";
import ProjectDetails from "./pages/public/ProjectDetails";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Home />} />
        <Route path="/skills" element={<Home />} />
        <Route path="/projects" element={<AllProjects />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/experience" element={<Home />} />
        <Route path="/certifications" element={<Home />} />
        <Route path="/contact" element={<Home />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;