import React, { Suspense } from "react";
import MainNav from "./components/navigation/mainNav";
import SubNav from "./components/navigation/subNav";
import Spinner from "react-bootstrap/Spinner";
import Routes from "./routes/index";
import "./app.css";

const App = () => {
  return (
    <div className="app">
      <MainNav />
      <SubNav />
      <Suspense
        className="mx-auto"
        fallback={
          <div className="d-flex justify-content-center">
            <Spinner animation="border" />
          </div>
        }
      >
        <div className="offset-md-3 col-md-6 col-sm-12 mt-3">
          <Routes />
        </div>
      </Suspense>
      <div className="sticky-bottom p-5"></div>
    </div>
  );
};

export default App;
