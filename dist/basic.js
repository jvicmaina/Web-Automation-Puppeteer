"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var puppeteer_1 = __importDefault(require("puppeteer"));
function launchBrowser() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, puppeteer_1.default.launch({ headless: 'new' })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function navigateToPage(browser, url) {
    return __awaiter(this, void 0, void 0, function () {
        var page;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, browser.newPage()];
                case 1:
                    page = _a.sent();
                    return [4 /*yield*/, page.setViewport({ width: 1600, height: 1000, isMobile: false, isLandscape: true, hasTouch: false, deviceScaleFactor: 1 })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, page.setGeolocation({ latitude: 49.5, longitude: 100.0 })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, page.goto(url, { timeout: 120000 })];
                case 4:
                    _a.sent();
                    return [2 /*return*/, page];
            }
        });
    });
}
function extractKenyanNewsData(page) {
    return __awaiter(this, void 0, void 0, function () {
        var newsData, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, page.waitForSelector('.news-article-list')];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, page.evaluate(function () {
                            var articles = document.querySelectorAll('.news-article-list');
                            var data = [];
                            articles.forEach(function (article) {
                                var titleElement = article.querySelector('.news-title a');
                                var authorElement = article.querySelector('.news-author');
                                var dateElement = article.querySelector('.datetime');
                                var teaserElement = article.querySelector('.news-teaser');
                                var imageElement = article.querySelector('.field--name-field-media-image img');
                                if (titleElement && authorElement && dateElement && imageElement && teaserElement) {
                                    var title = titleElement.innerText.trim();
                                    var author = authorElement.innerText.trim();
                                    var date = dateElement.innerText.trim();
                                    var teaser = teaserElement.innerText.trim();
                                    var imageUrl = imageElement.src;
                                    data.push({ title: title, author: author, date: date, imageUrl: imageUrl, teaser: teaser });
                                }
                            });
                            return data;
                        })];
                case 2:
                    newsData = _a.sent();
                    return [2 /*return*/, newsData];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error extracting Kenyan news data:', error_1);
                    throw error_1;
                case 4: return [2 /*return*/];
            }
        });
    });
}
function extractCitizenNewsData(page) {
    return __awaiter(this, void 0, void 0, function () {
        var title, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, page.waitForSelector('.topstory-excerpt')];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, page.evaluate(function () {
                            var titleElement = document.querySelector('.topstory-excerpt');
                            return titleElement ? titleElement.innerText.trim() : null;
                        })];
                case 2:
                    title = _a.sent();
                    return [2 /*return*/, title ? [{ title: title }] : []];
                case 3:
                    error_2 = _a.sent();
                    console.error('Error extracting Citizen news data:', error_2);
                    throw error_2;
                case 4: return [2 /*return*/];
            }
        });
    });
}
function closeBrowser(browser) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, browser.close()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var browser, kenyanPage, kenyanNewsData, citizenPage, citizenNewsData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, launchBrowser()];
            case 1:
                browser = _a.sent();
                return [4 /*yield*/, navigateToPage(browser, 'https://kenyans.co.ke/')];
            case 2:
                kenyanPage = _a.sent();
                return [4 /*yield*/, extractKenyanNewsData(kenyanPage)];
            case 3:
                kenyanNewsData = _a.sent();
                console.log('Kenyans.co.ke News Data:', kenyanNewsData);
                return [4 /*yield*/, navigateToPage(browser, 'https://citizen.digital/')];
            case 4:
                citizenPage = _a.sent();
                return [4 /*yield*/, extractCitizenNewsData(citizenPage)];
            case 5:
                citizenNewsData = _a.sent();
                console.log('Citizen Digital News Data:', citizenNewsData);
                return [4 /*yield*/, closeBrowser(browser)];
            case 6:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })();
