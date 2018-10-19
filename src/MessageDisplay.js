import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

class MessageDisplay extends Component {

  render() {
    
    return (
        <Modal show={this.props.visible}>
          <Modal.Header closeButton>
            <Modal.Title>Message</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.props.personalizedMessage}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.toggleShowMessageDisplay}>Close</Button>
          </Modal.Footer>
        </Modal>
    );
  }
}

export default MessageDisplay;
