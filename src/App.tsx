import { Route, Routes } from "react-router";
import "./App.css";
import HomePage from "./components/Home/HomePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" index element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
