import './App.css';
import React from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    
} from "react-router-dom";
import UserManagement from './Components/UserManagement.js';
import AdminPage from './Components/Admin.js';
import ProductManagement from './Components/ProductManagement.js';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

export default function BasicRouter() {
    return (
        <Router>
            <div>
                <ul>
                    <Breadcrumbs>
                        <Link color="inherit" href="/home">Home</Link>
                        <Link href="/admin">Admin Home Page</Link>
                        <Link href="/admin/users">User Management Page</Link>
                        <Link href="/admin/products">Product Management Page</Link>
                    </Breadcrumbs>
                </ul>

                <hr />

                {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/admin/users">
                        <UserManagement />
                    </Route>
                    <Route path="/admin/products">
                        <ProductManagement />
                    </Route>
                    <Route path="/admin">
                        <AdminPage />
                    </Route>
                    
                </Switch>
            </div>
        </Router>
    );
}

// These functions act as placeholders until actual pages are made

function Home() {
    return (
        <div>
            <h2>Home</h2>
        </div>
    );
}

//Original pre-made React homepage, kept here for reference
/*function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}*/