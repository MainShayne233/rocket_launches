import React, { Component, PropTypes } from 'react'
import Field from './field.jsx'
import Submit from './submit.jsx'


export default class Form extends Component {


  // Lifecycle Functions

  constructor(props) {
    super(props)
    this.state = {
      fieldNames: [],
      maxRow: 0,
    }
  }

  componentDidMount() {
    if (this.props.focusOnFirst) {
      this.focusOnFirst()
    }
  }

  // Utilities

  focusOnFirst() {
    this.refs[this.props.schema.fields[0].name].focus()
  }

  clearFields() {
    for (const field_name of this.formFieldNames()) {
      let field = this.refs[field_name]
      field.clear()
    }
  }

  formFieldNames() {
    return this.props.schema.fields.map((field) => field.name)
  }

  fieldValues() {
    let values = {}
    for (const field_name of this.formFieldNames()) {
      values[field_name] = this.fieldByName(field_name).value()
    }
    return values
  }

  fieldByName(name) {
    return this.refs[name]
  }

  nextFieldByName(name) {
    const fieldNames = this.state.fieldNames
    var nextIndex = fieldNames.indexOf(name) + 1
    if(nextIndex == fieldNames.length) {
      nextIndex = 0
    }
    const nextFieldName = fieldNames[nextIndex]
    return this.refs[nextFieldName]
  }

  reflowRow(fieldRow) {
    const row = this.rowByIndex(fieldRow)
    row.style.setProperty('display', 'none')
    row.offsetHeight
    row.style.setProperty('display', 'flex')
  }

  rowByIndex(index) {
    return this.refs["row" + index]
  }

  // Field Functions

  fieldArgs(fieldSchema, index) {
    let args = {
      ref: fieldSchema.name,
      key: index,
      schema: fieldSchema,
      fieldByName: this.fieldByName.bind(this),
      nextFieldByName: this.nextFieldByName.bind(this),
      reflowRow: this.reflowRow.bind(this),
      rowByIndex: this.rowByIndex.bind(this),
    }
    if (this.props.handleChange) {
      args.onFormChangeCallback = this.props.handleChange
    }
    return args
  }


  fieldRows() {
    let rows = []
    for (const field of this.props.schema.fields) {
      const fieldRow = field.row || 0
      if(!rows[fieldRow]) {
        rows[fieldRow] = []
      }
      rows[fieldRow].push(field)
    }
    return rows
  }


  // Render Functions

  render() {
    return (
      <div>
        <form
          className="formation form"
          ref="form"
          onSubmit={this.props.handleSubmit}
          >
          {this.renderRows()}
          {this.renderSubmit()}
        </form>
      </div>
    )
  }

  renderRows() {
    return this.fieldRows().map((row, index) => (
        <div
          className="formation field-row"
          ref={"row" + index}
          key={index}
          >
          {this.renderRow(row)}
        </div>
      )
    )
  }

  renderRow(row) {
    return row.map((fieldSchema, index) => {
      this.state.fieldNames.push(fieldSchema.name)
      return React.createElement(Field, this.fieldArgs(fieldSchema, index))
    })
  }


  renderSubmit() {
    if(this.props.schema.submit) {
      return React.createElement(Submit, this.props.schema.submit)
    }
  }

}

Form.propTypes = {
  schema: PropTypes.object.isRequired,
}
