import express from 'express'; 
import { loginUser, signoutUser} from '../controllers/auth.controller.js';

const router = express.Router();

//AUTH ROUTES
  // Route to log in a user
  router.post('/login', loginUser);

  // Route to signout a user
  router.get('/signout', signoutUser);

  export default router;
