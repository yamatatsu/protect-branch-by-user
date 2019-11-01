# Protect Branch by User

This is Github Action that is passed if specific user has approved.
[CODEOWNERS files](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/about-code-owners) cannot protect each branch by specific user. (see [this conversation](https://github.community/t5/How-to-use-Git-and-GitHub/CODEOWNER-Required-Reviews/td-p/1128).)

## Inputs

### `userId`

**Required** Github userId for that the user has already approved.

## Outputs

nothing

## Example usage

```yaml
uses: actions/protect-branch-by-user@1.0.1
with:
  userId: yamatatsu
env:
  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```
