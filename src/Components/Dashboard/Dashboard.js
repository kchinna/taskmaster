import React from "react";
import { db } from "../../firebase";
import { uid } from "uid";
import { set, ref, onValue, remove, update } from "firebase/database";
import { useState, useEffect } from "react";
// import Header from "./Header/Header";
import CheckButton from "./Check-Button/CheckButton";
import Pencil from "./Edit-Button/Pencil";
import "./Dashboard.css";
import { XLg } from "react-bootstrap-icons";
import { PencilSquare, CheckCircleFill } from "react-bootstrap-icons";
import { Container, Row, Col } from "react-bootstrap";

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
    if (task != "") {
      console.log(props.uid);
      set(ref(db, `/${uuid}`), {
        task,
        uuid,
        uid: props.uid,
        //data goes here basically
      });
    }

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
      {/* <Header username={props.username} /> */}
      <div className="dashboard"></div>
      <Container className="container">
        <Row>
          <Col lg={4}>
            <div className="top">
              <p className="add-text">add or update a task!</p>
              <textarea
                rows={4}
                className="input"
                type="text"
                value={task}
                onChange={handleTaskChange}
              />

              {isEdit ? (
                <div className="update">
                  <div className="edit-button" onClick={handleSubmitChange}>
                    edit
                  </div>
                  <div
                    className="edit-button"
                    onClick={() => {
                      setIsEdit(false);
                      setTask("");
                    }}
                  >
                    cancel
                  </div>
                </div>
              ) : (
                <div className="add-button" onClick={writeToDatabase}>
                  add
                </div>
              )}
            </div>

            <div className="help-section">
              <p className="para">
                Hello! We are excited for you to use Task Master! Here you can
                keep track of all your tasks linked by your Google Account
              </p>
              <div className="iconpara">
                {/* <PencilSquare className="pencil-help" /> */}
                <p className="para">
                  Press on the pencil to update a current task!
                </p>
              </div>
              <div className="iconpara">
                {/* <CheckCircleFill className="check-help" /> */}
                <p className="para">
                  Press on the checkmark once you are done with a task!
                </p>
              </div>
              <p className="para">Created by Kanishk Chinna and Divyank Shah</p>
            </div>
          </Col>

          <Col lg={8}>
            <div className="tasks">
              {todos.map((task) => (
                <div className="task">
                  <p>{task.task}</p>
                  <div id="dashboard-edit-icons">
                    <div onClick={() => handleUpdate(task)}>
                      {" "}
                      <Pencil />
                    </div>
                    <div onClick={() => handleDelete(task)}>
                      <CheckButton />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Col>
          {/* </Row>

        <Row> */}
          <Col lg={4}></Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
