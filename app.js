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
Object.defineProperty(exports, "__esModule", { value: true });
// import fs module
var promises_1 = require("fs/promises");
var fs_1 = require("fs");
// Directory Path
var DIRECTORY_PATH = "./payload";
// import path module
var path = require("path");
function logger(message, type, optionMessage) {
    switch (type) {
        case "start":
            console.log("\uD83D\uDCE2 START : [".concat(message.toUpperCase(), "]"));
            console.log("\u3161\u3161\u3161\u3161\u3161\u3161\u3161\u3161\u3161\u3161\u3161\u3161\u3161\u3161\u3161\u3161\u3161\u3161\u3161\u3161\u3161\u3161\u3161");
            break;
        case "end":
            console.log("\u3161\u3161\u3161\u3161\u3161\u3161\u3161\u3161\u3161\u3161\u3161\u3161\u3161\u3161\u3161\u3161\u3161\u3161\u3161\u3161\u3161\u3161\u3161");
            console.log("\uD83D\uDCE2 END : [".concat(message.toUpperCase(), "]").concat(optionMessage ? " | ".concat(optionMessage) : ""));
            break;
        case "success":
            console.log("\u2705 Success [".concat(message.toUpperCase(), "]").concat(optionMessage ? " | ".concat(optionMessage) : ""));
            break;
        case "info":
            console.log("\u2611\uFE0F  INFO : [".concat(message.toUpperCase(), "]"));
            break;
        case "error":
            console.log("[\u26A0\uFE0F  ERROR : ".concat(message.toUpperCase(), "]"));
            break;
    }
}
function readFileAndSaveData() {
    return __awaiter(this, void 0, void 0, function () {
        var objReturn, files, _i, files_1, file, filePath, data, err_1, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    objReturn = {};
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 9, , 10]);
                    return [4 /*yield*/, (0, promises_1.readdir)(DIRECTORY_PATH)];
                case 2:
                    files = _a.sent();
                    files = files.filter(function (file) {
                        return file.split(".")[1] === "json" &&
                            file !== "tsconfig.json" &&
                            file !== "package.json";
                    });
                    _i = 0, files_1 = files;
                    _a.label = 3;
                case 3:
                    if (!(_i < files_1.length)) return [3 /*break*/, 8];
                    file = files_1[_i];
                    filePath = path.join(DIRECTORY_PATH, file);
                    _a.label = 4;
                case 4:
                    _a.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, (0, promises_1.readFile)(filePath, "utf8")];
                case 5:
                    data = _a.sent();
                    objReturn[file.split(".")[0]] = JSON.parse(data);
                    return [3 /*break*/, 7];
                case 6:
                    err_1 = _a.sent();
                    console.error("Error reading file ".concat(file, ":"), err_1);
                    return [2 /*return*/, {}];
                case 7:
                    _i++;
                    return [3 /*break*/, 3];
                case 8:
                    logger("file reading", "success");
                    return [2 /*return*/, objReturn];
                case 9:
                    err_2 = _a.sent();
                    console.error("Error reading directory:", err_2);
                    return [2 /*return*/, {}];
                case 10: return [2 /*return*/];
            }
        });
    });
}
function makePayloadStructure(objParam) {
    var declaration = "export const "; // 변수 선언부
    var fileKey = Object.keys(objParam);
    var sReturn = "";
    fileKey.forEach(function (key) {
        sReturn += "".concat(declaration).concat(key, " = ").concat(JSON.stringify(objParam[key]), ";");
    });
    logger("make structure", "success");
    return sReturn;
}
function writePayloadTs(fileData) {
    return __awaiter(this, void 0, void 0, function () {
        var filePath, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    filePath = path.join(DIRECTORY_PATH, "payload.ts");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, promises_1.writeFile)(filePath, fileData, "utf8")];
                case 2:
                    _a.sent();
                    logger("created", "success", "[\uD83D\uDCC1 : ".concat(filePath, "]"));
                    return [2 /*return*/, true];
                case 3:
                    err_3 = _a.sent();
                    logger("writing file", "error");
                    return [2 /*return*/, false];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function fileExistCheck() {
    if ((0, fs_1.existsSync)("".concat(DIRECTORY_PATH, "/payload.ts"))) {
        logger("File Exists", "info");
        (0, fs_1.unlink)("".concat(DIRECTORY_PATH, "/payload.ts"), function (err) {
            if (err) {
                throw err;
            }
        });
        logger("Delete an existing file", "success");
    }
}
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var readFileData, newFileData, success;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                logger("make file", "start");
                return [4 /*yield*/, readFileAndSaveData()];
            case 1:
                readFileData = _a.sent();
                newFileData = makePayloadStructure(readFileData);
                fileExistCheck();
                return [4 /*yield*/, writePayloadTs(newFileData)];
            case 2:
                success = _a.sent();
                if (success) {
                    logger("make file", "end");
                }
                else {
                    logger("make file", "error");
                }
                return [2 /*return*/];
        }
    });
}); })();
