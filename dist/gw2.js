(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.gw2 = factory());
}(this, function () { 'use strict';

  var buildUrl = function buildUrl(target) {
    return "https://api.guildwars2.com/v2/" + target;
  };

  var STATUS_OK = 200;
  var STATE_COMPLETED = 4;
  var buildUriWithParams = function buildUriWithParams(uri, params) {
      return uri + '?' + Object.keys(params).map(function (key) {
          return key + '=' + params[key];
      }).join('&');
  };
  var getAsync$1 = function getAsync(url) {
      var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      return new Promise(function (resolve, reject) {
          var req = new XMLHttpRequest();
          var doReject = function doReject() {
              reject(req);
          };
          var doResolve = function doResolve() {
              if (req.readyState === STATE_COMPLETED && req.status === STATUS_OK) {
                  resolve(JSON.parse(req.responseText));
              } else {
                  doReject();
              }
          };
          req.addEventListener('load', doResolve);
          req.addEventListener('error', doReject);
          req.addEventListener('abort', doReject);
          if (params) {
              url = buildUriWithParams(url, params);
          }
          req.open('get', url, true);
          req.send();
      });
  };
  var xhr = {
      getAsync: getAsync$1
  };

  var AccessType;
  (function (AccessType) {
      AccessType[AccessType["None"] = 0] = "None";
      AccessType[AccessType["PlayForFree"] = 1] = "PlayForFree";
      AccessType[AccessType["GuildWars2"] = 2] = "GuildWars2";
      AccessType[AccessType["HeartOfThorns"] = 3] = "HeartOfThorns";
  })(AccessType || (AccessType = {}));
  var rawAccesTypeToAccessType = function rawAccesTypeToAccessType(rawAccess) {
      switch (rawAccess) {
          case "PlayForFree":
              return AccessType.PlayForFree;
          case "GuildWars2":
              return AccessType.GuildWars2;
          case "HeartOfThorns":
              return AccessType.HeartOfThorns;
          case "None":
          default:
              return AccessType.None;
      }
  };
  var buildAccountFromRawAccount = function buildAccountFromRawAccount(rawAccount) {
      return {
          access: rawAccesTypeToAccessType(rawAccount.access),
          commander: rawAccount.commander,
          created: new Date(rawAccount.created),
          dailyAp: rawAccount.daily_ap,
          fractalLevel: rawAccount.fractal_level,
          guilds: rawAccount.guilds,
          id: rawAccount.id,
          monthlyAp: rawAccount.monthly_ap,
          name: rawAccount.name,
          world: rawAccount.world
      };
  };
  var getAsync = function getAsync(accessToken) {
      return new Promise(function (resolve, reject) {
          xhr.getAsync(buildUrl('account'), {
              'access_token': accessToken
          }).then(function (rawAccount) {
              resolve(buildAccountFromRawAccount(rawAccount));
          }).catch(reject);
      });
  };
  var Account = {
      getAsync: getAsync
  };

  var Api = {
      Account: Account
  };

  var main = {
      Api: Api
  };

  return main;

}));