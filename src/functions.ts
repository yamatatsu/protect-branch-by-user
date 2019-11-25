type Context = {
  payload: { pull_request?: { number: number } };
  repo: { owner: string; repo: string };
};
type Review = { state: string; user: { login: string } };
type Response<T> = { data: T };

export const getPullNumber = (context: Context) => {
  const { pull_request } = context.payload;
  if (!pull_request) return;
  return pull_request.number;
};

export const hasUserApproved = (userId: string, reviews: Review[]) =>
  reviews
    .filter(review => review.state === "APPROVED")
    .some(review => review.user.login === userId);

export async function main(
  userId: string | undefined,
  token: string | undefined,
  context: Context,
  getReviews: (
    token: string,
    owner: string,
    repo: string,
    pullNumber: number,
  ) => Promise<Response<Review[]>>,
) {
  console.info("context context context context");
  console.error(JSON.stringify(context, null, 2));
  if (!userId) throw new Error("'userId' is required.");
  const { owner, repo } = context.repo;
  const pullNumber = getPullNumber(context);

  if (!token) throw new Error("no GITHUB_TOKEN is found!");
  if (!pullNumber)
    throw new Error("You can use this action on only pull_request.");

  const result = await getReviews(token, owner, repo, pullNumber);

  const approved = hasUserApproved(userId, result.data);

  if (!approved) throw new Error("Owner has not approved yet.");
}
