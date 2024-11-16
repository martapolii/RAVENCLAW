# **MERN BACKEND** (I created this README for assignment 2 following the PPT provided in class, will follow the same steps here)

## **Steps to install the MERN backend:**
1. set up project folder 
2. Install and configure necessary Node modules 
3. prepare run scripts 
4. implement an Express server
5. implement a user model with mongoose 
6. implement API endpoints with Express router
7. implement JWT-based authentication



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

## **2. Install and configure necessary Node modules/development dependencies**

- configure + install **Vite** and **Nodemon** if not done already
  - check if they're installed globally:
 ```
vite --version
nodemon --version
```  
  - check if they're installed locally:
```
npx nodemon --version
npx vite --version
```
  - install vite globally so it can be used from anywhere
```
npm install -g vite
```
  - install nodemon from client folder
```
  npm install nodemon --save-dev
```
  -can run vite locally without a global installation:
```
npx vite --version
```
---

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
]
]
}
```

**2. install Babel modules**
```
yarn add --dev @babel/core babel-loader @babel/preset-env
```

**5. Config variables **
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
- yarn development script 
- confirm this script in package.json:
```
"dev": "concurrently \"vite --config ./client/vite.config.js\" \"nodemon ./server/server.js\""
```
- add the type=module in the package.json in server side 
- *** change to import from require in server.js since using ES modules:
```
  import express from 'express';
  import path from 'path';
```
- *** had to add this to top of server.js file to use ES modules since __dirame is not available by default:
  ```
    import { fileURLToPath } from 'url';
    import { dirname } from 'path';
  ```
- ** update assets-router.js (see file comments)
- now run
```
yarn dev
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
- update express.js to import these modules and update express app before exporting it for use in the server (see file comments)
- express can now accept and process HTTP requests

**2. Starting the server **
- update server.js to implement the server
```
import config from './config/config.js'; 
app.use(express.static(path.join(__dirname, "../dist")));
```
- update the app.listen function that sets the port with the config 
**** this is where you would display a message in browser when running the server****

- added an.env file in root and defined port #
- the install dotenv to load environmemtal variables
```
 npm install dotenv
```
 - import dotenv in server.js:
```
import dotenv from 'dotenv';
dotenv.config();
```
  - port 5173 serves the front end using vite
  - port 5001 serves the front end using express 
- configure to read .env from root folder:
```
 dotenv.config({ path: path.resolve(__dirname, '../.env') });
```

## **5. Implement a user and contact model and controllers with mongoose** 
**1. Setting up Mongoose **
```
yarn add mongoose
```
- update server.js to import the mongoose module. configure it so that it uses native ES6 promises, use it to handle the connection to the MongoDB database 
- Create a template.js file in the root
- update express.js to serve this file at the root
```
import Template from './../template.js'

app.get('/', (req, res) => {
res.status(200).send(Template()) 
})
```
- Run:
```
 npm install mongodb
```
- add connection string (mongoURi)
    - add connection string as environmental variable and add .gitignore file with .env in it
- update server.js
```
import app from './server/express.js'
```
- throws new Error(`unable to connect to database: ${config.mongoUri}`) -*will continue with configuration of MongoDB database and troubleshoot after
- run the server:
```
cd client
yarn dev
```

**2. Creating the user and contat models **
- create a model for both the user and contact collection in your database
  - define a schema for the type of data to be stored (name, data type, certain conditions/restrictions/business rules)

**3. Create the controllers**
- 

**4. run:**
```
yarn add lodash
```
- used when updating 
- run:
```
Yarn add method-override
```

## **6. implement API endpoints with Express router**
**1. create route.js files for both contact and user to define the routes for handling all CRUD opertions for their API's (GET/POST/PUT/DELETE)**
- syntax: router.route('url')l.get(controllername.methodname)
- example:
```
router.route('api/contacts').get(contactCtrl.read)
```

**2. update express.js by importing all route files**
- configure express to use body-parser as middleware (add below lines above configurations)
```
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
```
- configure routes as well

**3. test requests with postman**

TROUBLESHOOTING:
- had alot of issues passing the mongodb uri from .env file through config.js to server.js. Solution was to import dotenv directly in config.js:
//config.js
import dotenv from 'dotenv';
dotenv.config();

- also had lots of issues getting the API routes to work. Postman keeps serving my index.html page, meaning my catch-all route is working, but my API routes are not being triggered
TRIED:
  - re-ordering routes in express.js file to make sure none are interfering with the API routes
  - triple checking logic in controllers
  - triple checking syntax in route files 
  - making sure all these files are properly 'connected', controllers/models/routes imported, etc
  - using console.log to troubleshoot (API routes are not being triggered)
  - changing my header in postman so accept value is application/json 
  - organizing server.js and express.js files and seperating logic in each as needed
  - commenting out middleware that serves static files and catch-all route in express.js file - get error message in browser: "Cannot GET /api/users" and console 404 error
    - when I try post request get 404 error in postman console and "Cannot POST /api/users" in browser 

** .env file published with sensitive info - to prevent this from happening need to make sure file isnt being tracked:
```
git rm .env --cached    
git commit -m "Stopped tracking .env"
```
- next push to github will just say 'file was deleted' if you try to open the commit

---

**FIX TO BACKEND ISSUE**
I believe I misunderstood the assignment - seems like I was suposed to build a stand-alone backend, as no where did it say that I should build a front-end page to display the content retrieved from the database. The issue was I built a back end and DID NOT 'CONNECT' it to the front end. Normally you would have content displayed on the page which an API retrieves from a database. I just had content in this database, wrote the API routes and controllers in the back end, but did not call on them from the front-end. To fix this issue for the sake of the assignment, I could just call the API routes from the index.html page upon loading the page. This wouldn't make sense for the  website, but then my postman requests would work. 

I plan to use a database to store the content on my 'services' and 'projects' pages, and then use API's to retrieve the content.


(Note for self: look into axios)