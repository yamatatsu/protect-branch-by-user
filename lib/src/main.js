"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const github_1 = require("@actions/github");
const functions_1 = require("./functions");
const userId = core.getInput("userId");
const token = process.env.GITHUB_TOKEN;
const getReviews = (token, owner, repo, pullNumber) => new github_1.GitHub(token).pulls.listReviews({
    owner,
    repo,
    pull_number: pullNumber,
});
functions_1.main(userId, token, github_1.context, getReviews)
    .then(() => {
    core.setOutput("time", new Date().toTimeString());
})
    .catch(err => {
    core.setFailed(err.message);
});
