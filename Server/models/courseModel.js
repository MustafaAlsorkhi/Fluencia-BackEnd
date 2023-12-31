const db = require("../models/db");


const addCourse = async (course_name, course_description, start_date,price, admin_id) => {
  console.log( admin_id , 111111111111111111111111111111);
    const queryText = `
      INSERT INTO courses (admin_id, course_name, course_description, start_date,price)
      VALUES ($1, $2, $3, $4,$5)
      RETURNING course_id;
    `;
  
    const values = [admin_id, course_name, course_description, start_date,price];
  
    try {
      const result = await db.query(queryText, values);
      return result.rows[0].course_id;
    } catch (error) {
      console.error("Failed to add course in the model: ", error);
      throw new Error("Failed to add course in the model");
    }
  };
  
//___________________________________________________________________________________________
async function UpdateTeacher(courseId, newTeacherId) {
  const queryText = `
    UPDATE courses
    SET admin_id = $1
    WHERE course_id = $2;
  `;

  const values = [newTeacherId, courseId];

  try {
    await db.query(queryText, values);
  } catch (error) {
    console.error("Failed to change course teacher in the model: ", error);
    throw new Error("Failed to change course teacher in the model");
  }
}
//___________________________________________________________________________________________
  const UpdateCourse = async (course_id, course_name, course_description, start_date,admin_id) => {
    const queryText = `
      UPDATE courses
      SET course_name = $1, course_description = $2, start_date = $3
      WHERE course_id = $4 AND admin_id=$5;
    `;
  
    const values = [course_name, course_description, start_date, course_id,admin_id];
  
    try {
      await db.query(queryText, values);
    } catch (error) {
      console.error("Failed to update course in the model: ", error);
      throw new Error("Failed to update course in the model");
    }
  };

//______________________________________________________________________________________________

  const SoftdeleteCourse = async (course_id) => {
    const queryText = `
      UPDATE courses
      SET hidden = TRUE
      WHERE course_id = $1;
    `;
  
    const values = [course_id];
  
    try {
      await db.query(queryText, values);
    } catch (error) {
      console.error("Failed to soft delete course in the model: ", error);
      throw new Error("Failed to soft delete course in the model");
    }
  };

//______________________________________________________________________________________________

  const RestoreCourse = async (course_id) => {
    const queryText = `
      UPDATE courses
      SET hidden = FALSE
      WHERE course_id = $1;
    `;
  
    const values = [course_id];
  
    try {
      await db.query(queryText, values);
    } catch (error) {
      console.error("Failed to restore course in the model: ", error);
      throw new Error("Failed to restore course in the model");
    }
  };
//______________________________________________________________________________________________

const GetCourses = async (pageSize,offset) => {
    const queryText = `
      SELECT *
      FROM courses
      WHERE hidden = FALSE LIMIT $1 OFFSET $2;
    `;
// const queryText = "SELECT course_name, course_description, TO_CHAR(start_date, 'YYYY-MM-DD') AS formatted_start_date FROM courses WHERE hidden=false";
    
try {
      const result = await db.query(queryText,[pageSize,offset]);
      return result.rows;
    } catch (error) {
      console.error("Failed to get courses in the model: ", error);
      throw new Error("Failed to get courses in the model");
    }
  }; 

//______________________________________________________________________________________________


const GetCourseById = async (id) => {

  const queryText = `
    SELECT *
    FROM courses
    WHERE course_id = $1;
  `;
  const values = [id]
// const queryText = "SELECT course_name, course_description, TO_CHAR(start_date, 'YYYY-MM-DD') AS formatted_start_date FROM courses WHERE hidden=false";
  
try {
    const result = await db.query(queryText,values);
    return result.rows[0];
  } catch (error) {
    console.error("Failed to get course in the model: ", error);
    throw new Error("Failed to get course in the model");
  }
};

//______________________________________________________________________________________________

const GetCoursedeleted = async () => {
  const queryText = `
    SELECT *
    FROM courses
    WHERE hidden = TRUE;
  `;

  try {
    const result = await db.query(queryText);
    return result.rows;
  } catch (error) {
    console.error("Failed to get deleted courses in the model: ", error);
    throw new Error("Failed to get deleted courses in the model");
  }
};



//___________________________________

  module.exports = {
    addCourse,
    UpdateCourse,
    SoftdeleteCourse,
    RestoreCourse,
    GetCourses,
    GetCoursedeleted,
    GetCourseById,
    UpdateTeacher
  };