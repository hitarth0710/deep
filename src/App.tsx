import { Routes, Route, useRoutes } from "react-router-dom";
import Home from "./components/home";
import VideoDetection from "./pages/video-detection";
import ImageDetection from "./pages/image-detection";
import SignIn from "./components/auth/sign-in";
import Register from "./components/auth/register";
import Dashboard from "./components/dashboard";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import routes from "tempo-routes";

function App() {
  return (
    <AuthProvider>
      {/* Tempo routes */}
      {import.meta.env.VITE_TEMPO && useRoutes(routes)}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/register" element={<Register />} />

        {/* Detection Routes */}
        <Route path="/video-detection" element={<VideoDetection />} />
        <Route path="/image-detection" element={<ImageDetection />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Add this before any catchall routes */}
        {import.meta.env.VITE_TEMPO && <Route path="/tempobook/*" />}
      </Routes>
    </AuthProvider>
  );
}

export default App;
