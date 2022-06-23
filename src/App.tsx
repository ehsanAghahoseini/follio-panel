import React from 'react';
import Base from './widget/Base/Base';
import 'react-toastify/dist/ReactToastify.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ContextMain from './widget/context';
import Login from './pages/auth/Login';

function App() {
  return (
    <>
      <ContextMain>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/panel/*" element={<Base />} />
          </Routes>
        </BrowserRouter>
      </ContextMain>

      <ToastContainer position="top-right"
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        theme='light'
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
