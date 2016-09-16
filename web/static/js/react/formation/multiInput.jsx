import React, { Component, PropTypes } from 'react'
import Select from 'react-select'

export default class MultiInput extends Component {

  // Lifecycle Functions

  constructor(props) {
    super(props)
    this.state = {
      value: this.props.defaultValue || '',
    }
  }

  // Utility Functions

  clear() {
    this.state.value = ''
  }

  closeMenu() {
    this.refs.field.setState({isOpen: false})
  }

  focus() {
    this.refs.field.focus()
  }

  isDelimiterKeyCode(keyCode) {
    if (this.props.delimiterKeyCodes) {
      for (const delimiterkeyCode of this.props.delimiterKeyCodes){
        if(keyCode == delimiterkeyCode) {
          return true
        }
      }
    }
    return keyCode == 188
  }

  // Handler Functions

  handleBlur(event) {
    const inputVal = this.refs.field.state.inputValue
    if (inputVal != '') {
      this.addValue(inputVal)
    }
  }

  handleKeyDown(event) {
    const keyCode = event.keyCode
    if(keyCode == 9) {
      return false
    }
    else if (keyCode == 40 || keyCode == 38) {
      return false
    }
    else if (this.isDelimiterKeyCode(keyCode) && this.props.allowCreate != false) {
      event.preventDefault()
      const inputValue = this.refs.field.state.inputValue.trim()
      if (inputValue != "") {
        this.addValue(inputValue)
        this.refs.field.setState({inputValue: ''})
      }
    }
  }

  handleChange(selectedValue) {
    this.handleValueChange(selectedValue)
  }

  handleValueChange(newValue) {
    const value = this.parsedValue(newValue)
    this.setState({value: value}, () => {
      this.props.handleCallbacks()
      this.props.reflowRow(this.props.row)
    })
  }

  // Option Functions

  formattedOptions() {
    if (this.props.options) {
      return this.props.options.map((option) => this.formattedOption(option) )
    }
    else {
      return []
    }
  }

  formattedOption(option) {
    if(typeof(option) == "string") {
      return {
        label: option,
        value: option,
      }
    }
    return option
  }

  // Value Functions

  addValue(value) {
    let currentValue = this.state.value || []
    currentValue.push(value)
    this.handleValueChange(currentValue)
  }

  parsedValue(value) {
    if(typeof(value) == "string") {
      value = {label: value, value: value}
    }
    if(Array.isArray(value)) {
      return value.map((val) => this.formattedOption(val))
    }
    else {
      return [value]
    }
  }

  optionValue(option) {
    if(typeof(option) == "object") {
      return option.value
    }
    return option
  }

  value() {
    return (this.state.value || []).map((value) => this.optionValue(value))
  }

  setValue(value) {
    this.handleValueChange(value)
  }

  // Component Functions

  selectParameters() {
    let params = {
      ref: "field",
      placeholder: this.props.placeholder || this.props.name,
      value: this.state.value,
      className: "formation multi input",
      onChange: this.handleChange.bind(this),
      onOpen: this.closeMenu.bind(this),
      onBlur: this.handleBlur.bind(this),
      multi: true,
      clearable: false,
    }
    return params
  }

  // Render Functions

  render(){
    return (
      <div
        ref="container"
        className="formation field-container multi input"
        onKeyDown={this.handleKeyDown.bind(this)}
        >
        {React.createElement(Select, this.selectParameters())}
      </div>
    )
  }

}

MultiInput.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  row: PropTypes.number.isRequired,
  focusOnNextField: PropTypes.func.isRequired,
  handleCallbacks: PropTypes.func.isRequired,
  rowByIndex: PropTypes.func.isRequired,
  reflowRow: PropTypes.func.isRequired,
}
