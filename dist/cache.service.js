var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { defer, from, fromEvent, merge, throwError } from 'rxjs';
import { share, map, catchError } from 'rxjs/operators';
import { CacheStorageService } from './cache-storage';
export var MESSAGES = {
    0: 'Cache initialization error: ',
    1: 'Cache is not enabled.',
    2: 'Cache entry already expired: ',
    3: 'No such key: ',
    4: 'No entries were deleted, because browser is offline.'
};
/**
 * @description Check if it's an HttpResponse
 * @param {any} data - Variable to test
 * @return {boolean} - data from cache
 */
var isHttpResponse = function (data) {
    var orCondition = data &&
        typeof data === 'object' &&
        data.hasOwnProperty('status') &&
        data.hasOwnProperty('statusText') &&
        data.hasOwnProperty('headers') &&
        data.hasOwnProperty('url') &&
        data.hasOwnProperty('body');
    return data && (data instanceof HttpResponse || orCondition);
};
var ɵ0 = isHttpResponse;
var CacheService = /** @class */ (function () {
    function CacheService(_storage) {
        this._storage = _storage;
        this.ttl = 60 * 60; // one hour
        this.cacheEnabled = true;
        this.invalidateOffline = false;
        this.networkStatus = true;
        this.watchNetworkInit();
        this.loadCache();
    }
    CacheService_1 = CacheService;
    CacheService.prototype.loadCache = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._storage.ready()];
                    case 1:
                        _a.sent();
                        this.cacheEnabled = true;
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        this.cacheEnabled = false;
                        console.error(MESSAGES[0], e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CacheService.prototype.ready = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._storage.ready()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @description Disable or enable cache
     */
    CacheService.prototype.enableCache = function (enable) {
        if (enable === void 0) { enable = true; }
        this.cacheEnabled = enable;
    };
    /**
     * @description Delete DB table and create new one
     * @return {Promise<any>}
     */
    CacheService.prototype.resetDatabase = function () {
        return __awaiter(this, void 0, void 0, function () {
            var items;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ready()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this._storage.all()];
                    case 2:
                        items = _a.sent();
                        return [2 /*return*/, Promise.all(items
                                .map(function (item) { return _this.removeItem(item.key); }))];
                }
            });
        });
    };
    /**
     * @description Set default TTL
     * @param {number} ttl - TTL in seconds
     */
    CacheService.prototype.setDefaultTTL = function (ttl) {
        return (this.ttl = ttl);
    };
    /**
     * @description Set if expired cache should be invalidated if device is offline
     * @param {boolean} offlineInvalidate
     */
    CacheService.prototype.setOfflineInvalidate = function (offlineInvalidate) {
        this.invalidateOffline = !offlineInvalidate;
    };
    /**
     * @description Start watching if devices is online or offline
     */
    CacheService.prototype.watchNetworkInit = function () {
        var _this = this;
        this.networkStatus = navigator.onLine;
        var connect = fromEvent(window, 'online').pipe(map(function () { return true; })), disconnect = fromEvent(window, 'offline').pipe(map(function () { return false; }));
        this.networkStatusChanges = merge(connect, disconnect).pipe(share());
        this.networkStatusChanges.subscribe(function (status) {
            _this.networkStatus = status;
        });
    };
    /**
     * @description Stream of network status changes
     * * @return {Observable<boolean>} network status stream
     */
    CacheService.prototype.getNetworkStatusChanges = function () {
        return this.networkStatusChanges;
    };
    /**
     * @description Check if devices is online
     * @return {boolean} network status
     */
    CacheService.prototype.isOnline = function () {
        return this.networkStatus;
    };
    /**
     * @description Save item to cache
     * @param {string} key - Unique key
     * @param {any} data - Data to store
     * @param {string} [groupKey] - group key
     * @param {number} [ttl] - TTL in seconds
     * @return {Promise<any>} - saved data
     */
    CacheService.prototype.saveItem = function (key, data, groupKey, ttl) {
        if (groupKey === void 0) { groupKey = 'none'; }
        if (ttl === void 0) { ttl = this.ttl; }
        if (!this.cacheEnabled) {
            throw new Error(MESSAGES[1]);
        }
        var expires = new Date().getTime() + ttl * 1000, type = isHttpResponse(data) ? 'response' : typeof data, value = JSON.stringify(data);
        return this._storage.set(key, {
            value: value,
            expires: expires,
            type: type,
            groupKey: groupKey
        });
    };
    /**
     * @description Delete item from cache
     * @param {string} key - Unique key
     * @return {Promise<any>} - query execution promise
     */
    CacheService.prototype.removeItem = function (key) {
        if (!this.cacheEnabled) {
            throw new Error(MESSAGES[1]);
        }
        return this._storage.remove(key);
    };
    /**
     * @description Removes all items with a key that matches pattern
     * @return {Promise<any>}
     */
    CacheService.prototype.removeItems = function (pattern) {
        return __awaiter(this, void 0, void 0, function () {
            var regex, items;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.cacheEnabled) {
                            throw new Error(MESSAGES[1]);
                        }
                        regex = new RegExp("^" + pattern.split('*').join('.*') + "$");
                        return [4 /*yield*/, this._storage.all()];
                    case 1:
                        items = _a.sent();
                        return [2 /*return*/, Promise.all(items
                                .map(function (item) { return item.key; })
                                .filter(function (key) { return key && regex.test(key); })
                                .map(function (key) { return _this.removeItem(key); }))];
                }
            });
        });
    };
    /**
     * @description Get item from cache without expire check etc.
     * @param {string} key - Unique key
     * @return {Promise<any>} - data from cache
     */
    CacheService.prototype.getRawItem = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var data, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.cacheEnabled) {
                            throw new Error(MESSAGES[1]);
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this._storage.get(key)];
                    case 2:
                        data = _a.sent();
                        if (!!data) {
                            return [2 /*return*/, data];
                        }
                        throw new Error('');
                    case 3:
                        err_1 = _a.sent();
                        throw new Error(MESSAGES[3] + key);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CacheService.prototype.getRawItems = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._storage.all()];
            });
        });
    };
    /**
     * @description Check if item exists in cache regardless if expired or not
     * @param {string} key - Unique key
     * @return {Promise<boolean | string>} - boolean - true if exists
     */
    CacheService.prototype.itemExists = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.cacheEnabled) {
                    throw new Error(MESSAGES[1]);
                }
                return [2 /*return*/, this._storage.exists(key)];
            });
        });
    };
    /**
     * @description Get item from cache with expire check and correct type assign
     * @param {string} key - Unique key
     * @return {Promise<any>} - data from cache
     */
    CacheService.prototype.getItem = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.cacheEnabled) {
                            throw new Error(MESSAGES[1]);
                        }
                        return [4 /*yield*/, this.getRawItem(key)];
                    case 1:
                        data = _a.sent();
                        if (data.expires < new Date().getTime() && (this.invalidateOffline || this.isOnline())) {
                            throw new Error(MESSAGES[2] + key);
                        }
                        return [2 /*return*/, CacheService_1.decodeRawData(data)];
                }
            });
        });
    };
    CacheService.prototype.getOrSetItem = function (key, factory, groupKey, ttl) {
        return __awaiter(this, void 0, void 0, function () {
            var val, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 5]);
                        return [4 /*yield*/, this.getItem(key)];
                    case 1:
                        val = _a.sent();
                        return [3 /*break*/, 5];
                    case 2:
                        error_1 = _a.sent();
                        return [4 /*yield*/, factory()];
                    case 3:
                        val = _a.sent();
                        return [4 /*yield*/, this.saveItem(key, val, groupKey, ttl)];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, val];
                }
            });
        });
    };
    /**
     * @description Decode raw data from DB
     * @param {any} data - Data
     * @return {any} - decoded data
     */
    CacheService.decodeRawData = function (data) {
        var dataJson = JSON.parse(data.value);
        if (isHttpResponse(dataJson)) {
            var response = {
                body: dataJson._body || dataJson.body,
                status: dataJson.status,
                headers: dataJson.headers,
                statusText: dataJson.statusText,
                url: dataJson.url
            };
            return new HttpResponse(response);
        }
        return dataJson;
    };
    /**
     * @description Load item from cache if it's in cache or load from origin observable
     * @param {string} key - Unique key
     * @param {any} observable - Observable with data
     * @param {string} [groupKey] - group key
     * @param {number} [ttl] - TTL in seconds
     * @return {Observable<any>} - data from cache or origin observable
     */
    CacheService.prototype.loadFromObservable = function (key, observable, groupKey, ttl) {
        var _this = this;
        if (!this.cacheEnabled)
            return observable;
        observable = observable.pipe(share());
        return defer(function () {
            return from(_this.getItem(key)).pipe(catchError(function (e) {
                observable.subscribe(function (res) {
                    return _this.saveItem(key, res, groupKey, ttl);
                }, function (error) {
                    return throwError(error);
                });
                return observable;
            }));
        });
    };
    /**
     * @description Load item from cache if it's in cache or load from origin observable
     * @param {string} key - Unique key
     * @param {any} observable - Observable with data
     * @param {string} [groupKey] - group key
     * @param {number} [ttl] - TTL in seconds
     * @param {string} [delayType='expired']
     * @param {string} [metaKey] - property on T to which to assign meta data
     * @return {Observable<any>} - data from cache or origin observable
     */
    CacheService.prototype.loadFromDelayedObservable = function (key, observable, groupKey, ttl, delayType, metaKey) {
        var _this = this;
        if (ttl === void 0) { ttl = this.ttl; }
        if (delayType === void 0) { delayType = 'expired'; }
        if (!this.cacheEnabled)
            return observable;
        var observableSubject = new Subject();
        observable = observable.pipe(share());
        var subscribeOrigin = function () {
            observable.subscribe(function (res) {
                _this.saveItem(key, res, groupKey, ttl);
                observableSubject.next(res);
                observableSubject.complete();
            }, function (err) {
                observableSubject.error(err);
            }, function () {
                observableSubject.complete();
            });
        };
        this.getItem(key)
            .then(function (data) {
            if (metaKey) {
                data[metaKey] = data[metaKey] || {};
                data[metaKey].fromCache = true;
            }
            observableSubject.next(data);
            if (delayType === 'all') {
                subscribeOrigin();
            }
            else {
                observableSubject.complete();
            }
        })
            .catch(function (e) {
            _this.getRawItem(key)
                .then(function (res) {
                var result = CacheService_1.decodeRawData(res);
                if (metaKey) {
                    result[metaKey] = result[metaKey] || {};
                    result[metaKey].fromCache = true;
                }
                observableSubject.next(result);
                subscribeOrigin();
            })
                .catch(function () { return subscribeOrigin(); });
        });
        return observableSubject.asObservable();
    };
    /**
     * Perform complete cache clear
     * @return {Promise<any>}
     */
    CacheService.prototype.clearAll = function () {
        if (!this.cacheEnabled) {
            throw new Error(MESSAGES[2]);
        }
        return this.resetDatabase();
    };
    /**
     * @description Remove all expired items from cache
     * @param {boolean} ignoreOnlineStatus -
     * @return {Promise<any>} - query promise
     */
    CacheService.prototype.clearExpired = function (ignoreOnlineStatus) {
        if (ignoreOnlineStatus === void 0) { ignoreOnlineStatus = false; }
        return __awaiter(this, void 0, void 0, function () {
            var items, datetime;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.cacheEnabled) {
                            throw new Error(MESSAGES[2]);
                        }
                        if (!this.isOnline() && !ignoreOnlineStatus) {
                            throw new Error(MESSAGES[4]);
                        }
                        return [4 /*yield*/, this._storage.all()];
                    case 1:
                        items = _a.sent();
                        datetime = new Date().getTime();
                        return [2 /*return*/, Promise.all(items
                                .filter(function (item) { return item.expires < datetime; })
                                .map(function (item) { return _this.removeItem(item.key); }))];
                }
            });
        });
    };
    /**
     * @description Remove all item with specified group
     * @param {string} groupKey - group key
     * @return {Promise<any>} - query promise
     */
    CacheService.prototype.clearGroup = function (groupKey) {
        return __awaiter(this, void 0, void 0, function () {
            var items;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.cacheEnabled) {
                            throw new Error(MESSAGES[2]);
                        }
                        return [4 /*yield*/, this._storage.all()];
                    case 1:
                        items = _a.sent();
                        return [2 /*return*/, Promise.all(items
                                .filter(function (item) { return item.groupKey === groupKey; })
                                .map(function (item) { return _this.removeItem(item.key); }))];
                }
            });
        });
    };
    var CacheService_1;
    CacheService = CacheService_1 = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [CacheStorageService])
    ], CacheService);
    return CacheService;
}());
export { CacheService };
export { ɵ0 };
//# sourceMappingURL=cache.service.js.map