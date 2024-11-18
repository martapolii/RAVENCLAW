// Implement the server
import config from './../config/config' ;
import app from './express';
import dotenv from 'dotenv';


dotenv.config({ path: path.resolve(__dirname, '../.env') }); //configure to read .env file from root

app.get("/", (req, res) => {
  res.json({ message: "Welcome to User application." });
});
app.listen(config.port, (err) => { 
if (err) {
console.log(err) 
}
console.info('Server started on port %s.', config.port) 
});
