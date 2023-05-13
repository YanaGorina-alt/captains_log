require('dotenv').config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const { connect, connection } = require('mongoose');
const methodOverride = require('method-override');
const logsController = require('./controllers/logsController');


// Database connection
connect(process.env.MONGO_URI, {
  // Having these two properties set to true is best practice when connecting to MongoDB
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// This line of code will run the function below once the connection to MongoDB has been established.
connection.once('open', () => {
    console.log('connected to mongo');
  });


// View Engine Middleware Configure
//The reactViewsEngine is created using createEngine() from the jsx-view-engine package. 
const reactViewsEngine = require('jsx-view-engine').createEngine();
//The app.engine() method is used to register the 'jsx' file extension with the reactViewsEngine.
app.engine('jsx', reactViewsEngine);
// This line sets the view engine to 'jsx', indicating that files with the .jsx extension will be rendered using the JSX view engine..
app.set('view engine', 'jsx');
// This line sets the render method's default location to look for a jsx file to render. Without this line of code we would have to specific the views directory everytime we use the render method
//In this case, the './views' directory is specified as the views directory.
app.set('views', './views');

// Middleware
app.use(express.urlencoded({ extended: false })); // This enables the req.body
app.use(express.json())
//after app has been defined
//use methodOverride.  We'll be adding a query parameter to our delete form named _method
app.use(methodOverride('_method'));
app.use(express.static("public"));
// Custom Middleware
app.use((req, res, next) => {
    console.log('Middleware running...');
    next();
  });

// Routes
app.use('/logs', logsController);

//Catch all route. If the uses try to reach a route that doesn't match the ones above it will catch them and redirect to the Index page
app.get('/*', (req, res) => {
    res.send(`
      <div>
        404 this page doesn't exist! <br />
        <a href="/logs">Logs</a> <br />
      </div
    `);
  });


app.listen(port, ()=>{
    console.log(`Server is listening on port: ${port}`)
});