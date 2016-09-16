import React, { Component, PropTypes } from 'react'

export default class Submit extends Component{

  render() {
    return (
      <input
        className={this.props.className}
        type="submit"
        value={this.props.label || "Submit"}
      />
    )
  }

}

Submit.propTypes = {
  label: PropTypes.string.isRequired,
}
