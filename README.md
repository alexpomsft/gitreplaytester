This is a script to replay a CHANGELOG.json file and simulate the git status afterwards.

- Replace the sample beachball CHANGELOG.json file in the data directory with a big one.
- Run `npx ts-node ./playChangeLog.ts`

You may modify the `cwd` variable to produce output in a different directory. Note that the script does clean the target directory when ran. You may also consider modifying the for loop at the bottom to produce less commits.

## Data

This data is taken from a changelog which has over 3500 entries.

 ile size is from `ls -hs`. Directory size is taken from `du -hs`.

| commit count | CHANGELOG.json | Repo Folder | git gc --aggressive |
|---|---|---|---|
| 50 | 400K | 2.2M | 616K |
| 500 | 680K | 30M | 1.3M |
| 3505 | 2.2M | 356M | 5.7M |
