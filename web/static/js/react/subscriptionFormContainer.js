import React, { Component, PropTypes } from 'react'
import axios from "axios"
import SubscriptionForm from './subscriptionForm'

class SubscriptionFormContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    this.getApiData()
  }

  necessaryApiDataTables() {
    return [
      "rockets",
      "locations",
    ]
  }

  hasAllNecessaryApiData() {
    for (const type of this.necessaryApiDataTables()) {
      if (this.state && !this.state[type]) {
        return false
      }
    }
    return true
  }

  getApiData() {
    for (const type of this.necessaryApiDataTables()) {
      axios.get(`/api/get_${type}`)
           .then((response) => {
             this.setState(response.data)
           })
           .catch(function (error) {
             console.log(error)
           })
    }
  }

  render() {
    if (this.hasAllNecessaryApiData()) {
      return (
        <SubscriptionForm
          schema={this.formSchema()}
        />
      )
    } else {
      return null
    }
  }

  formSchema() {
    return {
      fields: [
        {
          name: "phone_number",
          placeholder: "Phone Number",
          row: 0,
        },
        {
          name: "rockets",
          placeholder: "Rockets (leave blank for all)",
          type: "multiselect",
          options: this.state.rockets,
          row: 1,
        },
        {
          name: "locations",
          placeholder: "Locations (leave blank for all)",
          type: "multiselect",
          options: this.state.locations,
          row: 1,
        }
      ],
      submit: {
        label: "submit",
        className: "ui button submit"
      }
    }
  }
}

export default SubscriptionFormContainer
