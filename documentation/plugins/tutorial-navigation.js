"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};
    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          newObj[key] = obj[key];
        }
      }
    }
    newObj.default = obj;
    return newObj;
  }
}
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
function _optionalChain(ops) {
  let lastAccessLHS = undefined;
  let value = ops[0];
  let i = 1;
  while (i < ops.length) {
    const op = ops[i];
    const fn = ops[i + 1];
    i += 2;
    if ((op === "optionalAccess" || op === "optionalCall") && value == null) {
      return undefined;
    }
    if (op === "access" || op === "optionalAccess") {
      lastAccessLHS = value;
      value = fn(value);
    } else if (op === "call" || op === "optionalCall") {
      value = fn((...args) => value.call(lastAccessLHS, ...args));
      lastAccessLHS = undefined;
    }
  }
  return value;
}
var _path = require("path");
var _path2 = _interopRequireDefault(_path);

function plugin() {
  return {
    name: "docusaurus-plugin-refine-tutorial-navigation",
    configureWebpack(config) {
      return {
        resolve: {
          alias: {
            "@tutorial-navigation": _path2.default.join(
              _optionalChain([
                config,
                "access",
                (_) => _.resolve,
                "optionalAccess",
                (_2) => _2.alias,
                "optionalAccess",
                (_3) => _3["@generated"],
              ]),
              "docusaurus-plugin-refine-tutorial-navigation",
              "default",
            ),
          },
        },
      };
    },
    getPathsToWatch() {
      return [_path2.default.join(__dirname, "../tutorials.js")];
    },
    async loadContent() {
      const tutorials = await Promise.resolve().then(() =>
        _interopRequireWildcard(require("../tutorials.js")),
      );

      return tutorials.tutorial;
    },
    async contentLoaded({ content, allContent, actions }) {
      const { createData } = actions;

      await createData(
        `tutorial-navigation-data.json`,
        JSON.stringify(content),
      );
    },
  };
}
exports.default = plugin;
