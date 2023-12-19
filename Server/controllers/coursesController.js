const db = require("../models/db");
const CourseModel = require('../models/courseModel');


async function addCourse(req, res) {
  console.log(111111111111111111111111);
  console.log(req.user.user_id);
  // const admin_id = req.params.Teacher_id;
  const { course_name, course_description, start_date,price } = req.body;
  // const admin_id = req.user.user_id;


  try {
    const teacher = req.user.user_id;
    // const teacher = req.params.teacherID;
    const newCourseId = await CourseModel.addCourse( course_name, course_description, start_date,price, teacher);

    res.status(201).json({ message: "Course added successfully", course_id: newCourseId });
  } catch (error) {
    console.error("Failed to add course in the controller: ", error);
    res.status(500).json({ error: "Failed to add course" });
  }
}

//________________________________________________________________________________________________________________
async function UpdateTeacher(req, res) {
  const course_id = req.params.course_id;
  const newTeacherId = req.body.newTeacherId;

  try {
    await CourseModel.UpdateTeacher(course_id, newTeacherId);
    res.status(200).json({ message: "Course teacher changed successfully" });
  } catch (error) {
    console.error("Failed to change course teacher in the controller: ", error);
    res.status(500).json({ error: "Failed to change course teacher" });
  }
}
//________________________________________________________________________________________________________________
  async function UpdateCourse(req, res) {
    const course_id = req.params.course_id;
    const { course_name, course_description, start_date } = req.body;
    const usid = req.user.user_id;

    try {
      await CourseModel.UpdateCourse(course_id, course_name, course_description, start_date,usid);
  
      res.status(200).json({ message: "Course updated successfully" });
    } catch (error) {
      console.error("Failed to update course in the controller: ", error);
      res.status(500).json({ error: "Failed to update course" });
    }
  }

//______________________________________________________________________________________________

  async function SoftdeleteCourse(req, res) {
    const course_id = req.params.course_id;
    const usid = req.user.user_id;

    try {
      await CourseModel.SoftdeleteCourse(course_id,usid);
  
      res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
      console.error("Failed to soft delete course in the controller: ", error);
      res.status(500).json({ error: "Failed to soft delete course" });
    }
  }
//______________________________________________________________________________________________

async function RestoreCourse(req, res) {
  const course_id = req.params.course_id;

  try {
    await CourseModel.RestoreCourse(course_id);

    res.status(200).json({ message: "Course restored successfully" });
  } catch (error) {
    console.error("Failed to restore course in the controller: ", error);
    res.status(500).json({ error: "Failed to restore course" });
  }
}

//______________________________________________________________________________________________

async function GetCourses (req, res) {
  try {
    const page = req.params.page;
    const pageSize = req.params.pageSize;  
    // const { page = 2, pageSize = 10 } = req.query; 

    const offset = (page - 1) * pageSize; 
    const courses = await CourseModel.GetCourses(pageSize,offset);
    res.status(200).json(courses);
  } catch (error) {
    console.error("Failed to get courses in the controller: ", error);
    res.status(500).json({ error: "Failed to get courses" });
  }
}
//______________________________________________________________________________________________


async function GetCourseById (req, res) {
  try {
    const id = req.params.id;
    const courses = await CourseModel.GetCourseById (id);
    res.status(200).json(courses);
  } catch (error) {
    console.error("Failed to get course in the controller: ", error);
    res.status(500).json({ error: "Failed to get course" });
  }
}
//______________________________________________________________________________________________
async function GetCoursedeleted(req, res) {
  try {
    const deletedCourses = await CourseModel.GetCoursedeleted();
    res.status(200).json(deletedCourses);
  } catch (error) {
    console.error("Failed to get deleted courses in the controller: ", error);
    res.status(500).json({ error: "Failed to get deleted courses" });
  }
}



async function GetCoursesByTeacher(req, res) { 
  try {
    const teacher_id = req.user.user_id

    const result = await db.query(`
      SELECT course_id, course_name, course_description
      FROM courses
      WHERE admin_id = $1;
    `,[teacher_id]);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Failed to get courses for this teacher', error);
    res.status(500).json({ error: 'Failed to get courses for this teacher' });
  }
}

  module.exports = {
    addCourse  ,
    UpdateCourse ,
    SoftdeleteCourse,
    RestoreCourse,
    GetCourses,
    GetCoursedeleted,
    GetCourseById,
    UpdateTeacher,
    GetCoursesByTeacher
  };