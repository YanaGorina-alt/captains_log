require('dotenv').config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const { connect, connection } = require('mongoose');
const methodOverride = require('method-override');
const Log = require('./models/log');

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
// Custom Middleware
app.use((req, res, next) => {
    console.log('Middleware running...');
    next();
  });
//after app has been defined
//use methodOverride.  We'll be adding a query parameter to our delete form named _method
app.use(methodOverride('_method'));
app.use(express.static("public"));


//INDEX
app.get('/logs' ,(req,res) =>{
    res.send('Index page')
});

//NEW 
app.get('/logs/new', (req,res)=>{
    
    res.render('New');
})

//DELETE

//UPDATE
// app.put('/:id', async (req, res) => {
//     try {
//       req.body.shipIsBroken = req.body.shipIsBroken === 'on';
//       const updatedLog = await Log.findByIdAndUpdate(
//         // id grabbed from the url, check ln 15 on Edit.jsx
//         req.params.id,
//         // Data from Edit form
//         req.body,
//         // Need this to prevent a delay in the update
//         { new: true }
//       );
//       console.log(updatedFruit);
//       // Redirect to that fruit's show page
//       res.redirect(`/fruits/${req.params.id}`);
//     } catch (err) {
//       res.status(400).send(err);
//     }
//   });

//CREATE
app.post('/logs',async (req,res)=>{
    try {
       req.body.shipIsBroken = req.body.shipIsBroken === 'on';
        const newLog = await Log.create(req.body);
        console.log(newLog);
        // redirect is making a GET request to whatever path you specify
        res.send(req.body);
      } catch (err) {
        res.status(400).send(err);
      }
     //res.send(req.body)
})

//EDIT

//SHOW



app.listen(port, ()=>{
    console.log(`Server is listening on port: ${port}`)
});