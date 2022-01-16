import React from "react";
import { db } from "../../firebase";
import { uid } from "uid";
import { set, ref, onValue, remove, update } from "firebase/database";
import { useState, useEffect } from "react";

const Dashboard = (props) => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [tempUuid, setTempUuid] = useState("");

  const handleTaskChange = (e) => {
    setTask(e.target.value);
  };

  // read
  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      setTodos([]);
      const data = snapshot.val();
      if (data !== null) {
        // console.log(Object.values(data));
        Object.values(data).map((task) => {
          if (task.uid === props.uid) {
            // console.log("y");
            setTodos((oldArray) => [...oldArray, task]);
          }
        });
      }
    });
  }, []);

  // write
  const writeToDatabase = () => {
    const uuid = uid();
    console.log(props.uid);
    set(ref(db, `/${uuid}`), {
      task,
      uuid,
      uid: props.uid,
      //data goes here basically
    });

    setTask("");
  };

  //update
  const handleUpdate = (task) => {
    setIsEdit(true);
    setTempUuid(task.uuid);
    setTask(task.task);
  };

  const handleSubmitChange = () => {
    update(ref(db, `/${tempUuid}`), {
      task,
      uuid: tempUuid,
      uid: props.uid,
    });

    setTask("");
    setIsEdit(false);
  };

  //delete
  const handleDelete = (task) => {
    remove(ref(db, `/${task.uuid}`));
  };

  return (
    <div className="App">
      <input type="text" value={task} onChange={handleTaskChange} />
      {isEdit ? (
        <>
          <button onClick={handleSubmitChange}>Submit Change</button>
          <button
            onClick={() => {
              setIsEdit(false);
              setTask("");
            }}
          >
            X
          </button>
        </>
      ) : (
        <button onClick={writeToDatabase}>submit</button>
      )}

      {todos.map((task) => (
        <>
          <p>{task.task}</p>
          <button onClick={() => handleUpdate(task)}>update</button>
          <button onClick={() => handleDelete(task)}>delete</button>
        </>
      ))}
    </div>
  );
};

export default Dashboard;
