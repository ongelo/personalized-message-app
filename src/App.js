import React, { Component } from 'react';
import './App.css';
import Form from './Form';
import MessageDisplay from './MessageDisplay';
import { getTimeZone, getStartEndDates } from './utils';

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
    const guest = values.guest;
    const company = values.company;
    const reservationDates = getStartEndDates(company.timezone, guest.reservation.startTimestamp, guest.reservation.endTimestamp);
  
    // stores the key variables in an object
    const content = {
      greeting: this.state.greetingMessage,
      firstName: guest.firstName,
      lastName: guest.lastName,
      roomNumber: guest.reservation.roomNumber,
      startDate: reservationDates.startDate,
      endDate: reservationDates.endDate,
      company: company.company,
      city: company.city      
    }

    const message = values.message.text; // stores the templated message to message constant
    // replaces the given string with the selected values
    var result = message.replace('$greeting$', content.greeting)
                .replace('$firstName$', content.firstName)
                .replace('$lastName$', content.lastName)
                .replace('$startDate$', content.startDate)
                .replace('$endDate$', content.endDate)
                .replace('$company$', content.company)
                .replace('$city$', content.city)
                .replace('$roomNumber$', content.roomNumber)
                .replace('$greeting', content.greeting)

    this.setState({ personalizedMessage: result })  
  } 

  /*
    Sets the greetingMessage based on the timezone of the company
  */
  setGreetingMessage = (company_timezone) => {
    const date = new Date(); // Date in current location
    const timezone = getTimeZone(company_timezone); // set timezone based on company location
    var dateTimeZoned = date.toLocaleString('en-US', { timeZone: timezone, hour12: false }); // convert date Object to string based on timezone
    var hour2Digit = dateTimeZoned.split(',')[1].slice(1,3); // '10/10/2010, 13:00' -> '13'
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
