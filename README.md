# Learning Workspace

![Tests](https://github.com/YOUR_USERNAME/YOUR_REPO/workflows/QA%20Tests/badge.svg)

This repository is used for exploring Playwright end-to-end testing with SauceDemo and related features.

## Quick start

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the full test suite:
   ```bash
   npx playwright test
   ```
3. If you are adding or accepting visual changes, rerun with the update flag:
   ```bash
   npx playwright test --update-snapshots
   # or set PW_UPDATE_SNAPSHOTS=1 in the environment
   ```

## Visual testing

- Add visual assertions in a test using `expect(page).toHaveScreenshot('name.png')`.
- Baseline images are stored under `test-results/` when first run.
- Differences are highlighted in the HTML report (`npx playwright show-report`).
- Only failing snapshots are replaced when you explicitly run with the update flag.

## Agents (AI/Tooling)

This project uses GitHub Copilot and the Playwright test generators to accelerate development. The most common prompts and tasks are:

- **Generate a new test**: ask an AI agent such as `playwright-test-generator` to scaffold a spec from a human-readable test plan or step list.
- **Heal a flaky test**: use the `playwright-test-healer` agent when a test locator stops working.
- **Plan tests**: the `playwright-test-planner` agent can convert requirements into a structured test plan.

To invoke an agent, frame your request like:

> "Create a test that logs in with invalid credentials and verifies the error message."

and use the workspace "agents" commands in VS Code or through Copilot.

Agents are helpful for writing, fixing, and maintaining Playwright specs; they do not run tests themselves.

---

Feel free to expand this README with your own notes as you explore additional features.