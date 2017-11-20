'use strict';

exports.__esModule = true;

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _base = require("./base.js");

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var http = require("http");
var fs = require("fs");

var _class = function (_Base) {
  (0, _inherits3.default)(_class, _Base);

  function _class() {
    (0, _classCallCheck3.default)(this, _class);
    return (0, _possibleConstructorReturn3.default)(this, _Base.apply(this, arguments));
  }

  // 注册页面
  _class.prototype.indexAction = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var uinfo;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.session('uInfo');

            case 2:
              uinfo = _context.sent;

              if (think.isEmpty(uinfo)) {
                _context.next = 7;
                break;
              }

              return _context.abrupt("return", this.redirect('/personal/@' + uinfo.name));

            case 7:
              this.assign("title", "会员注册");
              return _context.abrupt("return", this.displayView("register_index"));

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function indexAction() {
      return _ref.apply(this, arguments);
    }

    return indexAction;
  }();

  _class.prototype.checkcaptchaAction = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      var key, request, secretKey, verificationUrl, result, res;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return this.post("captchasecret");

            case 2:
              key = _context2.sent;
              request = require('request');

              if (!(key === undefined || key === '' || key === null)) {
                _context2.next = 6;
                break;
              }

              return _context2.abrupt("return", this.json({ "responseCode": 1, "responseDesc": "Please select captcha" }));

            case 6:
              // Put your secret key here.
              secretKey = "6Lc7SRAUAAAAAFBgqATY0MiyKBbIXMPhJsVqgpzr1";
              // req.connection.remoteAddress will provide IP address of connected user.

              verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + key;

              console.log(key);
              result = false;
              //   if (key) {
              //     request({
              //         url: 'https://www.google.com/recaptcha/api/siteverify',
              //         method: 'POST',
              //         form: {
              //             secret: secretKey,
              //             response: key
              //         }
              //     }, function (error, response, body) {
              //         // Parse String thành JSON object
              //         try {
              //             body = JSON.parse(body);
              //         } catch (err) {
              //             body = {};
              //         }
              //
              //         if (!error && response.statusCode == 200 && body.success) {
              //           console.log("tc");
              //         } else {
              //           console.log("tb");
              //           return this.json({ registeredSuccessfully: false, reason: "Captcha failed, try again." });
              //             // Xử lý lỗi nếu Captcha không hợp lệ
              //         }
              //     });
              // } else {
              //       return this.json({"responseCode" : 1,"responseDesc" : "Please select captcha"});
              // }
              //   think.http(verificationUrl).then(function(content){
              // console.log(content);
              // });
              // Hitting GET request to the URL, Google will respond with success or error scenario.
              // think.get(verificationUrl,function(data){
              //   console.log(data);
              // })
              // request(verificationUrl,function(error,response,body) {
              //   console.log(response)
              //   result=true;
              //   body = JSON.parse(body);
              //
              //   // Success will be true or false depending upon captcha validation.
              //   if(body.success !== undefined && !body.success) {
              //     console.log("that bai");
              //     //console.log(body)
              //     //response.end('{"success" : "Updated Successfully", "status" : 200}');
              //     return this.json({"responseCode" : 1,"responseDesc" : "Failed captcha verification"});
              //   }
              //
              //
              // });

              _context2.next = 12;
              return doRequest(verificationUrl);

            case 12:
              res = _context2.sent;

              console.log(res);

              if (!result) {
                _context2.next = 16;
                break;
              }

              return _context2.abrupt("return", this.json({ "responseCode": 0, "responseDesc": "Sucess" }));

            case 16:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function checkcaptchaAction() {
      return _ref2.apply(this, arguments);
    }

    return checkcaptchaAction;
  }();
  //注册接口


  _class.prototype.doregisterAction = function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
      var key, secretKey, verificationUrl, newData, name, password, email, s, userFlag, emailFlag, res, result, rs, uInfo;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return this.post("captchasecret");

            case 2:
              key = _context3.sent;
              secretKey = "6Lc7SRAUAAAAAFBgqATY0MiyKBbIXMPhJsVqgpzr";
              verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + key;
              newData = this.post();
              name = newData.name;
              password = newData.password;
              email = newData.email;

              if (!(name !== '' && password !== '' && email !== '')) {
                _context3.next = 25;
                break;
              }

              _context3.next = 12;
              return this.checkIsExist({ name: name });

            case 12:
              s = _context3.sent;
              _context3.next = 15;
              return this.checkIsExist({ name: name });

            case 15:
              userFlag = _context3.sent;
              _context3.next = 18;
              return this.checkIsExist({ email: email });

            case 18:
              emailFlag = _context3.sent;

              if (!(userFlag === 0)) {
                _context3.next = 23;
                break;
              }

              return _context3.abrupt("return", this.json({ tags: "username", errmsg: 'Tài khoản đã tồn tại！' }));

            case 23:
              if (!(emailFlag === 0)) {
                _context3.next = 25;
                break;
              }

              return _context3.abrupt("return", this.json({ tags: "email", errmsg: 'Email đã tồn tại！' }));

            case 25:
              if (!key) {
                _context3.next = 49;
                break;
              }

              _context3.next = 28;
              return doRequest(verificationUrl);

            case 28:
              res = _context3.sent;
              result = JSON.parse(res);

              console.log(result.success);

              if (result.success) {
                _context3.next = 35;
                break;
              }

              return _context3.abrupt("return", this.json({ tags: "g-recaptcha", errmsg: "Captcha thất bại, hãy thử lại." }));

            case 35:
              newData.password = think.md5(newData.password);
              newData.nickname = newData.name;
              // 后台校验
              newData.createtime = think.datetime(this.post('createtime'));
              _context3.next = 40;
              return this.model('home').addUser(newData);

            case 40:
              rs = _context3.sent;
              uInfo = {
                email: email,
                pic: '',
                name: name,
                nickname: '',
                openid: '',
                way: 'site'
              };

              console.log("them thanh cong" + rs);
              _context3.next = 45;
              return this.session("uInfo", uInfo);

            case 45:
              if (!(rs == 0)) {
                _context3.next = 47;
                break;
              }

              return _context3.abrupt("return", this.success());

            case 47:
              _context3.next = 50;
              break;

            case 49:
              return _context3.abrupt("return", this.json({ tags: "g-recaptcha", errmsg: "Vui lòng chọn captcha" }));

            case 50:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function doregisterAction() {
      return _ref3.apply(this, arguments);
    }

    return doregisterAction;
  }();

  // Helper function to make API call to recatpcha and check response
  // 获取网络头像并保存
  // async getpicAction(){
  //     let url="http://www.jsout.com/static/common/images/common/logo.jpg";
  //     http.get(url, function(res){
  //           var imgData = "";
  //           res.setEncoding("binary"); //一定要设置response的编码为binary否则会下载下来的图片打不开
  //           res.on("data", function(chunk){
  //               imgData+=chunk;
  //           });
  //           console.log(url);
  //           res.on("end", function(){
  //               let mypath=think.RESOURCE_PATH+"/static/common/images/pic/logonew.png"
  //               fs.writeFile(mypath, imgData, "binary", function(err){
  //                   if(err){
  //                       console.log(err);
  //                   }else {
  //                     return mypath;
  //                   }
  //                   // console.log("down success");
  //               });
  //           });
  //       });
  // }


  _class.prototype.adduserAction = function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
      var newData, name, email, nickname, openid, s, rs, uinfo;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              newData = this.post();
              // 后台校验

              name = newData.name;
              email = newData.email;
              nickname = newData.nickname;
              openid = newData.openid;

              newData.createtime = think.datetime(this.post('createtime'));

              if (!(name !== '' && nickname !== '' && email !== '' && openid !== '')) {
                _context4.next = 25;
                break;
              }

              _context4.next = 9;
              return this.checkIsExist({ name: name });

            case 9:
              s = _context4.sent;

              if (!(s === 0)) {
                _context4.next = 14;
                break;
              }

              return _context4.abrupt("return", this.json({ status: 0, errno: 1, errmsg: '该用户名已存在！' }));

            case 14:
              _context4.next = 16;
              return this.model('home').addUser(newData);

            case 16:
              rs = _context4.sent;
              _context4.next = 19;
              return this.session('uInfo');

            case 19:
              uinfo = _context4.sent;

              uinfo.name = name;

              if (!rs) {
                _context4.next = 23;
                break;
              }

              return _context4.abrupt("return", this.success());

            case 23:
              _context4.next = 26;
              break;

            case 25:
              return _context4.abrupt("return", this.fail('请填写必要信息！'));

            case 26:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function adduserAction() {
      return _ref4.apply(this, arguments);
    }

    return adduserAction;
  }();

  //检查是否存在


  _class.prototype.checkIsExist = function () {
    var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(where) {
      var rs, s;
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return this.model('home').findUser(where);

            case 2:
              rs = _context5.sent;
              s = rs.length > 0 ? 0 : 1;
              return _context5.abrupt("return", s);

            case 5:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function checkIsExist(_x) {
      return _ref5.apply(this, arguments);
    }

    return checkIsExist;
  }();

  //校验注册用户名是否存在


  _class.prototype.isexistAction = function () {
    var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6() {
      var name, s;
      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return this.post('name');

            case 2:
              name = _context6.sent;
              _context6.next = 5;
              return this.checkIsExist({ name: name });

            case 5:
              s = _context6.sent;

              if (!(s == 1)) {
                _context6.next = 10;
                break;
              }

              return _context6.abrupt("return", this.json({ status: 1, errno: 0, errmsg: '用户名可用！' }));

            case 10:
              return _context6.abrupt("return", this.json({ status: 0, errno: 1, errmsg: '该用户名已存在！' }));

            case 11:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function isexistAction() {
      return _ref6.apply(this, arguments);
    }

    return isexistAction;
  }();

  //校验邮箱是否存在


  _class.prototype.checkemailAction = function () {
    var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7() {
      var email, s;
      return _regenerator2.default.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return this.post('email');

            case 2:
              email = _context7.sent;
              _context7.next = 5;
              return this.checkIsExist({ 'email': email });

            case 5:
              s = _context7.sent;

              if (!(s == 1)) {
                _context7.next = 10;
                break;
              }

              return _context7.abrupt("return", this.json({ status: 1, errno: 0, errmsg: '该邮箱可用！' }));

            case 10:
              return _context7.abrupt("return", this.json({ status: 0, errno: 1, errmsg: '该邮箱已存在！' }));

            case 11:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function checkemailAction() {
      return _ref7.apply(this, arguments);
    }

    return checkemailAction;
  }();

  //极验验证码


  _class.prototype.geetestAction = function () {
    var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8() {
      var Geetest, geetest, post, res, _res;

      return _regenerator2.default.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              // pc 端接口
              Geetest = think.service("geetest"); //加载 commoon 模块下的 geetset service

              geetest = new Geetest();

              if (!this.isPost()) {
                _context8.next = 10;
                break;
              }

              post = this.post();
              _context8.next = 6;
              return geetest.validate(post);

            case 6:
              res = _context8.sent;
              return _context8.abrupt("return", this.json(res));

            case 10:
              _context8.next = 12;
              return geetest.register(this.get('type'));

            case 12:
              _res = _context8.sent;
              return _context8.abrupt("return", this.json(_res));

            case 14:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    function geetestAction() {
      return _ref8.apply(this, arguments);
    }

    return geetestAction;
  }();

  return _class;
}(_base2.default);

exports.default = _class;


function doRequest(url) {
  var request = require('request');
  return new _promise2.default(function (resolve, reject) {
    request(url, function (error, res, body) {
      if (!error && res.statusCode == 200) {
        resolve(body);
      } else {
        reject(error);
      }
    });
  });
}
//# sourceMappingURL=register.js.map