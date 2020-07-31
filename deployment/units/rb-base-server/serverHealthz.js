"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _defaultPersister = _interopRequireDefault(require("../_configuration/rb-base-server/graphql/defaultPersister"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

//

const serverHealthz = (0, _express.default)();

//

serverHealthz.get('/', async (req, res, next) => {
  try {
    await _defaultPersister.default.confirmHealth();

    res.sendStatus(200);
  } catch (err) {
    console.log({ err });
    next(new Error('DB is unreachable'));
  }
});var _default =

serverHealthz;exports.default = _default;
//# sourceMappingURL=serverHealthz.js.map