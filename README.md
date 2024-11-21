To push to this branch specifically: 
1. initilalize repository:
```
git init
```
2. connect remote repository
```
git remote add origin https://github.com/martapolii/RAVENCLAW.git
```
3. check the connection was made
```
git remote -v
```
Output should be: 
```
origin  https://github.com/martapolii/RAVENCLAW.git (fetch)
origin  https://github.com/martapolii/RAVENCLAW.git (push)
```
4. connect to this branch specifically:
- first time: (this will create this branch locally)
```
git checkout -b <name of specific branch>
```
- if it already exists: 
```
  git checkout <name of specific branch>
```
*I had issues with this, had to force push changes. Wasn't an issue when I first started this branch, but may be an
issue if someone else wants to contribute: 
```
git push origin <name of specific branch> --force
```

5. Normal push once connected:
6. - add everything:
   ```
   git add .
   ```
   - add specific files:
   ```
   git add <file name>
   ```
   ```
   git commit -m "commit message"
   ```
   ```
   git push origin <name of specific branch>
   ```
   ```
   git pull origin <name of specific branch>
   ```


## Combining Branches with Unrelated Histories 
1. move to the branch you want to merge the code onto
```
git checkout <branch name>
```
2. Fetch the latest version of the branch you want to merge
```
git fetch origin <branch1 name>
```
3. Checkout the files without switching branches
```
git checkout <branch1 name> -- .
```
- `-- .` = all files from specified branch
4. repeat for other branch
5. 'Stage' all the files
```
git add .
```
6. 'Commit' the combined files to github on the new branch
```
git commit -m "Write a message here to describe the branches you are merging and why, BRIEFLY"
```
7. 'Push' the branch (add this folder + the files you combined) to github
```
git push origin <branch name>
```

8. Alternatively, can copy specific folders over from another branch:
```
git checkout <branch1 name> -- <specific-folder-or-file you want to extract>
```