import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Productos from "./pages/Productos";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas protegidas (solo para usuarios autenticados) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/productos" element={<Productos />} />
        </Route>

        {/* Ruta por defecto (puedes redirigir a login o productos) */}
        <Route path="/" element={<Login />} /> {/* Cambia esto según lo que prefieras */}
      </Routes>
    </Router>
  );
}

export default App;