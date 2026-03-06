# Test Dashboard Setup Guide

This guide explains how to set up and use the QA Test Suite Dashboard that captures GitHub Actions pipeline runs and displays results organized by feature.

## Overview

The dashboard provides:
- **Real-time test status** with pass/fail/skipped counts
- **Feature-wise organization** (Auth, Products, Performance, Checkout, Login)
- **Test-level details** including duration and status
- **Success rate percentage** and total duration metrics
- **Automatic updates** via GitHub Actions

## Setup Instructions

### 1. Enable GitHub Pages

1. Go to your GitHub repository → **Settings** → **Pages**
2. Under "Source", select branch: `gh-pages`
3. Save and wait for the site to be deployed

Your dashboard will be available at: `https://<username>.github.io/<repo-name>/`

### 2. GitHub Actions Workflow

The workflow (`.github/workflows/ci.yml`) already configured:
- Runs Playwright tests on every push/PR
- Generates test report via `generate-test-report.js`
- Uploads test results as artifacts
- Deploys dashboard to GitHub Pages automatically

### 3. Local Testing

To test the dashboard locally:

```bash
# Generate sample test report
node scripts/generate-test-report.js

# Open the dashboard in your browser
open dashboard/index.html
```

Or use a local server:
```bash
npx http-server dashboard/
```

## File Structure

```
dashboard/
├── index.html              # Main dashboard (hosted on GitHub Pages)
├── test-results.json       # Generated test data (auto-created)

scripts/
├── generate-test-report.js # Script to parse Playwright results

.github/workflows/
├── ci.yml                  # GitHub Actions workflow
```

## How It Works

### 1. **Tests Run** (GitHub Actions)
   - Playwright tests execute
   - HTML report generated in `playwright-report/`

### 2. **Report Generation**
   - `generate-test-report.js` parses test results
   - Creates `dashboard/test-results.json` with:
     - Total stats (passed, failed, skipped)
     - Tests organized by feature
     - Duration for each test

### 3. **Dashboard Display**
   - `dashboard/index.html` loads `test-results.json`
   - Displays:
     - Summary cards at top
     - Feature cards with test lists
     - Individual test status/duration

### 4. **GitHub Pages Deploy**
   - Dashboard folder deployed to `gh-pages` branch
   - Accessible via GitHub Pages URL

## Feature Mapping

The dashboard automatically maps tests to features:

| Test Path | Feature |
|-----------|---------|
| `tests/auth/` | 🔐 Authentication |
| `tests/products/` | 📦 Products |
| `tests/performance/` | ⚡ Performance |
| `tests/checkout/` | 💳 Checkout |
| `tests/login/` | 🔑 Login |

To add more features, edit `dashboard/index.html` → `featureMapping` object:

```javascript
const featureMapping = {
    'myfeature': {
        name: '🎯 My Feature',
        icon: '🎯'
    }
};
```

## Customization

### Change Chart Colors
Edit the CSS in `dashboard/index.html`:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); /* Header background */
```

### Modify Test Status Display
Update status indicators in the `displayStats()` function:
```javascript
<div class="number passed">${data.passed}</div>
```

### Add Custom Metrics
Edit `scripts/generate-test-report.js` to include:
- Test categories
- Browser versions
- Screenshot comparisons
- Performance baselines

## Troubleshooting

### Dashboard Not Updating
1. Check GitHub Actions run completed successfully
2. Verify `generate-test-report.js` executed
3. Check the `gh-pages` branch was updated

### Missing Test Data
1. Run `node scripts/generate-test-report.js` locally
2. Check `playwright-report/` exists
3. Verify test results directory structure

### Can't Access GitHub Pages
1. Go to repo → Settings → Pages
2. Confirm source is set to `gh-pages` branch
3. Wait 1-2 minutes for deployment to complete

## Integration with CI/CD

To integrate with other tools:

### Slack Notifications
Add to workflow:
```yaml
- name: Notify Slack
  uses: slackapi/slack-github-action@v1
  with:
    webhook-url: ${{ secrets.SLACK_WEBHOOK }}
    payload: |
      {
        "text": "Test Dashboard: ${{ github.server_url }}/${{ github.repository }}/pages"
      }
```

### Email Reports
Generate and email the test report:
```yaml
- name: Send Email Report
  uses: dawidd6/action-send-mail@v3
  with:
    subject: "Test Report: ${{ job.status }}"
    body: "Dashboard: ${{ github.pages_url }}"
```

## Next Steps

1. **Push to main branch** to trigger the workflow
2. **Visit GitHub Pages URL** to see your dashboard
3. **Customize features** based on your test structure
4. **Integrate notifications** for team alerts
5. **Monitor test trends** over time

---

For questions or issues, check the [GitHub Actions documentation](https://docs.github.com/en/actions) or [Playwright reporting guide](https://playwright.dev/docs/test-reporters).
