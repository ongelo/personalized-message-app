import React, { Component } from 'react';
import { Col, FormControl, Button } from 'react-bootstrap';

class CreateYourOwn extends Component {

	constructor() {
		super();
		this.state = {
			message: ""
		};
	}

	/*
		Handles the state change as textarea event changes
		Sets the message state in parent component (Form)
	*/
	handleOnChange = async (event) => {
		await this.setState({ message: event.target.value }); // wait setting the message state
		this.props.setCustomizedMessage(this.state.message);
	}

  render() {
    
    return (
      <div>
      	<br/>
      	<p>References to add variables in the message:</p>
				<Col sm={6}>
					<ul>
						<li>Greeting: <code>$greeting$</code></li>
						<li>Guest First Name: <code>$firstName$</code></li>
						<li>Guest Last Name: <code>$lastName$</code></li>
						<li>Guest Room Number: <code>$roomNumber$</code></li>
					</ul>	
				</Col>
				<Col sm={6}>
					<ul>
						<li>Company Name: <code>$company$</code></li>
						<li>Company City: <code>$city$</code></li>
						<li>Reservation Start Date <code>$startDate$</code></li>
						<li>Reservation End Date <code>$endDate$</code></li>
					</ul>
				</Col>
        <FormControl componentClass="textarea" onChange={this.handleOnChange} value={this.state.message} rows="4" cols="50" placeholder="Enter your message template here.." /> 
        <br/><br/>
        <Button bsStyle="default" onClick={this.props.toggleCreateYourOwn}>Premade Message Templates</Button>
      </div>
    );
  }
}

export default CreateYourOwn;
