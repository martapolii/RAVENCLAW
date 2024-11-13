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
git checkout -b backend
```
- if it already exists: 
```
  git checkout backend
```
*I had issues with this, had to force push changes. Wasn't an issue when I first started this branch, but may be an
issue if someone else wants to contribute: 
```
git push origin backend --force
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
   git push origin backend
   ```
   ```
   git pull origin backend
   ```

