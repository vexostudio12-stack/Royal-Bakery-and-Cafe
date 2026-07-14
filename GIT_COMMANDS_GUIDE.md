# Advanced Git Commands - Complete Guide

## 🎯 Overview

This guide covers professional-level Git commands used in production environments, including best practices for the Royal Bakery & Cafe website project.

---

## 1. Git Stash - Save Work Without Committing

### What is Git Stash?

`git stash` temporarily saves uncommitted changes without creating a commit. Perfect for switching branches without committing incomplete work.

### Basic Usage

```bash
# Stash current changes
git stash

# Stash with a descriptive message
git stash save "WIP: premium animations for loading screen"

# Stash including untracked files
git stash -u

# Stash including ignored files
git stash -a
```

### List Stashed Changes

```bash
# List all stashes
git stash list

# Show specific stash
git stash show stash@{0}

# Show stash with diff
git stash show -p stash@{0}
```

### Apply Stashed Changes

```bash
# Apply latest stash (keeps the stash)
git stash apply

# Apply specific stash
git stash apply stash@{2}

# Apply and remove stash (pop)
git stash pop

# Apply stash to new branch
git stash branch new-branch-name
```

### Delete Stashes

```bash
# Delete specific stash
git stash drop stash@{0}

# Delete all stashes
git stash clear
```

### Real-World Example

```bash
# Scenario: Working on loading animation, urgent hotfix needed
git stash save "WIP: cinematic cake rotation animation"

# Switch to hotfix branch
git checkout -b hotfix/critical-bug

# Fix the bug and commit
git commit -m "Fix: critical performance issue"
git push origin hotfix/critical-bug

# Return to feature branch
git checkout feature/loading-animation

# Apply saved work
git stash pop
```

---

## 2. Git Cherry-Pick - Apply Specific Commits

### What is Git Cherry-Pick?

`git cherry-pick` applies specific commits from one branch to another. Useful for copying individual fixes or features without merging entire branches.

### Basic Usage

```bash
# Cherry-pick a single commit
git cherry-pick abc1234

# Cherry-pick multiple commits
git cherry-pick abc1234 def5678 ghi9012

# Cherry-pick a range of commits
git cherry-pick abc1234^..ghi9012
```

### Cherry-Pick Options

```bash
# Cherry-pick without committing (for review)
git cherry-pick --no-commit abc1234

# Abort cherry-pick if conflict
git cherry-pick --abort

# Continue after resolving conflicts
git cherry-pick --continue

# Edit commit message during cherry-pick
git cherry-pick -e abc1234
```

### Real-World Example

```bash
# Scenario: Critical SEO optimization commit from develop branch
# needed urgently in production branch

# Check commit hash
git log develop --oneline | head -10

# Cherry-pick the commit
git checkout production
git cherry-pick 3a7f9e2

# If conflicts occur
git status
# (resolve conflicts)
git add .
git cherry-pick --continue

# Verify and push
git log --oneline -5
git push origin production
```

### Example Workflow

```bash
# Find commits with specific changes
git log --grep="animation" --oneline

# Cherry-pick multiple animation fixes
git cherry-pick 1a2b3c4 5d6e7f8 9g0h1i2

# Verify cherry-picked commits
git log --oneline -5

# Push changes
git push origin current-branch
```

---

## 3. Git Revert - Undo Changes Safely

### What is Git Revert?

`git revert` creates a NEW commit that undoes changes from a previous commit. Unlike reset, it preserves history and is safe for shared branches.

### Basic Usage

```bash
# Revert a commit
git revert abc1234

# Revert without opening editor
git revert --no-edit abc1234

# Revert multiple commits
git revert -n abc1234
git revert -n def5678
git commit -m "Revert multiple changes"

# Revert a merge commit (specify parent)
git revert -m 1 abc1234
```

### Revert Options

```bash
# Revert and immediately create new commit
git revert abc1234

# Stage revert without committing (for review)
git revert --no-commit abc1234

# Abort revert
git revert --abort

# Continue revert after conflicts
git revert --continue
```

### Real-World Example

```bash
# Scenario: Accidentally deployed broken CSS that crashes website

# Check recent commits
git log --oneline -10

# Revert the problematic commit
git revert abc1234

# This creates a new commit with message:
# "Revert 'Fix: update hero section styling'"

# Push to fix production
git push origin main

# Better alternative: revert and fix properly
git revert --no-edit abc1234
git commit --amend -m "Revert broken CSS and add tests"
```

### Comparing Revert vs Reset

```bash
# ❌ DON'T use reset on shared branches
git reset --hard abc1234  # Dangerous! Rewrites history

# ✅ DO use revert on shared branches
git revert abc1234  # Safe! Creates new commit
```

---

## 4. Git Reset - Move Commits (Use Carefully!)

### What is Git Reset?

`git reset` moves the HEAD pointer and can unstage changes or remove commits. Three modes: soft, mixed, hard.

### Reset Modes

```bash
# Soft reset: Moves HEAD, keeps changes staged
git reset --soft abc1234

# Mixed reset (default): Moves HEAD, keeps changes unstaged
git reset --mixed abc1234
git reset abc1234  # Same as --mixed

# Hard reset: Moves HEAD, DISCARDS all changes (DANGEROUS!)
git reset --hard abc1234
```

### Common Use Cases

