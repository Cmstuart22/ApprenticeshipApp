import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  const [options, setOptions] = useState([]);
  const [topicData, setTopicData] = useState([]);
  const studentSelected = useSelector((state) => state.options.name);

  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(async () => {
      await fetch("http://localhost:5000/api/students")
        .then((res) => res.json())
        .then((response) => {
          setOptions(response);
        });
    }, 200);

    setTimeout(async () => {
      await fetch("http://localhost:5000/api/students/id")
        .then((res) => res.json())
        .then((response) => {
          dispatch({
            type: "SET_STUDENT_IDS",
            studentId: response,
          });
        });
    }, 200);
  }, [dispatch]);

  const handleStudentChange = (event) => {
    //We want to be able to store the student name and _id
    //in the redux store so we can use those values later.
    //Updated the logic so we only store the _id for a
    //student that is in the database. As "Select" is a default
    //value and not returned from the get request this was causing
    //the app to crash so it will now check if the value is stored in
    //options first to check if it needs to store the _id.

    const selectedStudent = options.filter(function (student) {
      return student.name === event.target.value;
    });

    if (
      selectedStudent.length > 0 &&
      selectedStudent[0].name === event.target.value
    ) {
      dispatch({
        type: "CHANGE_STUDENT",
        _id: selectedStudent[0]._id,
        name: event.target.value,
      });
      setTimeout(async () => {
        await fetch(
          `http://localhost:5000/api/topics/get?_id=${selectedStudent[0]._id}`
        )
          .then((res) => res.json())
          .then((response) => {
            //We don't want to show duplicated categories so we map through
            //the response and provide the unique keyword of category
            //which creates a new array which only contains unique categories
            const key = "category";
            const arrayUniqueByKey = [
              ...new Map(response.map((item) => [item[key], item])).values(),
            ];
            setTopicData(arrayUniqueByKey);
          });
      }, 200);
    } else {
      dispatch({
        type: "CHANGE_STUDENT",
        name: event.target.value,
      });
    }
  };

  return (
    <div>
      <div>
        <h2>Select Student:</h2>
        <select value={studentSelected} onChange={handleStudentChange}>
          <option>Select</option>
          {options &&
            options.length &&
            options.map((option) => <option>{option.name}</option>)}
        </select>
      </div>
      <div>
        <div>
          {topicData.map((option) => (
            <div>
              <div>
                <h1>{option.category}</h1>
                <h2>{option.topic}</h2>
                <p>{option.notes}</p>
              </div>
              <br />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

//We map the states we have in the redux store to props so we can use throughout the app
const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
    isRegistered: state.isRegistered,
    isAdmin: state.isAdmin,
  };
};
export default connect(mapStateToProps)(Dashboard);
