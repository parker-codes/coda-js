// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"API.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class API {
  constructor(token) {
    // set up axios defaults
    _axios.default.defaults.baseURL = 'https://coda.io/apis/v1beta1';
    _axios.default.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  async request(url, params = {}, method = 'GET') {
    try {
      return await (0, _axios.default)({
        method,
        url,
        data: params,
        params
      });
    } catch (error) {
      console.error(error);
    }
  }

}

var _default = API;
exports.default = _default;
},{}],"models/Doc.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectSpread"));

var _assign = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/assign"));

var _index = require("./index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Doc {
  constructor(API, data) {
    this.API = API; // set properties (id, type, href, browserLink, name, owner, createdAt, updatedAt)

    (0, _assign.default)(this, data);
  }

  async listSections(params) {
    // params: limit, pageToken
    // https://coda.io/developers/apis/v1beta1#operation/listSections
    const {
      data
    } = await this.API.request(`/docs/${this.id}/sections`, params);
    return data.items.map(section => new _index.Section((0, _objectSpread2.default)({}, section, {
      docId: this.id
    }))); // map all items into sections
  }

  async getSection(sectionIdOrName) {
    // https://coda.io/developers/apis/v1beta1#operation/getSection
    const {
      data
    } = await this.API.request(`/docs/${this.id}/sections/${sectionIdOrName}`);
    return new _index.Section((0, _objectSpread2.default)({}, data, {
      docId: this.id
    }));
  }

  async listFolders(params) {
    // params: limit, pageToken
    // https://coda.io/developers/apis/v1beta1#operation/listFolders
    const {
      data
    } = await this.API.request(`/docs/${this.id}/folders`, params);
    return data.items.map(folder => new _index.Folder((0, _objectSpread2.default)({}, folder, {
      docId: this.id
    }))); // map all items into folders
  }

  async getFolder(folderIdOrName) {
    // https://coda.io/developers/apis/v1beta1#operation/getFolder
    const {
      data
    } = await this.API.request(`/docs/${this.id}/folders/${folderIdOrName}`);
    return new _index.Folder((0, _objectSpread2.default)({}, data, {
      docId: this.id
    }));
  }

  async listTables() {
    // https://coda.io/developers/apis/v1beta1#operation/listTables
    const {
      data
    } = await this.API.request(`/docs/${this.id}/tables`);
    return data.items.map(table => new _index.Table(this.API, (0, _objectSpread2.default)({}, table, {
      docId: this.id
    }))); // map all items into tables
  }

  async getTable(tableIdOrName) {
    // https://coda.io/developers/apis/v1beta1#operation/getTable
    const {
      data
    } = await this.API.request(`/docs/${this.id}/tables/${tableIdOrName}`);
    return new _index.Table(this.API, (0, _objectSpread2.default)({}, data, {
      docId: this.id
    }));
  }

}

var _default = Doc;
exports.default = _default;
},{"./index":"models/index.js"}],"models/Column.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _assign = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/assign"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Column {
  constructor(data) {
    // set properties (docId, tableId, id, type, href, name, display, calculated)
    // TODO: possibly need to set calculated to false if it property doesn't exist
    (0, _assign.default)(this, data);
  }

}

var _default = Column;
exports.default = _default;
},{}],"models/utilities.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatRows = void 0;

var _keys = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/keys"));

var _isArray = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/array/is-array"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// formats each row based on whether it is in object or array format
const formatRows = rows => {
  // error handling
  if (!(0, _isArray.default)(rows)) throw new Error('`rows` must be an array');
  if (!rows.length) throw new Error('Must include at least one row when calling `insertRows`');
  const formattedRows = rows.map(row => {
    // detect if array (containing column objects) - the alternative being one object
    if ((0, _isArray.default)(row)) {
      // detect if rows already have column and value as separate properties
      const hasBoth = row.some(column => column.hasOwnProperty('column') && column.hasOwnProperty('value'));
      if (hasBoth) return {
        cells: row
      };
      throw new Error('A row must either be an array of objects for each column, or else one object of column/value pairs..');
    } // // otherwise format it by splitting key/value pairs
    // const formattedRows = row.map(column => {
    //     const [column, value] = Object.entries(column)[0];
    //     return { column, value };
    // });
    // keys are acting as column ID/name


    const columns = [];
    (0, _keys.default)(row).forEach(column => {
      columns.push({
        column,
        value: row[column]
      });
    });
    return {
      cells: columns
    };
  });
  return formattedRows;
};

