import React from 'react';
import './UserManagement.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
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
            products: [],
            currentProductID: null,
            name: "",
            shortDescription: "",
            price: 0,
            imageUrl: null,
            newProductID: null

        };
    }

    //set state to show/hide each modal
    showAddModal = e => {
        this.setState({
            name: "",
            shortDescription: "",
            price: "",
            imagueUrl: null,
            showAdd: !this.state.showAdd
        });
    };
    showEditModal = e => {
        this.setState({
            name: "",
            shortDescription: "",
            price: "",
            imageUrl: null,
            showEdit: !this.state.showEdit
        });
    };
    showDeleteModal = e => {
        this.setState({
            showDelete: !this.state.showDelete
        });
    };

    //Handlers for updating states when forms are filled
    updateCurrentProductID(event) {
        this.setState({
            currentProductID: event.target.value
        });
    }
    updateName(event) {
        this.setState({
            name: event.target.value
        });
    }
    updateShortDescription(event) {
        this.setState({
            shortDescription: event.target.value
        });
    }
    updatePrice(event) {
        this.setState({
            price: event.target.value
        });
    }
    updateImageUrl(event) {
        this.setState({
            imageUrl: event.target.value
        });
    }


    //Send a get request to /api/products and store in products[]
    GetAllProducts() {
        fetch("http://localhost:5000/api/Products")
            .then(response => response.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        products: result
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

    //Send a post request to /api/products and store the new ID in newProductID

    //CreatedAt is currently disabled until it is figured out
    //'CreatedAt': Date().toLocaleString()
    async AddNewProduct() {

        const postRequest = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'Name': this.state.name,
                'ShortDescription': this.state.shortDescription,
                'Price': this.state.price,
                'ImageUrl': this.state.imageUrl

            })
        };

        const response = await fetch('http://localhost:5000/api/Products', postRequest);
        const data = await response.json();
        this.setState({ newProductID: data.id });

        //Log new product ID to console
        await console.log('New product added with ID: ');
        await console.log(this.state.newProductID);

        //Refresh the product list and close modal
        await this.GetAllProducts();
        await this.showAddModal();
    }

    async EditProduct() {
        const putRequest = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'ProductID': this.state.currentProductID,
                'Name': this.state.name,
                'ShortDescription': this.state.shortDescription,
                'Price': this.state.price,
                'ImageUrl': this.state.imageUrl
            })
        };

        await fetch('http://localhost:5000/api/Products/' + this.state.currentProductID, putRequest);
        //only used if we need to save part of the response
        //const response = await fetch('http://localhost:5000/api/Products/{id}', putRequest);
        //const data = await response.json();

        //Refresh the user list and close modal
        await this.GetAllProducts();
        await this.showEditModal();
    }
    async DeleteProduct() {
        const deleteRequest = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        };

        await fetch('http://localhost:5000/api/Products/' + this.state.currentProductID, deleteRequest);

        //Refresh the user list and close modal
        await this.GetAllProducts();
        await this.showDeleteModal();
    }

    componentDidMount() {

        this.GetAllProducts();

    }

    render() {

        const { error, isLoaded, products } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (

                <div id="top">
                    <h2> Products <Button variant="contained" color="primary" onClick={e => { this.showAddModal(e); }}>
                        Add New Product
                               </Button>
                    </h2>
                    <Dialog open={this.state.showAdd} onClose={this.showAddModal} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Add a New product</DialogTitle>
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
                                onChange={this.updateShortDescription.bind(this)}
                                margin="dense"
                                id="shortDescription"
                                label="Short Description"
                                type="shortDescription"
                                fullWidth
                            />
                            <TextField
                                onChange={this.updatePrice.bind(this)}
                                margin="dense"
                                id="price"
                                label="Price"
                                type="price"
                                fullWidth
                            />
                            <TextField
                                onChange={this.updateImageUrl.bind(this)}
                                margin="dense"
                                id="imageUrl"
                                label="Image Url"
                                type="imageUrl"
                                fullWidth
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.showAddModal} color="primary">
                                Cancel
                                </Button>
                            <Button onClick={this.AddNewProduct.bind(this)} color="primary">
                                Submit
                                </Button>
                        </DialogActions>
                    </Dialog>

                    <TableContainer component={Paper} width="auto">
                        <Table aria-label="simple table" style={{ width: "auto", tableLayout: "auto", margin: "auto" }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell> Product ID</TableCell>
                                    <TableCell> Name</TableCell>
                                    <TableCell> Short Description</TableCell>
                                    <TableCell align="right"> Price</TableCell>
                                    <TableCell align="right"> Image Url</TableCell>
                                    <TableCell align="right"> Time/Date Created</TableCell>
                                    <TableCell />
                                    <TableCell />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {products.map(product => (
                                    <TableRow>
                                        <TableCell> {product.productID} </TableCell>
                                        <TableCell> {product.name} </TableCell>
                                        <TableCell> {product.shortDescription} </TableCell>
                                        <TableCell align="right"> {product.price} </TableCell>
                                        <TableCell align="right"> {product.imageUrl} </TableCell>
                                        <TableCell align="right"> {product.createdAt} </TableCell>
                                        <TableCell align="right"> <Button variant="contained" color="primary" onClick={e => { this.showEditModal(e); this.setState({ currentProductID: product.productID, name: product.name, shortDescription: product.shortDescription, price: product.price, imageUrl: product.imageUrl }) }}> Edit </Button> </TableCell>
                                        <TableCell align="right"> <Button variant="contained" color="secondary" onClick={e => { this.showDeleteModal(e); this.setState({ currentproductID: product.productID, name: product.name, shortDescription: product.shortDescription, price: product.price, imageUrl: product.imageUrl }) }}> Delete </Button> </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Dialog open={this.state.showEdit} onClose={this.showEditModal} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Edit Product</DialogTitle>
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
                                value={this.state.shortDescription}
                                onChange={this.updateShortDescription.bind(this)}
                                margin="dense"
                                id="shortDescription"
                                label="Short Description"
                                type="shortDescription"
                                fullWidth
                            />
                            <TextField
                                value={this.state.price}
                                onChange={this.updatePrice.bind(this)}
                                margin="dense"
                                id="price"
                                label="Price"
                                type="price"
                                fullWidth
                            />
                            <TextField
                                value={this.state.imageUrl}
                                onChange={this.updateImageUrl.bind(this)}
                                margin="dense"
                                id="imageUrl"
                                label="Image Url"
                                type="imageUrl"
                                fullWidth
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.showEditModal} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={this.EditProduct.bind(this)} color="primary">
                                Submit
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog open={this.state.showDelete} onClose={this.showDeleteModal} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Really Delete {this.state.name} ? </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                <p> ID: {this.state.currentProductID} <br />
                                    Name: {this.state.name} <br />
                                    Short Description: {this.state.shortDescription} <br />
                                    Price: {this.state.price} <br />
                                    Image Url: {this.state.imageUrl} <br />
                                </p>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.showDeleteModal} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={this.DeleteProduct.bind(this)} color="primary">
                                Submit
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            );
        }
    }
}