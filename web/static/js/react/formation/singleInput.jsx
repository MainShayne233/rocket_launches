import React, { Component, PropTypes } from 'react'
import Select from 'react-select'

export default class SingleInput extends Component{

  // Lifecycle Functions

  constructor(props) {
    super(props)
    if (this.props.defaultValue) {
      this.state = {
        value: {
          label: this.props.defaultValue,
          value: this.props.defaultValue,
        } || '',
      }
    }
    else{
      this.state = {
        value: '',
      }
    }
  }

  // Utility Functions

  clear() {
    this.setState({value: '', displayValue: ''})
    this.refs.field.setState({inputValue: ''})
  }

  closeMenu() {
    this.refs.field.setState({isOpen: false})
  }

  focus() {
    this.refs.field.focus()
  }

  value() {
    if(typeof(this.state.value) == "string") {
      return this.state.value
    }
    else if(typeof(this.state.value) == "object") {
      return this.state.value.value
    }
    else {
      return ''
    }
  }

  // Handler Functions

  handleKeyDown(event) {
    if(event.keyCode == 9) {
      return false
    }
  }

  handleChange(event) {
    const value = this.refs.field.state.inputValue
    this.handleValueChange(value)
  }

  handleValueChange(newValue) {
    this.setState({value: newValue}, () => {
      this.props.handleCallbacks()
      this.props.reflowRow(this.props.row)
    })
  }

  // Component Functions

  selectParameters() {
    let params = {
      ref: "field",
      placeholder: this.props.placeholder || this.props.name,
      value: this.state.value,
      className: "formation single input",
      openOnFocus: false,
      onOpen: this.closeMenu.bind(this),
      onBlurResetsInput: false,
      clearable: false,
    }
    return params
  }

  // Render Functions

  render() {
    return (
      <div
        ref="container"
        className="formation field-container single input"
        onKeyDown={this.handleKeyDown.bind(this)}
        onKeyUp={this.handleChange.bind(this)}
        >
        {React.createElement(Select, this.selectParameters())}
      </div>
    )
  }

}

SingleInput.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  row: PropTypes.number.isRequired,
  focusOnNextField: PropTypes.func.isRequired,
  handleCallbacks: PropTypes.func.isRequired,
  rowByIndex: PropTypes.func.isRequired,
  reflowRow: PropTypes.func.isRequired,
}
