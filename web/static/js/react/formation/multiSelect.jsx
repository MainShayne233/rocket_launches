import React, { Component, PropTypes } from 'react'
import Select from 'react-select'
// import 'react-select/dist/react-select.css'

export default class MultiSelect extends Component{

  // Lifecycle Functions

  constructor(props) {
    super(props)
    this.state = {
      value: this.props.defaultValue || '',
      options: this.props.options || [],
      shiftkey: false,
    }
  }

  // Utility Functions

  clear() {
    this.setState({value: ''})
  }

  focus() {
    this.refs.field.focus()
  }

  // Handler Functions

  handleContainerKeyDown(event) {
    if(event.keyCode == 9) {
      return false
    }
  }


  handleContainerKeyUp(event) {
    if(event.keyCode == 13 && this.props.allowCreate != false) {
      let inputValue = this.refs.field.state.inputValue.trim()
      if (inputValue != "") {
        this.addOption(inputValue)
        this.addValue(inputValue)
        this.refs.field.state.inputValue = ''
      }
      if(event.shiftKey && this.props.focusNextOnShiftEnter) {
        this.props.focusOnNextField()
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

  addOption(newOption) {
    let currentOptions = this.state.options
    currentOptions.push(this.formattedOption(newOption))
    this.setOptions(currentOptions)
  }

  formattedOptions() {
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
      return value.map((val) => this.formattedOption(val) )
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
    return (this.state.value || []).map((value) => this.optionValue(value) )
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
      className: "formation multi select",
      options: this.formattedOptions(),
      onChange: this.handleChange.bind(this),
      multi: true,
      tabSelectsValue: !!this.props.tabSelectsValues,
      openOnFocus: !(this.props.openOnFocus == false),
      clearable: false,
    }
    return params
  }

  // Render Functions

  render() {
    return (
      <div
        ref="container"
        className="formation field-container multi select"
        onKeyDown={this.handleContainerKeyDown.bind(this)}
        onKeyUp={this.handleContainerKeyUp.bind(this)}
        >
        {React.createElement(Select, this.selectParameters())}
      </div>
    )
  }

}

MultiSelect.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  row: PropTypes.number.isRequired,
  focusOnNextField: PropTypes.func.isRequired,
  handleCallbacks: PropTypes.func.isRequired,
  rowByIndex: PropTypes.func.isRequired,
  reflowRow: PropTypes.func.isRequired,
}
