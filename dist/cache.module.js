var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, InjectionToken } from '@angular/core';
import { CacheService } from './cache.service';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { CacheStorageService } from './cache-storage';
export var CONFIG = new InjectionToken('CONFIG');
var cacheConfigDefaults = {
    keyPrefix: ''
};
export function buildCacheService(storage, cacheConfig) {
    cacheConfig = Object.assign(cacheConfigDefaults, cacheConfig);
    return new CacheService(new CacheStorageService(storage, cacheConfig.keyPrefix));
}
var CacheModule = /** @class */ (function () {
    function CacheModule() {
    }
    CacheModule_1 = CacheModule;
    CacheModule.forRoot = function (cacheConfig) {
        return {
            ngModule: CacheModule_1,
            providers: [
                { provide: CONFIG, useValue: cacheConfig },
                {
                    provide: CacheService,
                    useFactory: buildCacheService,
                    deps: [Storage, CONFIG]
                }
            ]
        };
    };
    var CacheModule_1;
    CacheModule = CacheModule_1 = __decorate([
        NgModule({
            imports: [
                IonicStorageModule.forRoot({
                    name: '__ionicCache',
                    driverOrder: ['indexeddb', 'sqlite', 'websql']
                })
            ]
        })
    ], CacheModule);
    return CacheModule;
}());
export { CacheModule };
//# sourceMappingURL=cache.module.js.map