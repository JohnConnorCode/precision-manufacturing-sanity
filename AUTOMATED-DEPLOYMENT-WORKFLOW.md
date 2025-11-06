# Automated Deployment Workflow

## Overview

This document describes the fully automated GitHub-to-Vercel deployment workflow that has been configured for this project.

---

## 🔐 Authentication Setup

### GitHub Personal Access Token
- **Token:** `ghp_****` (stored securely, never commit to repo)
- **Permissions:** `repo`, `workflow`
- **Purpose:** Allows Claude Code to create and merge PRs programmatically
- **How to get:** https://github.com/settings/tokens

### How It Works
1. Claude creates feature branches following naming convention: `claude/fix-*-011CUqzo2PefoQ1iUamrCZLc`
2. Claude uses GitHub API with token to create Pull Requests
3. Claude automatically merges PRs to `main` branch
4. Vercel detects commits to `main` and triggers production deployment
5. Claude monitors deployment status via GitHub API

---

## 🛡️ Pre-Push Protection

### Git Pre-Push Hook (`.git/hooks/pre-push`)

**Installed:** ✅ Yes
**Purpose:** Prevents bad deployments by testing locally before push

**What it does:**
1. Runs `npm run build` before every push
2. Checks for React rendering errors in build output
3. Blocks push if build fails or errors detected
4. Only allows push if all checks pass

**How to test manually:**
```bash
# This runs automatically on push, but you can test it:
.git/hooks/pre-push
```

**To temporarily bypass (NOT RECOMMENDED):**
```bash
git push --no-verify origin branch-name
```

---

## 📋 Deployment Checklist

### Before Every Deploy

1. ✅ Run local build: `npm run build`
2. ✅ Check for errors in build output
3. ✅ Test with real Sanity data (if .env.local configured)
4. ✅ Verify no React rendering errors
5. ✅ Push to feature branch (pre-push hook runs automatically)
6. ✅ Wait for preview deployment to succeed
7. ✅ Merge to main via automated PR

### After Deploy

1. ✅ Monitor deployment status (automated via GitHub API)
2. ✅ Verify production URL is live
3. ✅ Test key functionality on production

---

## 🤖 Automated Workflow Commands

Claude can now automatically:

### Create Feature Branch
```bash
git checkout -b claude/fix-description-011CUqzo2PefoQ1iUamrCZLc
# Make changes...
git add .
git commit -m "fix: description"
git push -u origin claude/fix-description-011CUqzo2PefoQ1iUamrCZLc
```

### Create and Merge PR
```bash
# Create PR
curl -X POST "https://api.github.com/repos/JohnConnorCode/precision-manufacturing-sanity/pulls" \
  -H "Authorization: token $GITHUB_TOKEN" \
  -d '{"title":"...","head":"claude/branch","base":"main","body":"..."}'

# Merge PR
curl -X PUT "https://api.github.com/repos/JohnConnorCode/precision-manufacturing-sanity/pulls/PR_NUMBER/merge" \
  -H "Authorization: token $GITHUB_TOKEN" \
  -d '{"merge_method":"merge"}'
```

### Monitor Deployment
```bash
# Check deployment status
curl -s "https://api.github.com/repos/JohnConnorCode/precision-manufacturing-sanity/commits/SHA/status" | jq -r '.statuses[] | select(.context == "Vercel")'
```

---

## 🚀 Recent Deployments (Session Summary)

### Commit: `1737565` (✅ SUCCESS - LIVE NOW)
**PRs Merged:**
- PR #1: Complete Sanity styling system (5 commits)
- PR #2: Remove Payload CMS config from vercel.json
- PR #3: Reorder Sanity schema exports
- PR #4: Fix badge object rendering

**Fixes Applied:**
1. ✅ Fixed undefined variable bug in homepage (7 sections)
2. ✅ Implemented Sanity styling system (colors, typography, themes)
3. ✅ Fixed Google Fonts build error (switched to system fonts)
4. ✅ Added error handling for Sanity queries
5. ✅ Fixed vercel.json (removed Payload CMS config)
6. ✅ Fixed Sanity schema loading order
7. ✅ Fixed badge object rendering in Hero component

