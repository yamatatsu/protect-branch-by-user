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
exports.getPullNumber = (context) => {
    const { pull_request } = context.payload;
    if (!pull_request)
        return;
    return pull_request.number;
};
exports.hasUserApproved = (userId, reviews) => reviews
    .filter(review => review.state === "APPROVED")
    .some(review => review.user.login === userId);
function main(userId, token, context, getReviews) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!userId)
            throw new Error("'userId' is required.");
        const { owner, repo } = context.repo;
        const pullNumber = exports.getPullNumber(context);
        if (!token)
            throw new Error("no GITHUB_TOKEN is found!");
        if (!pullNumber)
            throw new Error("You can use this action on only pull_request.");
        const result = yield getReviews(token, owner, repo, pullNumber);
        const approved = exports.hasUserApproved(userId, result.data);
        if (!approved)
            throw new Error("Owner has not approved yet.");
    });
}
exports.main = main;
