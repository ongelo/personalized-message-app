import React, { Component } from 'react';

class CreateYourOwn extends Component {

	constructor() {
		super();
		this.state = {
			message: ""
		}
	}

	handleOnChange = async (event) => {
		await this.setState({ message: event.target.value }); // wait setting the message state
		this.props.setCustomizedMessage(this.state.message);
	}

  render() {
    
    return (
      <div>
      	<br/>
      	<p>References to add variables in the message:</p>
      	<ul>
      		<li>Greeting: <code>$greeting$</code></li>
      		<li>Guest First Name: <code>$firstName$</code></li>
      		<li>Guest Last Name: <code>$lastName$</code></li>
      		<li>Guest Room Number: <code>$roomNumber$</code></li>
      		<li>Company Name: <code>$company$</code></li>
      		<li>Company City: <code>$city$</code></li>
      	</ul>	
      	<br/>
        <textarea onChange={this.handleOnChange} value={this.state.message} rows="4" cols="50" placeholder="Enter your message template here.." /> 
        <br/><br/>
        <div className="btn" onClick={this.props.toggleCreateYourOwn}>Go Back to Premade Message Templates</div>
      </div>
    );
  }
}

export default CreateYourOwn;
