import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';


const useStyles = (theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
});

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

class ProductList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            products: []            

        };
    }

    //Send a get request to /api/products and store in products[]
    async GetAllProducts() {
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

    componentDidMount() {

        this.GetAllProducts();

    }

    render() {

        const { error, isLoaded, products } = this.state;
        const classes = this.props;

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    <div>
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            Products
                        </Typography>
                    </div>
                    <div classname={classes.root}>
                        <Grid container>
                            <Grid item>
                            {products.map(product => (
                                <List component="nav">
                                    <ListItemLink href={'/api/Products/' + product.productID}>
                                        <ListItemText>
                                            {product.name} {product.shortDescription} {product.price} {product.imageUrl}
                                        </ListItemText>
                                    </ListItemLink>
                                    <Divider />
                                </List>
                            ))}
                            </Grid>
                        </Grid>
                    </div>
                </div>
                
            );
        }
    }
}

export default withStyles(useStyles)(ProductList)