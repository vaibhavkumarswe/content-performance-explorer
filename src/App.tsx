import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Test from "./pages/Test";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/test" element={<Test />} />
    </Routes>
  );
}

export default App;
