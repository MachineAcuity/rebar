"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _reactRelay = require("react-relay");var _UserUpdateMutation;

const mutation = _UserUpdateMutation !== void 0 ? _UserUpdateMutation : _UserUpdateMutation = require("./__generated__/UserUpdateMutation.graphql");











function getOptimisticResponse(User_DisplayName, User_PrimaryEmail, User_PrimaryPhone) {
  return {
    UserUpdate: {
      User: {
        User_DisplayName,
        User_PrimaryEmail,
        User_PrimaryPhone } } };



}

function commit(environment, User_DisplayName, User_PrimaryEmail, User_PrimaryPhone) {
  return (0, _reactRelay.commitMutation)(environment, {
    mutation,

    variables: {
      input: {
        User_DisplayName,
        User_PrimaryEmail,
        User_PrimaryPhone } },



    optimisticResponse: getOptimisticResponse(
    User_DisplayName,
    User_PrimaryEmail,
    User_PrimaryPhone) });


}var _default =

{ commit };exports.default = _default;
//# sourceMappingURL=UserUpdateMutation.js.map