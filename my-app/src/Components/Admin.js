﻿import React from 'react';
import { Link } from "react-router-dom";

export default class AdminPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false
        };
    }

    componentDidMount() {
        this.setState({
            isLoaded: true
        });
    }
    render() {

        const { error, isLoaded } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {

            return (
                <div>
                    <h2>Admin Page</h2>
                    <Link to='/admin/users'>User Management Page</Link>
                    <div></div>
                    <Link to='/admin/products'>Product Management Page</Link>
                </div>
            );
        }
    }
}