exports.formatRows = formatRows;
},{}],"models/Row.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _keys = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/keys"));

var _assign = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/assign"));

var _utilities = require("./utilities");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Row {
  constructor(API, data) {
    this.API = API; // set properties (docId, tableId, id, type, href, name, index, browserLink, createdAt, updatedAt, values (object))

    (0, _assign.default)(this, data);
  } // format values as key/value pair array instead of as object


  listValues() {
    const values = [];
    (0, _keys.default)(this.values).forEach(column => {
      values.push({
        column,
        value: this.values[column]
      });
    });
    return values;
  }

  async update(row) {
    // params: row (array - required)
    // https://coda.io/developers/apis/v1beta1#operation/updateRow
    const [formattedRow] = (0, _utilities.formatRows)([row]);
    const params = {
      row: formattedRow
    };
    const {
      status
    } = await this.API.request(`/docs/${this.docId}/tables/${this.tableId}/rows/${this.id}`, params, 'PUT');
    return status === 202;
  }

  async delete() {
    // https://coda.io/developers/apis/v1beta1#operation/deleteRow
    const {
      status
    } = await this.API.request(`/docs/${this.docId}/tables/${this.tableId}/rows/${this.id}`, {}, 'DELETE');
    return status === 202;
  }

}

var _default = Row;
exports.default = _default;
},{"./utilities":"models/utilities.js"}],"models/Table.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectSpread"));

var _assign = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/assign"));

var _Column = _interopRequireDefault(require("./Column"));

var _Row = _interopRequireDefault(require("./Row"));

var _utilities = require("./utilities");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Table {
  constructor(API, data) {
    this.API = API; // set properties (docId, id, type, href, browserLink, name, displayColumn (object), rowCount, createdAt, updatedAt, sorts, layout)

    (0, _assign.default)(this, data);
  }

  async listColumns(params) {
    // params: limit, pageToken
    // https://coda.io/developers/apis/v1beta1#operation/listColumns
    const {
      data
    } = await this.API.request(`/docs/${this.docId}/tables/${this.id}/columns`, params);
    return data.items.map(column => new _Column.default((0, _objectSpread2.default)({}, column, {
      docId: this.docId,
      tableId: this.id
    }))); // map all items into Columns
  }

  async getColumn(columnIdOrName) {
    // https://coda.io/developers/apis/v1beta1#operation/getColumn
    const {
      data
    } = await this.API.request(`/docs/${this.docId}/tables/${this.id}/columns/${columnIdOrName}`);
    return new _Column.default((0, _objectSpread2.default)({}, data, {
      docId: this.docId,
      tableId: this.id
    }));
  }

  async listRows(params) {
    // params: query, useColumnNames, limit, pageToken
    // https://coda.io/developers/apis/v1beta1#operation/listRows
    const {
      data
    } = await this.API.request(`/docs/${this.docId}/tables/${this.id}/rows`, params);
    return data.items.map(row => new _Row.default(this.API, (0, _objectSpread2.default)({}, row, {
      docId: this.docId,
      tableId: this.id
    }))); // map all items into Columns
  }

  async getRow(rowIdOrName, params) {
    // params: useColumnNames
    // https://coda.io/developers/apis/v1beta1#operation/getColumn
    const {
      data
    } = await this.API.request(`/docs/${this.docId}/tables/${this.id}/rows/${rowIdOrName}`, params);
    return new _Row.default(this.API, (0, _objectSpread2.default)({}, data, {
      docId: this.docId,
      tableId: this.id
    }));
  } // upserts rows


  async insertRows(rows = [], keyColumns = []) {
    // params: rows (array - required), keyColumns (array)
    // https://coda.io/developers/apis/v1beta1#operation/upsertRows
    const formattedRows = (0, _utilities.formatRows)(rows);
    const params = {
      rows: formattedRows,
      keyColumns
    };
    const {
      status
    } = await this.API.request(`/docs/${this.docId}/tables/${this.id}/rows`, params, 'POST');
    return status === 202;
  }

  async updateRow(rowIdOrName, row) {
    // params: row (array - required)
    // https://coda.io/developers/apis/v1beta1#operation/updateRow
    const [formattedRow] = this.formatRows([row]);
    const params = {
      row: formattedRow
    };
    const {
      status
    } = await this.API.request(`/docs/${this.docId}/tables/${this.id}/rows/${rowIdOrName}`, params, 'PUT');
    return status === 202;
  }

  async deleteRow(rowIdOrName) {
    // https://coda.io/developers/apis/v1beta1#operation/deleteRow
    const {
      status
    } = await this.API.request(`/docs/${this.docId}/tables/${this.id}/rows/${rowIdOrName}`, {}, 'DELETE');
    return status === 202;
  }

}

