const express = require('express')
const router =express.Router()
const Task=require('../models/task')



router.get('/ping', (req, res) => {
  res.send('pong');
});

router.post("/", async (req, res) =>{
  try {
      const task = await Task.create(req.body);
    res.status(201).json(task);
   } catch(error){
        res.status(400).json({error: error.message});
    }});
router.get('/', async (req,res)=>{
    try{ 
      const tasks = await Task.find().populate("assignedUser", "name email");
   res.json(tasks);
    } catch (error) {
        res.status(500).json({error:error.message}); }});
router.patch("/:id", async (req, res) => {
  try {
   const task = await Task.findByIdAndUpdate(
  req.params.id,
  req.body,
  { new: true }
).populate("assignedUser", "fullName email");
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }});
router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }});
  
module.exports = router;