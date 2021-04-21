import React from 'react';

export default class UserManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            users: [],
            name: null,
            role: null,
            email: null,
            newUserID: null
        };
    }

    updateName(event) {
        this.setState({
            name: event.target.value
        });
    }
    updateRole(event) {
        this.setState({
            role: event.target.value
        });
    }
    updateEmail(event) {
        this.setState({
            email: event.target.value
        });
    }
    

    //Send a get request to /api/users and store in users[]
    GetAllUsers() {
        fetch("http://localhost:5000/api/Users")
            .then(response => response.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        users: result
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    //Send a post request to /api/users and store the new ID in newUserID
    AddNewUser() {
        const postRequest = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'Name': this.state.Name,
                'Role': this.state.Role,
                'Email': this.state.Email,
                'CreatedAt': Date().toLocaleString()})
        };
        fetch("http://localhost:5000/api/Users", postRequest)
            .then(response => response.json())
            .then(result => this.setState({ newUserID: result.UserID }));
    }

    componentDidMount() {

        this.GetAllUsers();
        
    }

    render() {
        const { error, isLoaded, users } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <ul>
                    {users.map(user => (
                        <li key={user.userID}>
                            {user.name} {user.role} {user.email} {user.createdAt}
                        </li>
                    ))}
                </ul>
            );
        }
    }
}