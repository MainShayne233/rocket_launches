import React, { Component, PropTypes } from 'react'
import Form from './formation/form.jsx'
import axios from "axios"
import SubscriptionFormMessage from './subscriptionFormMessage'

class SubscriptionForm extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  handleSubmit(event) {
    event.preventDefault()
    this.createSubscription()
    this.refs.form.clearFields()
  }

  createSubscription() {
    const subscription = this.refs.form.fieldValues()
    axios.post('/create', {
      subscription: subscription
    })
         .then((response) => {
           console.log(response.data)
           if (response.data == "success") {
             this.setState({
               message: {
                 content: "You have successfully signed up for launch notifications! 🚀",
                 type: "success",
               },
             })
           } else {
             this.setState({
               message: {
                 content: "Houston, we have a problem. ☹️",
                 subcontent: "Something went wrong. Maybe try refreshing and making another attempt?",
                 type: "negative",
               },
             })
           }
         })
  }

  dismissMessage() {
    this.setState({
      message: null
    })
  }

  render() {
    return (
      <div
        className="ui segment"
        >
        <SubscriptionFormMessage
          message={this.state.message}
          dismissMessage={this.dismissMessage.bind(this)}
        />
        <Form
          schema={this.props.schema}
          ref="form"
          focusOnFirst={true}
          handleSubmit={this.handleSubmit.bind(this)}
        />
      </div>
    )
  }

}

export default SubscriptionForm
