const express = require("express");
const taskController = require("../controllers/taskController");
const router = express.Router();
const authorize= require('../middlewares/authorization')
const authUser= require('../middlewares/authUser')

router.post("/addTask/:course_id",authorize.authorize,taskController.addTask);
router.put("/UpdateTask/:task_id",authorize.authorize,taskController.UpdateTask);
router.put("/SoftdeleteTask/:task_id",authorize.authorize,taskController.SoftdeleteTask);
router.put("/RestoreTask/:task_id",authorize.authorize,taskController.RestoreTask);
// router.get("/GetTaskesbyCourseID/:course_id/:page/:pageSize",taskController.GetTaskes); 
router.get("/GetTaskesbyCourseID/:course_id",taskController.GetTaskes); 

router.get("/GetTaskbyID/:task_id",authorize.authorize,taskController.GetTaskbyID); 

router.get("/GetTaskbyCourseID/:course_id",authUser.authUser,taskController.GetTaskbyCourseID); 
router.get("/getTaskbyCourseIdandUserId/:course_id/:user_id",authorize.authorize,taskController.getTaskbyCourseIdandUserId); 




module.exports = router; 