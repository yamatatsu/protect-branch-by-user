import * as core from "@actions/core";
import { context, GitHub } from "@actions/github";
import { main } from "./functions";

const userId = core.getInput("userId");
const token = process.env.GITHUB_TOKEN;

const getReviews = (
  token: string,
  owner: string,
  repo: string,
  pullNumber: number,
) =>
  new GitHub(token).pulls.listReviews({
    owner,
    repo,
    pull_number: pullNumber,
  });

main(userId, token, context, getReviews)
  .then(() => {
    core.setOutput("time", new Date().toTimeString());
  })
  .catch(err => {
    core.setFailed(err.message);
  });
