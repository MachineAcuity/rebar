// @flow

import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import { withStyles } from '@material-ui/core/styles'

import React from 'react'

const styles = {}

class TextFieldWithError extends React.Component<{
  classes: Object,
  errorText: string,
  id: string,
  label: string,
  helperText: string,
  value: string,
  onChange: Function,
}> {
  render() {
    const { errorText, id, label, helperText, onChange, value } = this.props

    const isError = errorText !== ''

    return (
      <FormControl error={isError} fullWidth={true} id={id}>
        <InputLabel htmlFor={isError ? 'name-simple' : 'name-error'}>{label}</InputLabel>
        <Input id="value" value={value} onChange={onChange} />
        <FormHelperText>{isError ? errorText : helperText}</FormHelperText>
      </FormControl>
    )
  }
}

export default withStyles(styles)(TextFieldWithError)
