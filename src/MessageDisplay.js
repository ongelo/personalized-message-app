import React, { Component } from 'react';

class MessageDisplay extends Component {

  render() {
    
    return (
      <div className="message-display">
        {this.props.personalizedMessage}
      </div>
    );
  }
}

export default MessageDisplay;