var _default = Table;
exports.default = _default;
},{"./Column":"models/Column.js","./Row":"models/Row.js","./utilities":"models/utilities.js"}],"models/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Doc", {
  enumerable: true,
  get: function () {
    return _Doc.default;
  }
});
Object.defineProperty(exports, "Table", {
  enumerable: true,
  get: function () {
    return _Table.default;
  }
});
Object.defineProperty(exports, "Row", {
  enumerable: true,
  get: function () {
    return _Row.default;
  }
});
Object.defineProperty(exports, "Column", {
  enumerable: true,
  get: function () {
    return _Column.default;
  }
});

var _Doc = _interopRequireDefault(require("./Doc"));

var _Table = _interopRequireDefault(require("./Table"));

var _Row = _interopRequireDefault(require("./Row"));

var _Column = _interopRequireDefault(require("./Column"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./Doc":"models/Doc.js","./Table":"models/Table.js","./Row":"models/Row.js","./Column":"models/Column.js"}],"index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectSpread"));

var _API = _interopRequireDefault(require("./API"));

var _models = require("./models");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Coda {
  constructor(token) {
    this.API = new _API.default(token);
  }
  /**
   * Returns information about the user.
   * 
   * @return object 
   */


  async whoAmI() {
    const {
      data
    } = await this.API.request('/whoami');
    return data;
  }
  /**
   * Returns an array of docs.
   * 
   * @param array $params Optional query parameters listed here https://coda.io/developers/apis/v1beta1#operation/listDocs
   * @return array 
   */


  async listDocs(params = {}) {
    const {
      data
    } = await this.API.request('/docs', params);
    return data.items.map(doc => new _models.Doc(this.API, doc)); // map all items into docs
  }

  async getDoc(id) {
    const {
      data
    } = await this.API.request(`/docs/${id}`);
    return new _models.Doc(this.API, data);
  }

  async listSections(docId, params) {
    // params: limit, pageToken
    // https://coda.io/developers/apis/v1beta1#operation/listSections
    const {
      data
    } = await this.API.request(`/docs/${docId}/sections`, params);
    return data.items.map(section => new _models.Section((0, _objectSpread2.default)({}, section, {
      docId
    }))); // map all items into sections
  }

  async getSection(docId, sectionIdOrName) {
    // https://coda.io/developers/apis/v1beta1#operation/getSection
    const {
      data
    } = await this.API.request(`/docs/${docId}/sections/${sectionIdOrName}`);
    return new _models.Section((0, _objectSpread2.default)({}, data, {
      docId
    }));
  }

  async listFolders(docId, params) {
    // params: limit, pageToken
    // https://coda.io/developers/apis/v1beta1#operation/listFolders
    const {
      data
    } = await this.API.request(`/docs/${docId}/folders`, params);
    return data.items.map(folder => new _models.Folder((0, _objectSpread2.default)({}, folder, {
      docId
    }))); // map all items into folders
  }

  async getFolder(docId, folderIdOrName) {
    // https://coda.io/developers/apis/v1beta1#operation/getFolder
    const {
      data
    } = await this.API.request(`/docs/${docId}/folders/${folderIdOrName}`);
    return new _models.Folder((0, _objectSpread2.default)({}, data, {
      docId
    }));
  }

  async listTables(docId) {
    // https://coda.io/developers/apis/v1beta1#operation/listTables
    const {
      data
    } = await this.API.request(`/docs/${docId}/tables`);
    return data.items.map(table => new _models.Table(this.API, (0, _objectSpread2.default)({}, table, {
      docId
    }))); // map all items into tables
  }

  async getTable(docId, tableIdOrName) {
    // https://coda.io/developers/apis/v1beta1#operation/getTable
    const {
      data
    } = await this.API.request(`/docs/${docId}/tables/${tableIdOrName}`);
    return new _models.Table(this.API, (0, _objectSpread2.default)({}, data, {
      docId
    }));
  }

}

var _default = Coda;
exports.default = _default;
},{"./API":"API.js","./models":"models/index.js"}]},{},["index.js"], null)
//# sourceMappingURL=/index.map