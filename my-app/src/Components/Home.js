import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Image from '../img/marketplace.jpg';

const styles = {
    
    paperContainer: {
        height: '100vh',
        backgroundImage: `url(${Image})`,
        backgroundSize: 'cover',
    }
};

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }     

    render() {
        return (

            <div>
                
                
                <Paper style={styles.paperContainer}>
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                        Grocery Store
                    </Typography>
                    <Typography variant="h5" align="center" color="textSecondary" paragraph>
                        Committed to providing safe, healthy food options online. We ship to anywhere in the world!
                    </Typography>
                        </Paper>
                   
                
            </div>
            
        );
    }
}