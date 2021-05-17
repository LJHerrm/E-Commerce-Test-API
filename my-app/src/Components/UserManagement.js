import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
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
            name: "",
            role: null,
            email: "",
            showAdd: !this.state.showAdd
        });
    };
    showEditModal = e => {
        this.setState({
            name: "",
            role: null,
            email: "",
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
        await console.log('New user added with ID: ');
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
            return(

                <div>
                    <h2> Users <Button variant="outlined" color="primary" onClick={e => {this.showAddModal(e); }}>
                        Add New User
                               </Button>
                    </h2>
                        <Dialog open={this.state.showAdd} onClose={this.showAddModal} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">Add a New User</DialogTitle>
                            <DialogContent>
                                <DialogContentText>

                                </DialogContentText>
                                <TextField
                                    onChange={this.updateName.bind(this)}
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Name"
                                    type="name"
                                    fullWidth
                                />
                                <TextField
                                    onChange={this.updateRole.bind(this)}
                                    margin="dense"
                                    id="role"
                                    label="Role"
                                    type="role"
                                    fullWidth
                                />
                                <TextField
                                    onChange={this.updateEmail.bind(this)}
                                    margin="dense"
                                    id="email"
                                    label="Email Address"
                                    type="email"
                                    fullWidth
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.showAddModal} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={this.AddNewUser.bind(this)} color="primary">
                                    Submit
                                </Button>
                            </DialogActions>
                        </Dialog>

                    <TableContainer component={Paper} width="auto">
                        <Table aria-label="simple table" style={{ width: "auto", tableLayout: "auto" }}>
                        <TableHead>
                            <TableRow>
                                <TableCell> User ID</TableCell>
                                    <TableCell> Name</TableCell>
                                    <TableCell align="right"> Role</TableCell>
                                    <TableCell align="right"> Email</TableCell>
                                    <TableCell align="right"> Time/Date Created</TableCell>
                                <TableCell />
                                <TableCell />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map(user => (
                                <TableRow>
                                    <TableCell> {user.userID} </TableCell>
                                    <TableCell> {user.name} </TableCell>
                                    <TableCell align="right"> {user.role} </TableCell>
                                    <TableCell align="right"> {user.email} </TableCell>
                                    <TableCell align="right"> {user.createdAt} </TableCell>
                                    <TableCell align="right"> <Button variant="outlined" color="primary" onClick={e => { this.showEditModal(e); this.setState({ currentUserID: user.userID, name: user.name, role: user.role, email: user.email }) }}> Edit </Button> </TableCell>
                                    <TableCell align="right"> <Button variant="outlined" color="primary" onClick={e => { this.showDeleteModal(e); this.setState({ currentUserID: user.userID, name: user.name, role: user.role, email: user.email }) }}> Delete </Button> </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    </TableContainer>

                    <Dialog open={this.state.showEdit} onClose={this.showEditModal} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Edit User</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                            </DialogContentText>
                            <TextField
                                value={this.state.name}
                                onChange={this.updateName.bind(this)}
                                autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Name"
                                    type="name"
                                    fullWidth
                                />
                            <TextField
                                value={this.state.role}
                                onChange={this.updateRole.bind(this)}
                                margin="dense"
                                id="role"
                                label="Role"
                                type="role"
                                fullWidth
                            />
                            <TextField
                                value={this.state.email}
                                onChange={this.updateEmail.bind(this)}
                                margin="dense"
                                id="email"
                                label="Email Address"
                                type="email"
                                fullWidth
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.showEditModal} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={this.EditUser.bind(this)} color="primary">
                                Submit
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog open={this.state.showDelete} onClose={this.showDeleteModal} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Really Delete {this.state.email} ? </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                <p> ID: {this.state.currentUserID} <br />
                                    Name: {this.state.name} <br />
                                    Role: {this.state.role} <br />
                                    Email: {this.state.email} <br />
                                </p>
                            </DialogContentText>    
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.showDeleteModal} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={this.DeleteUser.bind(this)} color="primary">
                                Submit
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
                 );
               }
    }
}