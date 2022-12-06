import * as fs from "fs";
import { execa } from "execa";

interface ChangeLog {
  name: string;
  entries: any[];
}

var cwd = "../commitTestFull";

async function git(args: string[]): Promise<string> {
  const { stdout } = await execa("git", args, { cwd });
  return stdout;
}

async function cleanup(): Promise<void> {
  await execa("rm", ["-rf", cwd]);
}

async function setupGit(): Promise<void> {
  await execa("mkdir", [cwd]);
  await git(["init"]);
  fs.writeFileSync(
    cwd + "/CHANGELOG.json",
    JSON.stringify({
      name: "@1js/search-page-core",
      entries: [],
    })
  );

  await git(["add", "CHANGELOG.json"]);
  await git(["commit", "-m", "Initial commit"]);
}

async function addEntry(entry: any): Promise<void> {
    const parsed: ChangeLog = JSON.parse(
        fs.readFileSync(cwd + "/CHANGELOG.json", "utf8")
      );
    
      parsed.entries.push(entry);
      fs.writeFileSync(cwd + "/CHANGELOG.json", JSON.stringify(parsed));
    await git(["add", "CHANGELOG.json"]);
    await git(["commit", "-m", "Add entry"]);
}

async function main(): Promise<void> {
  await cleanup();
  await setupGit();

  const parsed: ChangeLog = JSON.parse(
    fs.readFileSync("./data/CHANGELOG.json", "utf8")
  );

  for (var i = 0; i < parsed.entries.length; i++) {
    await addEntry(parsed.entries[i]);
    console.log("Added entry " + i);
  }
}

main();
