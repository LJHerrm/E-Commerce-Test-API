import React from 'react';
import Modal from './Modal.js';

export default class UserManagement extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showAdd: false,
            showEdit: false,
            showDelete: false,
            error: null,
            isLoaded: false,
            users: [],
            currentUserID: null,
            name: "",
            role: null,
            email: "",
            newUserID: null

        };
    }        

    //set state to show/hide each modal
    showAddModal = e => {
        this.setState({
            showAdd: !this.state.showAdd
        });
    };
    showEditModal = e => {
        this.setState({
            showEdit: !this.state.showEdit
        });
    };
    showDeleteModal = e => {
        this.setState({
            showDelete: !this.state.showDelete
        });
    };

    //Handlers for updating states when forms are filled
    updateCurrentUserID(event) {
        this.setState({
            currentUserID: event.target.value
        });
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

    //CreatedAt is currently disabled until it is figured out
    //'CreatedAt': Date().toLocaleString()
    async AddNewUser() {

        const postRequest = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'Name': this.state.name,
                'Role': this.state.role,
                'Email': this.state.email,
                
                })
        };

        const response = await fetch('http://localhost:5000/api/Users', postRequest);
        const data = await response.json();
        this.setState({ newUserID: data.id });

        //Log new user ID to console
        await console.log('New user added with ID:');
        await console.log(this.state.newUserID);

        //Refresh the user list and close modal
        await this.GetAllUsers();
        await this.showAddModal();
    }

    async EditUser() {
        const putRequest = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'userID': this.state.currentUserID,
                'Name': this.state.name,
                'Role': this.state.role,
                'Email': this.state.email,
            })
        };

        await fetch('http://localhost:5000/api/Users/' + this.state.currentUserID, putRequest);
        //only used if we need to save part of the response
        //const response = await fetch('http://localhost:5000/api/Users/{id}', putRequest);
        //const data = await response.json();

        //Refresh the user list and close modal
        await this.GetAllUsers();
        await this.showEditModal();
    }
    async DeleteUser() {
        const deleteRequest = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        };

        await fetch('http://localhost:5000/api/Users/' + this.state.currentUserID, deleteRequest);

        //Refresh the user list and close modal
        await this.GetAllUsers();
        await this.showDeleteModal();
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
                <div>
                    <h2> Users </h2>
                    <button onClick = {e => { this.showAddModal(e); }}> Add New User </button>

                    <Modal onClose = {this.showAddModal} show = {this.state.showAdd} >
                        Name: 
                        <input type = "text" value = {this.state.name} onChange = {this.updateName.bind(this)} />
                        Role:
                        <input type = "text" value = {this.state.role} onChange = {this.updateRole.bind(this)} />
                        Email:
                        <input type = "text" value = {this.state.email} onChange = {this.updateEmail.bind(this)} />
                        <button onClick = {this.AddNewUser.bind(this)} > Add User </button>
                    </Modal>
                    
                    <table>
                        <thead>
                            <tr>
                                <th>User ID</th>
                                <th>Name</th>
                                <th>Role</th>
                                <th>Email</th>
                                <th>Time/Date Created</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr>
                                    <td> {user.userID} </td>
                                    <td> {user.name} </td>
                                    <td> {user.role} </td>
                                    <td> {user.email} </td>
                                    <td> {user.createdAt} </td>
                                    <td> <button onClick={e => { this.showEditModal(e); this.setState({ currentUserID: user.userID }) }}> Edit </button> </td>
                                    <td> <button onClick={e => { this.showDeleteModal(e); this.setState({ currentUserID: user.userID }) }}> Delete </button> </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Modal onClose={this.showEditModal} show={ this.state.showEdit}>
                        Name:
                        <input type="text" value={this.state.name} onChange={this.updateName.bind(this)} />
                        Role:
                        <input type="text" value={this.state.role} onChange={this.updateRole.bind(this)} />
                        Email:
                        <input type="text" value={this.state.email} onChange={this.updateEmail.bind(this)} />
                        <button onClick={this.EditUser.bind(this)} > Save Edits </button>
                    </Modal>
                    <Modal onClose={this.showDeleteModal} show={this.state.showDelete}>
                        Delete User
                        <button onClick={this.DeleteUser.bind(this)} > Delete User </button>
                    </Modal>
               </div>
            );
        }
    }
}

/* <ul>
    {users.map(user => (
        <li key={user.userID}>
            {user.name} {user.role} {user.email} {user.createdAt}
        </li>
    ))}
</ul> */