**Build Status:** ✅ Passed
**Deployment:** ✅ Success
**Production:** ✅ Live

---

## 📊 Deployment Monitoring

### Check Current Status
```bash
# Latest deployment
curl -s "https://api.github.com/repos/JohnConnorCode/precision-manufacturing-sanity/deployments?per_page=1" | jq '.[0]'

# Deployment status for specific commit
curl -s "https://api.github.com/repos/JohnConnorCode/precision-manufacturing-sanity/commits/SHA/status" | jq '.state'
```

### Get Production URL
```bash
# Check Vercel deployment
curl -s "https://api.github.com/repos/JohnConnorCode/precision-manufacturing-sanity/commits/main/status" | jq -r '.statuses[] | select(.context == "Vercel") | .target_url'
```

---

## ⚠️ Important Notes

### Branch Naming Convention
- **MUST** start with `claude/`
- **MUST** end with session ID: `011CUqzo2PefoQ1iUamrCZLc`
- Example: `claude/fix-button-styles-011CUqzo2PefoQ1iUamrCZLc`
- Pushing to `main` directly is **BLOCKED** (403 error)

### Testing Strategy
1. **Local builds are FREE** - always test locally first
2. **Preview deployments** are for feature branches
3. **Production deployments** only on `main` branch merges
4. **Pre-push hook** prevents bad deploys automatically

### Token Security
- Token stored in conversation memory (ephemeral)
- Token expires: Check periodically and regenerate if needed
- Never commit token to repository
- Rotate token if compromised

---

## 🔧 Environment Variables

### Required for Local Testing
Create `.env.local`:
```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_READ_TOKEN=your-read-token
```

### Vercel Environment Variables
All Sanity credentials are configured in Vercel dashboard.
Claude cannot access Vercel API directly with current token.

---

## 📈 Deployment History

### Session: 2025-11-06
- **Total PRs:** 4
- **Total Commits:** 7
- **Failed Deployments:** 3 (before fixes)
- **Successful Deployments:** 1 (current)
- **Time to Fix:** ~2 hours
- **Issues Resolved:** Sanity integration, schema errors, badge rendering

### Lessons Learned
1. ✅ Always run local build before deploy
2. ✅ Sanity schema order matters (dependencies first)
3. ✅ Handle both string and object data from Sanity
4. ✅ Remove obsolete config (vercel.json Payload CMS)
5. ✅ Test with real data when possible

---

## 🎯 Next Steps

### To Maintain Automation
1. Keep GitHub token valid (regenerate if expired)
2. Monitor pre-push hook effectiveness
3. Update workflow documentation as needed
4. Consider adding more pre-push checks (linting, tests)

### Potential Improvements
1. Add TypeScript type checking to pre-push hook
2. Set up automated testing in CI/CD
3. Add commit message linting
4. Configure automatic dependency updates

---

## 🆘 Troubleshooting

### "Push failed with 403"
- Check branch name matches pattern: `claude/*-011CUqzo2PefoQ1iUamrCZLc`
- Cannot push directly to `main` - use PR workflow

### "Pre-push hook failing"
- Run `npm run build` manually to see errors
- Check build output: `tail -50 /tmp/build-output.txt`
- Fix errors before attempting push

### "Deployment failed on Vercel"
- Check GitHub commit status API for error details
- Review Vercel logs in dashboard
- Ensure all Sanity env vars are set in Vercel

### "GitHub token expired"
- Regenerate token at https://github.com/settings/tokens
- Update token in conversation
- Re-test with `curl -H "Authorization: token NEW_TOKEN" https://api.github.com/user`

---

## 📚 Resources

- **GitHub API Docs:** https://docs.github.com/en/rest
- **Vercel Deployment Docs:** https://vercel.com/docs/deployments
- **Git Hooks Guide:** https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks
- **Sanity Schema Docs:** https://www.sanity.io/docs/schema-types

---

**Last Updated:** 2025-11-06
**Status:** ✅ Fully Operational
**Current Deployment:** https://precision-manufacturing-sanity.vercel.app (commit: 1737565)
