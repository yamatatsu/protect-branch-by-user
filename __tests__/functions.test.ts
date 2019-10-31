import { getPullNumber, hasUserApproved, main } from "../src/functions";

const contextBase = {
  payload: {},
  repo: { owner: "", repo: "" },
};

test("getPullNumber", async () => {
  const context = { ...contextBase };
  expect(getPullNumber(context)).toBe(undefined);
});

test("getPullNumber", async () => {
  const context = { ...contextBase, payload: { pull_request: { number: 1 } } };
  expect(getPullNumber(context)).toBe(1);
});

test("hasUserApproved", async () => {
  const userId = "test_userId";
  const reviews = [];
  expect(hasUserApproved(userId, reviews)).toBe(false);
});

test("hasUserApproved", async () => {
  const userId = "test_userId";
  const reviews = [{ state: "APPROVED", user: { login: "dummy" } }];
  expect(hasUserApproved(userId, reviews)).toBe(false);
});

test("hasUserApproved", async () => {
  const userId = "test_userId";
  const reviews = [{ state: "NOT_APPROVED", user: { login: "test_userId" } }];
  expect(hasUserApproved(userId, reviews)).toBe(false);
});

test("hasUserApproved", async () => {
  const userId = "test_userId";
  const reviews = [
    { state: "NOT_APPROVED", user: { login: "dummy" } },
    { state: "APPROVED", user: { login: "test_userId" } },
  ];
  expect(hasUserApproved(userId, reviews)).toBe(true);
});

test("main", async () => {
  const userId: undefined = undefined;
  const token: undefined = undefined;
  const context = { ...contextBase };
  const getReviews = () => Promise.reject(new Error("Foo"));
  await expect(main(userId, token, context, getReviews)).rejects.toThrowError(
    "'userId' is required.",
  );
});

test("main", async () => {
  const userId = "test_userId";
  const token: undefined = undefined;
  const context = { ...contextBase };
  const getReviews = () => Promise.reject(new Error("Foo"));
  await expect(main(userId, token, context, getReviews)).rejects.toThrowError(
    "no GITHUB_TOKEN is found!",
  );
});

test("main", async () => {
  const userId = "test_userId";
  const token = "test_token";
  const context = { ...contextBase };
  const getReviews = () => Promise.reject(new Error("Foo"));
  await expect(main(userId, token, context, getReviews)).rejects.toThrowError(
    "You can use this action on only pull_request.",
  );
});

test("main", async () => {
  const userId = "test_userId";
  const token = "test_token";
  const context = { ...contextBase, payload: { pull_request: { number: 1 } } };
  const getReviews = () => Promise.reject(new Error("Foo"));
  await expect(main(userId, token, context, getReviews)).rejects.toThrowError(
    "Foo",
  );
});

test("main", async () => {
  const userId = "test_userId";
  const token = "test_token";
  const context = { ...contextBase, payload: { pull_request: { number: 1 } } };
  const getReviews = () => Promise.resolve({ data: [] });
  await expect(main(userId, token, context, getReviews)).rejects.toThrowError(
    "Owner has not approved yet.",
  );
});
test("main", async () => {
  const userId = "test_userId";
  const token = "test_token";
  const context = { ...contextBase, payload: { pull_request: { number: 1 } } };
  const getReviews = () =>
    Promise.resolve({
      data: [{ state: "APPROVED", user: { login: "test_userId" } }],
    });
  await expect(main(userId, token, context, getReviews)).resolves.toBe(
    undefined,
  );
});
