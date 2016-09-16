import React, { Component, PropTypes } from 'react'
import Select from 'react-select'

export default class SingleSelect extends Component{

  // Lifecycle Functions

  constructor(props) {
    super(props)
    this.state = {
      value: this.props.defaultValue || '',
      options: this.props.options || [],
    }
  }

  // Utility Functions

  clear() {
    this.state.value = ''
  }

  focus() {
    this.refs.field.focus()
  }

  isBlank(value) {
    return Array.isArray(value)
  }

  isNotBlank(value) {
    return !this.isBlank(value)
  }

  // Handler Functions

  handleKeyDown(event) {
    if(event.keyCode == 9) {
      return false
    }
  }

  handleKeyUp(event) {
    if(event.keyCode == 13 && this.props.allowCreate != false) {
      const inputValue = this.refs.field.state.inputValue.trim()
      if (inputValue != "") {
        this.addOption(inputValue)
        this.setValue(inputValue)
        this.props.focusOnNextField()
      }
    }
  }

  handleChange(selectedValue) {
    this.handleValueChange(selectedValue)
    if(this.isNotBlank(selectedValue)) {
      this.props.focusOnNextField()
    }
  }

  handleValueChange(newValue) {
    const value = this.parsedValue(newValue)
    this.setState({value: value}, () => {
        this.props.handleCallbacks()
        this.props.reflowRow(this.props.row)
      }
    )
  }

  // Option Functions

  addOption(newOption){
    let currentOptions = this.state.options
    currentOptions.push(this.formattedOption(newOption))
    this.setOptions(currentOptions)
  }

  formattedOptions(){
    return this.state.options.map((option) => this.formattedOption(option) )
  }

  formattedOption(option) {
    if(typeof(option) == "string") {
      return {label: option, value: option}
    }
    return option
  }

  setOptions(newOptions) {
    this.setState({options: newOptions})
  }

  // Value Functions

  parsedValue(value) {
    if (typeof(value) == "string") {
      return {label: value, value: value}
    }
    else if(this.isBlank(value)) {
      return ''
    }
    else {
      return value
    }
  }

  optionValue(option) {
    return typeof(option) == "object" ? option.value : option
  }

  value() {
    return this.optionValue(this.state.value)
  }

  setValue(value) {
    this.handleValueChange(value)
  }

  // Component Functions

  selectParameters() {
    let params = {
      ref: "field",
      placeholder: this.props.name,
      value: this.state.value,
      className: "formation single select",
      options: this.formattedOptions(),
      onChange: this.handleChange.bind(this),
      tabSelectsValue: !!this.props.tabSelectsValues,
      openOnFocus: !(this.props.openOnFocus == false),
      clearable: false,
    }
    return params
  }

  // Render Functions

  render(){
    return (
      <div
        ref="container"
        className="formation field-container single select"
        onKeyDown={this.handleKeyDown.bind(this)}
        onKeyUp={this.handleKeyUp.bind(this)}
        >
        {React.createElement(Select, this.selectParameters())}
      </div>
    )
  }

}

SingleSelect.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  row: PropTypes.number.isRequired,
  focusOnNextField: PropTypes.func.isRequired,
  handleCallbacks: PropTypes.func.isRequired,
  rowByIndex: PropTypes.func.isRequired,
  reflowRow: PropTypes.func.isRequired,
}
