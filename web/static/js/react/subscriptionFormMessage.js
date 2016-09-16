import React, { Component, PropTypes } from 'react'

class SubscriptionFormMessage extends Component {

  handleMessageClose() {
    this.props.dismissMessage()
  }

  render() {
    if (this.props.message) {
      return (
        <div
          className={`ui message ${this.props.message.type}`}
          >
          <div
            className="close-x"
            onClick={this.handleMessageClose.bind(this)}
            >
            x
          </div>
          <div
            className="header"
            >
            {this.props.message.content}
          </div>
          <p>
            {this.props.message.subcontent}
          </p>
        </div>
      )
    } else {
      return null
    }
  }

}

export default SubscriptionFormMessage