```bash
# Undo last commit, keep changes staged
git reset --soft HEAD~1

# Undo last commit, keep changes unstaged
git reset --mixed HEAD~1
git reset HEAD~1

# Undo last 3 commits
git reset --soft HEAD~3

# Completely discard last commit (DESTRUCTIVE!)
git reset --hard HEAD~1

# Discard all commits not pushed
git reset --hard origin/main
```

### Real-World Example

```bash
# Scenario: Made 3 commits but want to reorganize them

# Current state:
# abc1234 Fix: button styling
# def5678 Add: new animation function
# ghi9012 Update: product cards

# Undo last 3 commits, keep changes
git reset --soft HEAD~3

# Now all changes are staged, reorganize:
git reset HEAD~1  # Unstage the last batch
git commit -m "Fix: comprehensive UI updates"

# Re-stage and commit animations separately
git add src/animations/
git commit -m "Add: cinematic loading animations"
```

### Recovering from Accidental Reset

```bash
# View all references (includes resets)
git reflog

# Find the lost commit
git reflog | grep "abc1234"

# Restore it
git reset --hard abc1234
```

---

## 5. Advanced Workflows

### Workflow 1: Feature Branch with Stash

```bash
# Start feature work
git checkout -b feature/new-hero-section

# Work on feature
echo "New hero code" > src/components/HeroSection.tsx
git add .
git commit -m "WIP: initial hero section"

# Emergency fix needed
git stash

# Fix bug
git checkout main
git checkout -b fix/urgent-bug
# (make fixes)
git commit -m "Fix: urgent bug"
git push origin fix/urgent-bug

# Return to feature
git checkout feature/new-hero-section
git stash pop

# Continue development
git add .
git commit -m "Complete: hero section with animations"
```

### Workflow 2: Cherry-Pick for Hotfixes

```bash
# Production emergency
git checkout main

# Latest production commits
git log --oneline -5

# Urgent fix on develop
git checkout develop
git log --oneline -5

# Find and cherry-pick fix
git checkout main
git cherry-pick abc1234  # The urgent fix

# Test and deploy
npm run build
git push origin main

# Keep develop in sync
git checkout develop
git cherry-pick main
```

### Workflow 3: Clean Revert of Bad Deployment

```bash
# Bad commit was deployed
git log --oneline -10

# Check what broke
git show abc1234 --stat

# Revert the entire change
git revert abc1234

# Push the fix
git push origin main

# Notify team
# "Reverted abc1234 - investigating root cause"

# Later: fix properly and cherry-pick
git checkout -b fix/proper-solution
# (make proper fix)
git commit -m "Fix: comprehensive solution to abc1234"
git push origin fix/proper-solution

# Create PR and merge
```

### Workflow 4: Interactive Rebase (Advanced)

```bash
# Combine last 3 commits
git rebase -i HEAD~3

# In editor, change pick to squash for commits to combine:
# pick abc1234 First commit
# squash def5678 Fix: typo
# squash ghi9012 Update: docs

# Save and edit final commit message
# Result: Single clean commit

# Force push only if on personal branch
git push -f origin feature/branch
```

---

## 6. Best Practices

### ✅ DO

```bash
# Use descriptive stash messages
git stash save "WIP: premium animations for Royal Bakery loading screen"

# Cherry-pick only tested commits
git cherry-pick abc1234  # Only after verification

# Revert on shared branches (main, production)
git revert abc1234  # Safe choice for team branches

# Create detailed commit messages
git commit -m "Add: cinematic cake rotation animation

- Implement 3D cake model with Three.js
- Add cream particle effects
- Optimize performance for mobile devices"
```

### ❌ DON'T

```bash
# Don't use hard reset on shared branches
git reset --hard origin/main  # DANGEROUS ON SHARED BRANCH

# Don't stash and forget
git stash  # Remember to git stash pop later!

# Don't cherry-pick large features
git cherry-pick abc1234def5678ghi9012  # Too many commits

# Don't revert without testing
git revert abc1234  # Test locally first
```

---

## 7. Useful Aliases

```bash
# Add to .gitconfig or .zshrc/.bashrc

alias gs='git status'
alias gl='git log --oneline -10'
alias ga='git add .'
alias gc='git commit -m'
alias gp='git push origin'
alias gst='git stash'
alias gcp='git cherry-pick'
alias grv='git revert'
alias grst='git reset'
alias gpl='git pull origin'

# Complex aliases
alias glog='git log --graph --oneline --all'
alias gdiff='git diff --stat'
alias gundo='git reset --soft HEAD~1'
```

---

## 8. Troubleshooting

### Stuck Cherry-Pick

```bash
# Cherry-pick failed with conflicts
git status  # Check conflicts

# Resolve conflicts in editor
nano src/file.tsx

# Mark as resolved
git add src/file.tsx

# Continue
git cherry-pick --continue

# Or abort
git cherry-pick --abort
```

### Lost Commits After Reset

```bash
# Find lost commits
git reflog | head -20

# Restore to specific point
git reset --hard abc1234
```

### Accidental Revert

```bash
# Revert the revert
git revert HEAD

# Or use reflog
git reflog
git reset --hard abc1234  # Go back before the revert
```

---

## Resources

- [Official Git Documentation](https://git-scm.com/docs)
- [Git Best Practices](https://git-scm.com/book)
- [Interactive Git Learning](https://learngitbranching.js.org/)

---

**For the Royal Bakery & Cafe Project:**
Use these commands for clean, professional version control of your premium website.