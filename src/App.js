import React, { Component } from 'react';
import './App.css';
import Form from './Form';
import MessageDisplay from './MessageDisplay';

class App extends Component {

  constructor() {
    super();
    this.state = {
      personalizedMessage: null,
      greetingMessage: null,
      showMessageDisplay: false
    }
  }

  getFormSubmit = async (values) => {
    await this.setGreetingMessage(values.company.timezone); // wait for this function to set the value of greetingMessage
    this.personalizeMessage(values);
  }

  personalizeMessage = (values) => {
    // store the key variables in an object
    const content = {
      greeting: this.state.greetingMessage,
      firstName: values.guest.firstName,
      lastName: values.guest.lastName,
      roomNumber: values.guest.reservation.roomNumber,
      company: values.company.company,
      city: values.company.city      
    }

    const message = values.message.text;
    // replaces the given string with the selected values
    var result = message.replace('$greeting$', content.greeting)
                .replace('$firstName$', content.firstName)
                .replace('$lastName$', content.lastName)
                .replace('$company$', content.company)
                .replace('$city$', content.city)
                .replace('$roomNumber$', content.roomNumber)
                .replace('$greeting', content.greeting)

    this.setState({ personalizedMessage: result })  
  }

  getTimeZone = (timezone) => {
    if(timezone === 'US/Pacific') {
      return 'America/Los_Angeles';
    } else if(timezone === 'US/Central') {
      return 'America/Chicago';
    } else if(timezone === 'US/Eastern') {
      return 'America/New_York';
    }
  }

  /*
    Sets the greetingMessage based on the timezone of the company
  */
  setGreetingMessage = (company_timezone) => {
    const date = new Date(); // Date in current location
    const timezone = this.getTimeZone(company_timezone); // set timezone based on company location
    var dateTimeZoned = date.toLocaleString('en-US', { timeZone: timezone, hour12: false }); // convert date Object to string based on timezone
    var hour2Digit = dateTimeZoned.slice(12, 14); // '10/10/2010, 13:00' -> '13'
    hour2Digit = parseInt(hour2Digit); // convert string to integer

    // Set the greetingMessage based on hour2Digit
    if (hour2Digit < 12) {
      this.setState({ greetingMessage: 'Good morning' });
    } else if (hour2Digit < 18) {
      this.setState({ greetingMessage: 'Good afternoon' });
    } else {
      this.setState({ greetingMessage: 'Good evening' });
    }    
  }

  toggleShowMessageDisplay = () => {
    this.setState({ showMessageDisplay: !this.state.showMessageDisplay })
  }

  render() {
    return (
      <div className="app">
         <Form 
            setFormSubmit={this.getFormSubmit}
            toggleShowMessageDisplay={this.toggleShowMessageDisplay}
         />
         <MessageDisplay 
            personalizedMessage={this.state.personalizedMessage}
            visible={this.state.showMessageDisplay}
            toggleShowMessageDisplay={this.toggleShowMessageDisplay}
         />
      </div>
    );
  }
}

export default App;
