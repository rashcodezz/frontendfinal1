import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddUpdateForm from "./pages/AddUpdateForm";
import Main from "./pages/Main";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/add" element={<AddUpdateForm />} />
          <Route path="/update/:id" element={<AddUpdateForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
