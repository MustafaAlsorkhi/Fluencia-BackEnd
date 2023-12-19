const db = require("../models/db");


const addTask = async (task_name, task_description, task_url,admin_id,course_id) => {
  const queryText = `
  INSERT INTO task (admin_id, task_name, task_description, task_url, course_id)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING task_id;
`;
  
    const values = [admin_id,task_name, task_description, task_url,course_id];
  
    try {
      const result = await db.query(queryText, values);
      return result.rows[0].task_id;
    } catch (error) {
      console.error("Failed to add task in the model: ", error);
      throw new Error("Failed to add task in the model");
    }
  };

  //____________________________________________________________________________

  const UpdateTask = async (task_id,task_name, task_description, task_url,admin_id) => {
    const queryText = `
      UPDATE task
      SET task_name = $1, task_description = $2, task_url = $3 
      WHERE task_id = $4 AND admin_id= $5 ;
    `;

    const values = [task_name, task_description, task_url, task_id,admin_id];
  
    try {  
      await db.query(queryText, values); 
    } catch (error) {
      console.error("Failed to update task in the model: ", error);
      throw new Error("Failed to update task in the model");
    }
  };

//__________________________________________________________________________________

const SoftdeleteTask = async (task_id,admin_id) => {
    const queryText = `
      UPDATE task
      SET deleted = TRUE
      WHERE task_id = $1 AND admin_id=$2;
    `;
  
    const values = [task_id,admin_id];
  
    try {
      await db.query(queryText, values);
    } catch (error) {
      console.error("Failed to soft delete task in the model: ", error);
      throw new Error("Failed to soft delete task in the model");
    }
  };

//_________________________________________________________________________________________

const RestoreTask = async (task_id,admin_id) => {
    const queryText = `
      UPDATE task
      SET deleted = FALSE
      WHERE task_id = $1 AND admin_id=$2;
    `;
  
    const values = [task_id,admin_id];
  
    try {
      await db.query(queryText, values);
    } catch (error) {
      console.error("Failed to restore task in the model: ", error);
      throw new Error("Failed to restore task in the model");
    }
  };
//____________________________________________________________________________________________


const GetTaskbyID = async (task_id) => {
  const queryText = `
  SELECT task.task_id, task.task_name, task.task_description, task.task_url,
  users_task.user_id, users.first_name, users_task.submit_date, users_task.answer_url
FROM task
INNER JOIN users_task ON task.task_id = users_task.task_id
INNER JOIN users ON users_task.user_id = users.user_id
WHERE task.task_id = $1;
`;    
try {
      const result = await db.query(queryText,[task_id]);
      return result.rows;
    } catch (error) {
      console.error("Failed to get this Task ", error);
      throw new Error("Failed to get this Task ");
    }
  };


  //____________________________________________________________________________________________
//   const GetTaskes = async (pageSize,offset,course_id) => {
//     const queryText = `
//     SELECT task_name, task_description, task_url
//     FROM task
//     WHERE deleted = FALSE AND course_id = $3 
//     LIMIT $1 OFFSET $2;
//   `;  
// try {
//       const result = await db.query(queryText,[pageSize,offset,course_id]);
//       return result.rows;
//     } catch (error) {
//       console.error("Failed to get taskes in the model: ", error);
//       throw new Error("Failed to get taskes in the model");
//     }
//   };

  const GetTaskes = async (course_id) => {
    const queryText = `
    SELECT task_name, task_description, task_url
    FROM task
    WHERE deleted = FALSE AND course_id = $1;
  `;  
try {
      const result = await db.query(queryText,[course_id]);
      return result.rows;
    } catch (error) {
      console.error("Failed to get taskes in the model: ", error);
      throw new Error("Failed to get taskes in the model");
    }
  };


  module.exports = {
    addTask,
    UpdateTask,
    SoftdeleteTask,
    RestoreTask,
    GetTaskes,
    GetTaskbyID
  };