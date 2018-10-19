import React, { Component } from 'react';
import message_templates from './json/message_templates.json';
import companies_list from './json/Companies';
import guests_list from './json/Guests';
import CreateYourOwn from './CreateYourOwn';
import { Button, FormControl, ControlLabel } from 'react-bootstrap';

class Form extends Component {

  constructor() {
    super();
    this.state = {
      guest: null, // guest object
      company: null, // company object
      message: null, // message object
      createYourOwnVisible: false
    }
  }

  /*
      Handles the Submit event and calls the App component's function to
  */
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.toggleShowMessageDisplay();
    this.props.setFormSubmit(this.state);
  }

  /*
      Checks the type of the input and loads the proper object into
      the corresponding state
  */
  handleOnChange = (event, type) => {
    // value is set to the key of the item in the array
    const itemKEY = event.target.value;
    if(type === 'guest') {
      const guest = guests_list[itemKEY];
      this.setState({ guest });
    } else if(type === 'company') {
      const company = companies_list[itemKEY];
      this.setState({ company });
    } else if(type === 'message') {
      const text = message_templates[itemKEY];
      this.setState({ message: text })
    }
  }

  /*
    Sets the message state to the customized message from CreateYourOwn component
  */
  setCustomizedMessage = (customizedMessage) => {
    this.setState({ message: { text: customizedMessage } });
  }

  /*
    Toggles the visibility of CreateYourOwn component
  */
  toggleCreateYourOwn = () => {
    this.setState({ createYourOwnVisible: !this.state.createYourOwnVisible})
  }

  render() {
    return (
      <div className="form">
          <form onSubmit={this.handleSubmit}>
              <ControlLabel>Select a Company</ControlLabel>
              <FormControl componentClass="select" required onChange={(event) => this.handleOnChange(event, 'company')}>
                <option value="">Select here</option>
                {companies_list.map((value, key) => 
                  <option value={key} key={key}>{value.company}</option>
                )}
              </FormControl>              
              <br/><br/>
              <ControlLabel>Select a Guest</ControlLabel>
              <FormControl componentClass="select" required onChange={(event) => this.handleOnChange(event, 'guest')}>
                <option value="">Select here</option>
                {guests_list.map((value, key) => 
                  <option value={key} key={key}>{value.firstName + ' ' + value.lastName}</option>
                )}
              </FormControl>      
              <br/><br/>  
              {!this.state.createYourOwnVisible ?     
              <div>          
                <ControlLabel>Select a Premade Message Template</ControlLabel>
                <FormControl componentClass="select" required onChange={(event) => this.handleOnChange(event, 'message')}>
                  <option value="">Select here</option>
                  {message_templates.map((value, key) => 
                    <option value={key} key={key}>{value.type}</option>
                  )}
                </FormControl>
                <br/>
                <div>Or you can create your own template by clicking below!</div>
                <br/>
                <Button bsStyle="default" onClick={this.toggleCreateYourOwn}>Create Your Own Template</Button>                
              </div> : <CreateYourOwn toggleCreateYourOwn={this.toggleCreateYourOwn} setCustomizedMessage={this.setCustomizedMessage} /> }

              <br/><br/>            
              <Button bsStyle="success" className="form-submit-btn" type="submit">Generate Message</Button>            
          </form>
      </div>
    );
  }
}

export default Form;
