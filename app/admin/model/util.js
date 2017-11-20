'use strict';exports.__esModule = true;var _regenerator = require("babel-runtime/regenerator");var _regenerator2 = _interopRequireDefault(_regenerator);var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require("babel-runtime/helpers/inherits");var _inherits3 = _interopRequireDefault(_inherits2);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _class = function (_think$model$base) {(0, _inherits3.default)(_class, _think$model$base);function _class() {(0, _classCallCheck3.default)(this, _class);return (0, _possibleConstructorReturn3.default)(this, _think$model$base.apply(this, arguments));}_class.prototype.


    getIndex = function () {var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(info) {var itemList, result, Page, page, pageData;return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return (

                                this.model(info.db).where(info.where).page(info.page, info.pagesize).select());case 2:itemList = _context.sent;
                            console.log(itemList);_context.next = 6;return (
                                this.model(info.db).where(info.where).page(info.page, info.pagesize).countSelect());case 6:result = _context.sent;
                            Page = think.adapter("template", "page");
                            page = new Page();
                            pageData = page.pagination(result, info.page);return _context.abrupt("return",

                            {
                                itemList: itemList,
                                pageData: pageData });case 11:case "end":return _context.stop();}}}, _callee, this);}));function getIndex(_x) {return _ref.apply(this, arguments);}return getIndex;}();_class.prototype.


    getItem = function () {var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(info) {var title, item;return _regenerator2.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:
                            title = "", item = {};if (!
                            info.id) {_context2.next = 8;break;}
                            title = info.edit;_context2.next = 5;return (
                                this.model(info.db).where({ id: info.id }).find());case 5:item = _context2.sent;_context2.next = 10;break;case 8:

                            title = info.add;
                            item = {};case 10:return _context2.abrupt("return",

                            {
                                title: title,
                                item: item });case 11:case "end":return _context2.stop();}}}, _callee2, this);}));function getItem(_x2) {return _ref2.apply(this, arguments);}return getItem;}();_class.prototype.


    doSave = function () {var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(info) {var status, rs, _rs;return _regenerator2.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:
                            status = 0;if (
                            think.isEmpty(info.id)) {_context3.next = 8;break;}_context3.next = 4;return (
                                this.model(info.db).where({ id: info.id }).update(info.data));case 4:rs = _context3.sent;
                            if (rs) status = 1;_context3.next = 12;break;case 8:_context3.next = 10;return (

                                this.model(info.db).add(info.data));case 10:_rs = _context3.sent;
                            if (_rs) status = 1;case 12:return _context3.abrupt("return",

                            {
                                status: status });case 13:case "end":return _context3.stop();}}}, _callee3, this);}));function doSave(_x3) {return _ref3.apply(this, arguments);}return doSave;}();_class.prototype.


    doSaveTags = function () {var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(info) {var status, rs, item, _rs2;return _regenerator2.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:
                            status = 0;if (
                            think.isEmpty(info.id)) {_context4.next = 12;break;}_context4.next = 4;return (
                                this.model(info.db).where({ id: info.id }).update(info.data));case 4:rs = _context4.sent;
                            if (rs) status = 1;_context4.next = 8;return (
                                this.model(info.db).where({ id: info.id }).find());case 8:item = _context4.sent;return _context4.abrupt("return",
                            {
                                status: status,
                                data: item });case 12:_context4.next = 14;return (


                                this.model(info.db).add(info.data));case 14:_rs2 = _context4.sent;
                            if (_rs2) status = 1;_context4.next = 18;return (
                                this.model(info.db).where({ id: _rs2 }).find());case 18:item = _context4.sent;return _context4.abrupt("return",
                            {
                                status: status,
                                data: item });case 20:case "end":return _context4.stop();}}}, _callee4, this);}));function doSaveTags(_x4) {return _ref4.apply(this, arguments);}return doSaveTags;}();return _class;}(think.model.base);exports.default = _class;