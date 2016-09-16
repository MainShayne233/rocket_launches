import React, { Component, PropTypes } from 'react'
import SingleInput from './singleInput.jsx'
import MultiInput from './multiInput.jsx'
import SingleSelect from './singleSelect.jsx'
import MultiSelect from './multiSelect.jsx'

export default class Field extends Component {

  // Lifecycle Functions

  constructor(props) {
    super(props)
    this.state = {
      value: this.props.schema.defaultValue || "",
      options: this.props.schema.options,
    }
  }

  // Utility Functions

  clear() {
    this.field().clear()
  }

  field() {
    return this.refs.field
  }

  focus() {
    this.field().focus()
  }

  focusOnNextField() {
    this.nextField().focus()
  }

  nextField() {
    return this.props.nextFieldByName(this.props.schema.name)
  }

  setOptions(newOptions) {
    this.field().setOptions(newOptions)
  }

  setValue(value) {
    this.field().handleValueChange(value)
  }

  value() {
    return this.field().value()
  }

  // Handler Functions

  handleCallbacks() {
    if(this.props.onFormChangeCallback) {
      this.props.onFormChangeCallback()
    }
    if(this.props.schema.callbacks) {
      for (const callback of this.props.schema.callbacks) {
        let fields = {}
        let fieldNames = (callback.otherRelevantFields || [])
        fieldNames.push(this.props.schema.name)
        for (const fieldName of fieldNames) {
          fields[fieldName] = this.props.fieldByName(fieldName)
        }
        callback.func(fields)
      }
    }
  }

  // Field Functions

  fieldClass() {
    var fieldClass
    if (this.props.schema.type) {
      fieldClass = {
        'singleinput': SingleInput,
        'multiinput': MultiInput,
        'singleselect': SingleSelect,
        'multiselect': MultiSelect
      }[this.props.schema.type.toLowerCase()]
    }
    return fieldClass || SingleInput
  }

  fieldProps() {
    let props = this.props.schema
    props.className = "formation field"
    props.row = props.row || 0
    props.ref = "field"
    props.handleCallbacks = this.handleCallbacks.bind(this)
    props.rowByIndex = this.props.rowByIndex
    props.focusOnNextField = this.focusOnNextField.bind(this)
    props.reflowRow = this.props.reflowRow
    return props
  }

  // Render Functions

  render() {
    return React.createElement(this.fieldClass(), this.fieldProps())
  }

}

Field.propTypes = {
  schema: PropTypes.object.isRequired,
  fieldByName: PropTypes.func.isRequired,
  nextFieldByName: PropTypes.func.isRequired,
  reflowRow: PropTypes.func.isRequired,
  rowByIndex: PropTypes.func.isRequired,
}
