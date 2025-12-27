# Git Workflow Guide for Team Collaboration

## Current Setup
You are now on a **feature branch** (`feature/your-name-dev`) which is separate from the `main` branch. This means your changes won't affect the main branch until you're ready to merge them.

## Daily Workflow

### 1. **Starting Your Work Day**
```bash
# Switch to your feature branch
git checkout feature/your-name-dev

# Pull latest changes from main branch
git checkout main
git pull origin main

# Switch back to your branch and merge main into it
git checkout feature/your-name-dev
git merge main
```

### 2. **Making Changes**
- Work on your feature branch
- Make commits regularly:
```bash
git add .
git commit -m "Description of your changes"
```

### 3. **Syncing with Teammate's Changes**

#### Option A: Pull teammate's changes from main (Recommended)
```bash
# Fetch latest changes from remote
git fetch origin

# Switch to main and update it
git checkout main
git pull origin main

# Switch back to your branch
git checkout feature/your-name-dev

# Merge main into your branch to get teammate's changes
git merge main
```

#### Option B: Pull teammate's feature branch directly
```bash
# Fetch all branches
git fetch origin

# Merge teammate's branch into yours
git merge origin/teammate-branch-name
```

### 4. **Pushing Your Changes**
```bash
# Push your branch to remote
git push origin feature/your-name-dev

# If it's the first time pushing this branch:
git push -u origin feature/your-name-dev
```

### 5. **Resolving Conflicts**
If you get conflicts when merging:
```bash
# Git will show you which files have conflicts
# Open those files and look for conflict markers:
# <<<<<<< HEAD
# Your changes
# =======
# Teammate's changes
# >>>>>>> branch-name

# Edit the file to resolve conflicts, then:
git add <resolved-file>
git commit -m "Resolved merge conflicts"
```

## Best Practices

### ✅ DO:
- **Commit frequently** - Small, logical commits are better
- **Pull before you push** - Always sync with main before pushing
- **Use descriptive commit messages** - "Fixed login bug" not "changes"
- **Keep your branch updated** - Merge main into your branch regularly
- **Test before merging** - Make sure your code works before merging to main

### ❌ DON'T:
- **Don't commit directly to main** - Always use your feature branch
- **Don't force push to main** - This can overwrite teammate's work
- **Don't ignore conflicts** - Always resolve them properly
- **Don't commit node_modules** - They're already in .gitignore

## Common Commands Cheat Sheet

```bash
# See current branch
git branch

# See all branches (local and remote)
git branch -a

# Switch branches
git checkout branch-name

# Create and switch to new branch
git checkout -b new-branch-name

# See what files changed
git status

# See commit history
git log --oneline

# Discard uncommitted changes (be careful!)
git restore <file-name>

# Stash changes temporarily
git stash
git stash pop  # to restore them
```

## Merging Your Work to Main (When Ready)

### Option 1: Create a Pull Request (Recommended for teams)
1. Push your branch: `git push origin feature/your-name-dev`
2. Go to GitHub and create a Pull Request
3. Teammate reviews and approves
4. Merge via GitHub interface

### Option 2: Merge directly (if you have permission)
```bash
# Switch to main
git checkout main

# Pull latest changes
git pull origin main

# Merge your branch
git merge feature/your-name-dev

# Push to remote
git push origin main
```

## Quick Daily Workflow Summary

**Morning:**
```bash
git checkout main
git pull origin main
git checkout feature/your-name-dev
git merge main
```

**During work:**
```bash
git add .
git commit -m "Your commit message"
```

**Before pushing:**
```bash
git checkout main
git pull origin main
git checkout feature/your-name-dev
git merge main
git push origin feature/your-name-dev
```

## Need Help?

- `git status` - See current state
- `git log --oneline --graph` - See commit history with branches
- `git diff` - See what changed
- `git help <command>` - Get help on any command

