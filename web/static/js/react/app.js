import React, { Component, PropTypes } from 'react'
import SubscriptionFormContainer from './subscriptionFormContainer'
import axios from "axios"

class App extends React.Component {

  render() {
    return(
      <div id="container">
        <div
          id="logo"
          >
        </div>
        <SubscriptionFormContainer/>
      </div>
    )
  }

}

export default App
