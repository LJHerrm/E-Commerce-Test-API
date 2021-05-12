﻿import React from 'react';
//import "./Modal.css";

export default class Modal extends React.Component {

    onClose = e => {
        this.props.onClose && this.props.onClose(e);
    };

    render() {

        //Toggles hiding and showing of modal
        if (!this.props.show) {
            return null;
        }

        return (
            <div class = "modal" id = "modal" >
                <h2>Modal Window <button onClick={this.onClose}> X </button> </h2> 
                <div class = "content">{this.props.children}</div>
                <div class = "actions">
                    <button class = "toggle-button" onClick = {this.onClose} >
                        Cancel
                    </button>
                </div>
            </div>
        );
    }
}