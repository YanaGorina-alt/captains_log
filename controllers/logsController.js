const express = require('express');
const router = express.Router();
const Log = require('../models/log');

// Seed Route
router.get('/seed', async (req, res) => {
  try {
    await Log.create([
      {
        title: 'Exploring Uncharted Waters',
        entry: 'Embarked on a thrilling adventure across the vast ocean.',
        shipIsBroken: false,
      },
      {
        title: 'Encountering Mythical Creatures',
        entry: 'Spotted a majestic mermaid and a fearsome kraken during the voyage.',
        shipIsBroken: true,
      },
      {
        title: 'Navigating Through a Storm',
        entry: 'Endured a violent storm with fierce winds and towering waves.',
        shipIsBroken: true,
      },
      {
        title: 'Discovering a Hidden Island',
        entry: 'Stumbled upon an uncharted island brimming with lush vegetation and ancient ruins.',
        shipIsBroken: false,
      },
    ]);
    res.redirect('/logs');
  } catch (err) {
    res.status(400).send(err);
  }
});

//INDEX
router.get('/' , async(req,res) =>{
    try {
        const foundLogs = await Log.find({});
        res.status(200).render('Index', { logs: foundLogs });
      } catch (err) {
        res.status(400).send(err);
      }
});

//NEW 
router.get('/new', (req,res)=>{
    
    res.render('New');
})

//DELETE
router.delete('/:id', async (req,res)=>{
    try {
        await Log.findByIdAndDelete(req.params.id)
        res.status(200).redirect("/logs")
    } catch (error) {
        res.status(400).send(error);
        
    }
})

//UPDATE
router.put('/:id', async (req, res) => {
    try {
      req.body.shipIsBroken = req.body.shipIsBroken === 'on';
      const updatedLog = await Log.findByIdAndUpdate(
        // id grabbed from the url, check ln 15 on Edit.jsx
        req.params.id,
        // Data from Edit form
        req.body,
        // Need this to prevent a delay in the update
        { new: true }
      );
      console.log(updatedLog);
      // Redirect to that fruit's show page
      res.redirect(`/logs/${req.params.id}`);
    } catch (err) {
      res.status(400).send(err);
    }
});

//CREATE
router.post('/',async (req,res)=>{
    try {
       req.body.shipIsBroken = req.body.shipIsBroken === 'on';
        const newLog = await Log.create(req.body);
        console.log(newLog);
        // redirect is making a GET request to whatever path you specify
        res.redirect(`/logs`);
      } catch (err) {
        res.status(400).send(err);
      }
     //res.send(req.body)
})

//EDIT
router.get('/:id/edit', async(req,res)=>{
    try {
       const foundLog = await Log.findById(req.params.id) 
        res.render('Edit',{log: foundLog})
    } catch (error) {
        res.status(400).send(error)
    }
})

//SHOW
router.get('/:id', async (req,res) => {
    try {
      const foundLog = await Log.findById(req.params.id)
      res.render('Show', {log:foundLog})  
    } catch (error) {
        res.status(400).send(error);
    }
});


module.exports = router;