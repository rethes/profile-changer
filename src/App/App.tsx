// react libraries
import React from 'react';

// third-party libraries
import { Link } from "react-router-dom";

// styles
import '../styles/css/App.css';

// components
import ChangeUsername from "../componets/changeUsername";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Link to={"/username"}>
        </Link>
        <ChangeUsername/>
      </header>
    </div>
  );
};

export default App;
