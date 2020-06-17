// @flow

import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import { withStyles } from '@material-ui/core/styles'
import React from 'react'
import Dropzone from 'react-dropzone'

import { getUserToken2 } from '../../rb-appbase-webapp/scripts/userToken2'

const styles = (theme) => ({
  buttonProperties: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  dropZone: {
    backgroundColor: '#a0a0a0',
    border: '#000000 1px dashed',
    width: 256,
    height: 256,
  },
  currentImage: {
    backgroundSize: '100% auto',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    width: 256,
    height: 256,
  },
  dzActive: {
    border: '#ff0000 1px dashed',
    backgroundColor: '#800000',
    opacity: 1,
  },
  dzReject: {
    backgroundColor: '#800000',
    border: '0px',
    opacity: 0.5,
  },
})

const reGetFileNameExtension = /(.+?)\.([^.]*$|$)/

function extractFileNameAndExtension(fileNameFull: string) {
  // $FlowIgnore we will get two items
  let arrName: Array<string | null> = reGetFileNameExtension.exec(fileNameFull)
  if (!arrName) {
    arrName = [ null, fileNameFull, 'jpg' ]
  }

  // $FlowIgnore
  const fileNamePrototype: string = arrName[1]

  let fileName = ''
  let previousNonLetter = true
  for (let i = 0; i < fileNamePrototype.length; i++) {
    let char = fileNamePrototype.charAt(i)

    if (char >= 'a' && char <= 'z') {
      if (previousNonLetter) {
        char = char.toUpperCase()
        previousNonLetter = false
      }
      fileName += char
    } else if (char >= 'A' && char <= 'Z') {
      previousNonLetter = false
      fileName += char
    } else if (char >= '0' && char <= '9') {
      previousNonLetter = true
      fileName += char
    } else {
      previousNonLetter = true
    }
  }

  if (!arrName[2]) throw new Error()

  const fileNameExtension = arrName[2].toLowerCase()

  return { fileName, fileNameExtension }
}

class ImageManagerUploader extends React.Component<
  {
    classes: Object,
    customizeFileName?: boolean,
    label: string,
    parameters: { [string]: string },
    value: string,
    onChange: Function,
  },
  {
    fileDropped: ?Object,
    fileDroppedPreview: ?string,
    fileName: string,
    fileNameExtension: string,
  },
