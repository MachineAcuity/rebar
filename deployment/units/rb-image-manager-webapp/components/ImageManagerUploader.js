"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));
var _FormControl = _interopRequireDefault(require("@material-ui/core/FormControl"));
var _Input = _interopRequireDefault(require("@material-ui/core/Input"));
var _InputLabel = _interopRequireDefault(require("@material-ui/core/InputLabel"));
var _styles = require("@material-ui/core/styles");
var _react = _interopRequireDefault(require("react"));
var _reactDropzone = _interopRequireDefault(require("react-dropzone"));

var _userToken = require("../../rb-appbase-webapp/scripts/userToken2");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const styles = theme => ({
  buttonProperties: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1) },

  dropZone: {
    backgroundColor: '#a0a0a0',
    border: '#000000 1px dashed',
    width: 256,
    height: 256 },

  currentImage: {
    backgroundSize: '100% auto',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    width: 256,
    height: 256 },

  dzActive: {
    border: '#ff0000 1px dashed',
    backgroundColor: '#800000',
    opacity: 1 },

  dzReject: {
    backgroundColor: '#800000',
    border: '0px',
    opacity: 0.5 } });



const reGetFileNameExtension = /(.+?)\.([^.]*$|$)/;

function extractFileNameAndExtension(fileNameFull) {
  // $FlowIgnore we will get two items
  let arrName = reGetFileNameExtension.exec(fileNameFull);
  if (!arrName) {
    arrName = [null, fileNameFull, 'jpg'];
  }

  // $FlowIgnore
  const fileNamePrototype = arrName[1];

  let fileName = '';
  let previousNonLetter = true;
  for (let i = 0; i < fileNamePrototype.length; i++) {
    let char = fileNamePrototype.charAt(i);

    if (char >= 'a' && char <= 'z') {
      if (previousNonLetter) {
        char = char.toUpperCase();
        previousNonLetter = false;
      }
      fileName += char;
    } else if (char >= 'A' && char <= 'Z') {
      previousNonLetter = false;
      fileName += char;
    } else if (char >= '0' && char <= '9') {
      previousNonLetter = true;
      fileName += char;
    } else {
      previousNonLetter = true;
    }
  }

  if (!arrName[2]) throw new Error();

  const fileNameExtension = arrName[2].toLowerCase();

  return { fileName, fileNameExtension };
}

class ImageManagerUploader extends _react.default.Component














