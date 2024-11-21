# **MERN BACKEND** (I created this README for assignment 2 following the PPT provided in class (Week 3 - "Configuring an Express Application - REACTNew Winter (11)"), will follow the same steps here)

(all commands are run from the **server/project (root) folder** unless otherwise specified - as in, some commands need to be run from client, I will specify when that is the case)

## **Steps to install the MERN backend:**
1. set up project folder 
2. Install and configure necessary Node modules 
3. prepare run scripts 
4. implement an Express server
5. implement a user model with mongoose 
6. implement API endpoints with Express router
7. implement JWT-based authentication

---

## **1. Folder and File Structure for MERN backend**
- this creates a functioning, stand alone server-side app:
![MERN back end folder/file structure](image.png)

- bellow are the folders/files you need to create manually: 

```
- config/
-- congif.js
- server/
-- controllers/
--- auth.controller.js
--- user.controller.js
- helpers/
-- dbErrorHandler.js
- models/
-- user.model.js
- routes/
-- auth.routes.js
-- user.routes.js
- express.js
- server.js
- .babelrc
- template.js
- webpack.config.server.js
```

- root directory: configuation files
- server folder: back-end code 
    - divide into: models, controllers, routes, helpers, common server-side code 

- **add a package.json file**
  - store meta information about the project
  - list module dependencies
  - define run scripts
- run in terminal"
```
yarn init
```

## **2. Install and configure necessary Node modules/Development Dependencies**

- configure + install **Vite** 
  - check if installed globally:
 ```
vite --version
```  
  - or locally:
```
npx vite --version
```
  - install vite globally so it can be used from anywhere
```
npm install -g vite
```
  - can run vite locally without a global installation:
```
npx vite --version
```

### **Configure Babel**
**1. create babel.rc file in root, add this code:**
```
{
  "presets": [
  ["@babel/preset-env", 
  {
  "targets": {
  "node": "current" 
  }
  } 
  ],
  "@babel/preset-react" 
  ],
  "plugins": [
  "react-hot-loader/babel" 
  ]
}
```

**2. install Babel modules as devDependencies**
- run in terminal:
```
yarn add --dev @babel/core babel-loader @babel/preset-env
```
### **Configure + Install Nodemon**
- configure nodemon to watch the server folder for changes and restart the server when changes are detected
  - create a nodemon.json file in root, add this configuration:
```
{
"verbose": false,
"watch": [ "./server" ]
}
```
- run in terminal to install:
```
yarn add nodemon
```

### **Config variables **
- in config.js define some server-side configuration-related variables
```
 const config = {
 env: process.env.NODE_ENV || 'development',
 port: process.env.PORT || 3000,
 jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key", 
 mongoUri: process.env.MONGODB_URI ||
 process.env.MONGO_HOST ||
 'mongodb://' + (process.env.IP || 'localhost') + ':' + 
(process.env.MONGO_PORT || '27017') +
 '/mernproject'
 }
 export default config
```

## **3. Run scripts**
- allow us to run and debug backend implementation
  - to run server as we develop the code add yarn development script in package.json:
```
  "scripts": {
  "development": "nodemon" 
  }

```
  - start Nodemon: 
```
yarn add development
```

## **4. Implement an Express server**
**1. Configure express**
- install the express module:
```
yarn add express
```
- import into express.js file, configure, make available to rest of app:
```
    import express from 'express’ 
    const app = express()
   /*... configure express ... */ 
   export default app
```
- add modules to handle HTTP requests and serve responses properly:
```
  body-parser: yarn add body-parser 
  cookie-parser: yarn add cookie-parser 
  compression: yarn add compression 
  helmet: yarn add helmet 
  cors: yarn add cors
```
- update express.js to import these modules and update express app before exporting it for use in the server 
```
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())
export default app
```
- express can now accept and process HTTP requests

**2. Starting the server **
- update server.js to implement the server
```
import config from './../config/config' 
import app from './express'
app.get("/", (req, res) => {
  res.json({ message: "Welcome to User application." });
});
app.listen(config.port, (err) => { 
if (err) {
console.log(err) 
}
console.info('Server started on port %s.', config.port) 
})

```
- create an index.js file and configure the port number for the server
```

const express = require('express');
const app = express();
const port = 3000;

// Add your server routes and middleware here
// For example:
 app.get('/', (req, res) => {
   res.send('Hello, world!');
 });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```
- run
```
yarn development
```
-- console should now display "Server is running on port 3000"


- the install dotenv to load environmemtal variables (will need this later)
```
 npm install dotenv
```
 - import dotenv in server.js:
```
import dotenv from 'dotenv';
``` 
- configure to read .env from root folder in server.js file:
```
 dotenv.config({ path: path.resolve(__dirname, '../.env') });
```

**Once Tanner has the front end set up, can continue with steps in Week 4 PPT: "Configuring an Express application - REACTVITESETUP(FRONT AND BACKEND (3) (13) (6))"
