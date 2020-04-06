"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var Sequelize = _interopRequireWildcard(require("sequelize"));

var sequelize = _interopRequireWildcard(require("../dbConnection"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

if (!(sequelize instanceof Sequelize)) throw new Error("DB connection error");
var AccountType = sequelize.define("accountType", {
  userId: {
    type: Sequelize.INTEGER
  },
  accountType: {
    type: Sequelize.STRING
  }
});
sequelize.sync();
var _default = AccountType;
exports.default = _default;