{
  constructor(props, context) {
    super(props, context);this.






















    _handle_onDrop = filesDropped => {
      if (filesDropped.length < 1) {
        return;
      } else if (filesDropped.length < 1) {
        // IDEA [User Experience Quality] Replace alert with Material-UI alert
        alert('Please choose one image');
        return;
      } else {
        const fileDropped = filesDropped[0];

        const fileDroppedPreview = URL.createObjectURL(fileDropped);

        const { fileName, fileNameExtension } = extractFileNameAndExtension(fileDropped.name);

        this.setState({
          fileDropped,
          fileDroppedPreview,
          fileName,
          fileNameExtension });

      }
    };this.

    _handle_onChangeFileName = event => {
      this.setState({ fileName: event.target.value });
    };this.

    _handle_onClickUpload = () => {
      const { parameters } = this.props;
      const { fileName, fileNameExtension, fileDropped } = this.state;

      if (!fileDropped) return;

      const formData = new FormData();

      formData.append('uploadedFile', fileDropped);
      formData.append('fileName', fileName);
      formData.append('fileNameExtension', fileNameExtension);

      for (let parameterName in parameters) {
        formData.append(parameterName, parameters[parameterName]);
      }

      const serverURL = '/rb-image-manager/upload';

      var xhr = new XMLHttpRequest();
      xhr.open('POST', serverURL);
      xhr.setRequestHeader('UserToken2', (0, _userToken.getUserToken2)());

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) this._handle_onUploadSuccess(xhr.responseText);else
          this._handle_onUploadFailure(xhr.responseText);
        }
      };

      xhr.send(formData);
    };this.

    _handle_onUploadSuccess = responseText => {
      try {
        const fileName = JSON.parse(responseText).fileName;

        this.props.onChange(fileName);
      } catch (err) {
        alert('Image upload failed');
      }

      this.releasePreview();

      this.setState({
        fileDropped: null,
        fileDroppedPreview: null,
        fileName: '' });

    };this.

    _handle_onUploadFailure = responseText => {
      // IDEA [User Experience Quality] Replace alert with Material-UI alert
      alert('Image upload failed');

      this.releasePreview();

      this.setState({
        fileDropped: null,
        fileDroppedPreview: null,
        fileName: '' });

    };this.

    _handle_onClickCalcelUpload = () => {
      this.releasePreview();

      this.setState({
        fileDropped: null,
        fileDroppedPreview: null,
        fileName: '' });

    };this.state = { fileDropped: null, fileDroppedPreview: null, fileName: '', fileNameExtension: '' };}componentWillUnmount() {this.releasePreview();}releasePreview() {// Make sure to revoke the data uri to avoid memory leaks
    const { fileDroppedPreview } = this.state;if (fileDroppedPreview) {URL.revokeObjectURL(fileDroppedPreview);}}
  renderFilesDropped() {
    const { classes, customizeFileName, label } = this.props;
    const { fileName, fileDroppedPreview } = this.state;

    return /*#__PURE__*/(
      _react.default.createElement("div", null, /*#__PURE__*/
      _react.default.createElement(_FormControl.default, { fullWidth: true }, /*#__PURE__*/
      _react.default.createElement(_InputLabel.default, null, label)), /*#__PURE__*/

      _react.default.createElement("br", null), /*#__PURE__*/
      _react.default.createElement("br", null), /*#__PURE__*/
      _react.default.createElement("br", null), /*#__PURE__*/

      _react.default.createElement("div", { className: classes.dropZone }, /*#__PURE__*/
      _react.default.createElement("img", { alt: "Preview", className: classes.currentImage, src: fileDroppedPreview })),


      customizeFileName && /*#__PURE__*/_react.default.createElement("br", null),
      customizeFileName && /*#__PURE__*/
      _react.default.createElement(_FormControl.default, { fullWidth: true }, /*#__PURE__*/
      _react.default.createElement(_InputLabel.default, null, "File Name"), /*#__PURE__*/
      _react.default.createElement(_Input.default, { value: fileName, onChange: this._handle_onChangeFileName })), /*#__PURE__*/



      _react.default.createElement(_Button.default, { className: classes.buttonProperties, onClick: this._handle_onClickUpload }, "Upload"), /*#__PURE__*/


      _react.default.createElement(_Button.default, { className: classes.buttonProperties, onClick: this._handle_onClickCalcelUpload }, "Clear"), /*#__PURE__*/



      _react.default.createElement("br", null), /*#__PURE__*/
      _react.default.createElement("br", null)));


  }

  renderFilesNotDropped() {
    const { classes, label, parameters, value } = this.props;

    const backgroundImage =
    value !== '' ?
    'url(/rb-image-manager/download?' +
    Object.entries(parameters).
    map(
    ([paramKey, paramValue]) =>
    //$FlowIgnore
    encodeURIComponent(paramKey) + '=' + encodeURIComponent(paramValue) + '&').

    join('') +
    'UserToken2=' +
    (0, _userToken.getUserToken2)() +
    '&fileName=' +
    encodeURIComponent(value) +
    ')' :
    '';

    console.log({ XXX: backgroundImage });

    return /*#__PURE__*/(
      _react.default.createElement("div", null, /*#__PURE__*/
      _react.default.createElement(_FormControl.default, { fullWidth: true }, /*#__PURE__*/
      _react.default.createElement(_InputLabel.default, null, label)), /*#__PURE__*/

      _react.default.createElement("br", null), /*#__PURE__*/
      _react.default.createElement("br", null), /*#__PURE__*/
      _react.default.createElement("br", null), /*#__PURE__*/

      _react.default.createElement(_reactDropzone.default, {
        multiple: false,
        ref: "dropzone",
        onDrop: this._handle_onDrop,
        className: classes.dropZone,
        activeClassName: classes.dzActive,
        rejectClassName: classes.dzReject },

      ({ getRootProps, getInputProps }) => /*#__PURE__*/
      _react.default.createElement("div",
      getRootProps({
        className: classes.currentImage,
        style: {
          backgroundImage } }), /*#__PURE__*/



      _react.default.createElement("input", getInputProps()),
      value !== '' && /*#__PURE__*/_react.default.createElement("p", null),
      value === '' && /*#__PURE__*/
      _react.default.createElement("div", { style: { textAlign: 'center' } }, /*#__PURE__*/
      _react.default.createElement("br", null), /*#__PURE__*/
      _react.default.createElement("br", null), "Click or drag"))), /*#__PURE__*/






      _react.default.createElement("br", null), /*#__PURE__*/
      _react.default.createElement("br", null)));


  }

  render() {
    const { fileDropped } = this.state;

    return fileDropped ? this.renderFilesDropped() : this.renderFilesNotDropped();
  }}var _default =


(0, _styles.withStyles)(styles)(ImageManagerUploader);exports.default = _default;
//# sourceMappingURL=ImageManagerUploader.js.map