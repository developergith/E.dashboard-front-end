import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import SignUp from './Component/SignUp';
import Login from './Component/Login';
import PrivateComponent from './Component/PrivateComponent';
import AddProduct from './Component/AddProduct';
import ProductList from './Component/ProductList';
import Updateproduct from './Component/Updateproduct';
import Layout from "./Component/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default route */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected Routes */}
        <Route element={<PrivateComponent />}>
          <Route path="/dashboard" element={
            <Layout>
              <ProductList />
            </Layout>
          } />

          <Route path="/add" element={
            <Layout>
              <AddProduct />
            </Layout>
          } />

          <Route path="/update/:id" element={
            <Layout>
              <Updateproduct />
            </Layout>
          } />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;


