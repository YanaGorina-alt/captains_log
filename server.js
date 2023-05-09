const express = require("express");
const app = express();
const port = 3000;

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


//INDEX
app.get('/logs' ,(req,res) =>{
    res.send('Express is working')
});

//NEW 
app.get('/logs/new', (req,res)=>{
    res.render('New');
})

//DELETE

//UPDATE

//CREATE

//EDIT

//SHOW



app.listen(port, ()=>{
    console.log(`Server is listening on port: ${port}`)
});