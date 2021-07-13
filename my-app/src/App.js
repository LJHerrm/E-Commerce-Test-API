import './App.css';
import React from 'react';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserManagement from './Components/UserManagement.js';
import AdminPage from './Components/Admin.js';
import ProductManagement from './Components/ProductManagement.js';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import NavTabs from './Components/NavTabs.js';

const useStyles = makeStyles((theme) => ({
    search: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 600,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
}));

export default function BasicRouter() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleAccountClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleAccountClose = () => {
        setAnchorEl(null);
    };

    return (
        <Router>
            <div>
                <ul>
                    <Grid container direction="row" alignItems="center" spacing={2} justify="center">
                        <Grid item>
                            <Paper component="form" className={classes.search}>
                                <InputBase
                                    className={classes.input}
                                    placeholder="Search Products"
                                    inputProps={{ 'aria-label': 'search products' }}
                            />
                                <IconButton type="submit"  aria-label="search">
                                    <SearchIcon />
                                </IconButton>
                            </Paper>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary" onClick={handleAccountClick}> Account </Button>
                            <Menu
                                id="login-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleAccountClose}
                            >
                                <MenuItem onClick={handleAccountClose}>Profile</MenuItem>
                                <MenuItem onClick={handleAccountClose}>My account</MenuItem>
                                <MenuItem onClick={handleAccountClose}>Logout</MenuItem>
                            </Menu>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary"> Cart </Button>
                        </Grid>
                    </Grid>
                </ul>
 
                <NavTabs />
          
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
                    <Route exact path="/admin/users">
                        <UserManagement />
                    </Route>
                    <Route exact path="/admin/products">
                        <ProductManagement />
                    </Route>
                    <Route exact path="/admin">
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