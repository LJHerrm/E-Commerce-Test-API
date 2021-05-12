import React from 'react';

export default class ProductManagement extends React.Component {

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
                    <h2>Product Management</h2>
                    
                </div>
            );
        }
    }
}