> {
  constructor(props: Object, context: Object) {
    super(props, context)

    this.state = {
      fileDropped: null,
      fileDroppedPreview: null,
      fileName: '',
      fileNameExtension: '',
    }
  }

  componentWillUnmount() {
    this.releasePreview()
  }

  releasePreview() {
    // Make sure to revoke the data uri to avoid memory leaks
    const { fileDroppedPreview } = this.state

    if (fileDroppedPreview) {
      URL.revokeObjectURL(fileDroppedPreview)
    }
  }

  _handle_onDrop = (filesDropped: Array<Object>) => {
    if (filesDropped.length < 1) {
      return
    } else if (filesDropped.length < 1) {
      // IDEA [User Experience Quality] Replace alert with Material-UI alert
      alert('Please choose one image')
      return
    } else {
      const fileDropped = filesDropped[0]

      const fileDroppedPreview = URL.createObjectURL(fileDropped)

      const { fileName, fileNameExtension } = extractFileNameAndExtension(fileDropped.name)

      this.setState({
        fileDropped,
        fileDroppedPreview,
        fileName,
        fileNameExtension,
      })
    }
  }

  _handle_onChangeFileName = (event: Object) => {
    this.setState({ fileName: event.target.value })
  }

  _handle_onClickUpload = () => {
    const { parameters } = this.props
    const { fileName, fileNameExtension, fileDropped } = this.state

    if (!fileDropped) return

    const formData = new FormData()

    formData.append('uploadedFile', fileDropped)
    formData.append('fileName', fileName)
    formData.append('fileNameExtension', fileNameExtension)

    for (let parameterName in parameters) {
      formData.append(parameterName, parameters[parameterName])
    }

    const serverURL = '/rb-image-manager/upload'

    var xhr = new XMLHttpRequest()
    xhr.open('POST', serverURL)
    xhr.setRequestHeader('UserToken2', getUserToken2())

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) this._handle_onUploadSuccess(xhr.responseText)
        else this._handle_onUploadFailure(xhr.responseText)
      }
    }

    xhr.send(formData)
  }

  _handle_onUploadSuccess = (responseText: string) => {
    try {
      const fileName = JSON.parse(responseText).fileName

      this.props.onChange(fileName)
    } catch (err) {
      alert('Image upload failed')
    }

    this.releasePreview()

    this.setState({
      fileDropped: null,
      fileDroppedPreview: null,
      fileName: '',
    })
  }

  _handle_onUploadFailure = (responseText: string) => {
    // IDEA [User Experience Quality] Replace alert with Material-UI alert
    alert('Image upload failed')

    this.releasePreview()

    this.setState({
      fileDropped: null,
      fileDroppedPreview: null,
      fileName: '',
    })
  }

  _handle_onClickCalcelUpload = () => {
    this.releasePreview()

    this.setState({
      fileDropped: null,
      fileDroppedPreview: null,
      fileName: '',
    })
  }

  renderFilesDropped() {
    const { classes, customizeFileName, label } = this.props
    const { fileName, fileDroppedPreview } = this.state

    return (
      <div>
        <FormControl fullWidth={true}>
          <InputLabel>{label}</InputLabel>
        </FormControl>
        <br />
        <br />
        <br />

        <div className={classes.dropZone}>
          <img alt="Preview" className={classes.currentImage} src={fileDroppedPreview} />
        </div>

        {customizeFileName && <br />}
        {customizeFileName && (
          <FormControl fullWidth={true}>
            <InputLabel>File Name</InputLabel>
            <Input value={fileName} onChange={this._handle_onChangeFileName} />
          </FormControl>
        )}

        <Button className={classes.buttonProperties} onClick={this._handle_onClickUpload}>
          Upload
        </Button>
        <Button className={classes.buttonProperties} onClick={this._handle_onClickCalcelUpload}>
          Clear
        </Button>

        <br />
        <br />
      </div>
    )
  }

  renderFilesNotDropped() {
    const { classes, label, parameters, value } = this.props

    const backgroundImage =
      value !== ''
        ? 'url(/rb-image-manager/download?' +
          Object.entries(parameters)
            .map(
              ([ paramKey: string, paramValue: string ]) =>
                //$FlowIgnore
                encodeURIComponent(paramKey) + '=' + encodeURIComponent(paramValue) + '&',
            )
            .join('') +
          'UserToken2=' +
          getUserToken2() +
          '&fileName=' +
          encodeURIComponent(value) +
          ')'
        : ''

    console.log({ XXX: backgroundImage })

    return (
      <div>
        <FormControl fullWidth={true}>
          <InputLabel>{label}</InputLabel>
        </FormControl>
        <br />
        <br />
        <br />

        <Dropzone
          multiple={false}
          ref="dropzone"
          onDrop={this._handle_onDrop}
          className={classes.dropZone}
          activeClassName={classes.dzActive}
          rejectClassName={classes.dzReject}
        >
          {({ getRootProps, getInputProps }) => (
            <div
              {...getRootProps({
                className: classes.currentImage,
                style: {
                  backgroundImage,
                },
              })}
            >
              <input {...getInputProps()} />
              {value !== '' && <p />}
              {value === '' && (
                <div style={{ textAlign: 'center' }}>
                  <br />
                  <br />Click or drag
                </div>
              )}
            </div>
          )}
        </Dropzone>

        <br />
        <br />
      </div>
    )
  }

  render() {
    const { fileDropped } = this.state

    return fileDropped ? this.renderFilesDropped() : this.renderFilesNotDropped()
  }
}

export default withStyles(styles)(ImageManagerUploader)
