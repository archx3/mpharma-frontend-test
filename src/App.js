import React    from 'react';
// import logo   from './logo.svg';
import "bootstrap/dist/css/bootstrap.css";
import './App.css';
import Layout   from "./layouts/Layout";
import Products from "./components/Products/Products";

function App() {
  return (
    <div className="App">
      <Layout>
        <Products/>
        <hr/>
      </Layout>
    </div>
  );
}

export default App;
