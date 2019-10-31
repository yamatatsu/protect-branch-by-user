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
Object.defineProperty(exports, "__esModule", { value: true });
const functions_1 = require("../src/functions");
const contextBase = {
    payload: {},
    repo: { owner: "", repo: "" },
};
test("getPullNumber", () => __awaiter(void 0, void 0, void 0, function* () {
    const context = Object.assign({}, contextBase);
    expect(functions_1.getPullNumber(context)).toBe(undefined);
}));
test("getPullNumber", () => __awaiter(void 0, void 0, void 0, function* () {
    const context = Object.assign(Object.assign({}, contextBase), { payload: { pull_request: { number: 1 } } });
    expect(functions_1.getPullNumber(context)).toBe(1);
}));
test("hasUserApproved", () => __awaiter(void 0, void 0, void 0, function* () {
    const userId = "test_userId";
    const reviews = [];
    expect(functions_1.hasUserApproved(userId, reviews)).toBe(false);
}));
test("hasUserApproved", () => __awaiter(void 0, void 0, void 0, function* () {
    const userId = "test_userId";
    const reviews = [{ state: "APPROVED", user: { login: "dummy" } }];
    expect(functions_1.hasUserApproved(userId, reviews)).toBe(false);
}));
test("hasUserApproved", () => __awaiter(void 0, void 0, void 0, function* () {
    const userId = "test_userId";
    const reviews = [{ state: "NOT_APPROVED", user: { login: "test_userId" } }];
    expect(functions_1.hasUserApproved(userId, reviews)).toBe(false);
}));
test("hasUserApproved", () => __awaiter(void 0, void 0, void 0, function* () {
    const userId = "test_userId";
    const reviews = [
        { state: "NOT_APPROVED", user: { login: "dummy" } },
        { state: "APPROVED", user: { login: "test_userId" } },
    ];
    expect(functions_1.hasUserApproved(userId, reviews)).toBe(true);
}));
test("main", () => __awaiter(void 0, void 0, void 0, function* () {
    const userId = undefined;
    const token = undefined;
    const context = Object.assign({}, contextBase);
    const getReviews = () => Promise.reject(new Error("Foo"));
    yield expect(functions_1.main(userId, token, context, getReviews)).rejects.toThrowError("'userId' is required.");
}));
test("main", () => __awaiter(void 0, void 0, void 0, function* () {
    const userId = "test_userId";
    const token = undefined;
    const context = Object.assign({}, contextBase);
    const getReviews = () => Promise.reject(new Error("Foo"));
    yield expect(functions_1.main(userId, token, context, getReviews)).rejects.toThrowError("no GITHUB_TOKEN is found!");
}));
test("main", () => __awaiter(void 0, void 0, void 0, function* () {
    const userId = "test_userId";
    const token = "test_token";
    const context = Object.assign({}, contextBase);
    const getReviews = () => Promise.reject(new Error("Foo"));
    yield expect(functions_1.main(userId, token, context, getReviews)).rejects.toThrowError("You can use this action on only pull_request.");
}));
test("main", () => __awaiter(void 0, void 0, void 0, function* () {
    const userId = "test_userId";
    const token = "test_token";
    const context = Object.assign(Object.assign({}, contextBase), { payload: { pull_request: { number: 1 } } });
    const getReviews = () => Promise.reject(new Error("Foo"));
    yield expect(functions_1.main(userId, token, context, getReviews)).rejects.toThrowError("Foo");
}));
test("main", () => __awaiter(void 0, void 0, void 0, function* () {
    const userId = "test_userId";
    const token = "test_token";
    const context = Object.assign(Object.assign({}, contextBase), { payload: { pull_request: { number: 1 } } });
    const getReviews = () => Promise.resolve({ data: [] });
    yield expect(functions_1.main(userId, token, context, getReviews)).rejects.toThrowError("Owner has not approved yet.");
}));
test("main", () => __awaiter(void 0, void 0, void 0, function* () {
    const userId = "test_userId";
    const token = "test_token";
    const context = Object.assign(Object.assign({}, contextBase), { payload: { pull_request: { number: 1 } } });
    const getReviews = () => Promise.resolve({
        data: [{ state: "APPROVED", user: { login: "test_userId" } }],
    });
    yield expect(functions_1.main(userId, token, context, getReviews)).resolves.toBe(undefined);
}));
