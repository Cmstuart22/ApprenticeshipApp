import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

const AddTopic = (props) => {
  const [categories, setCategories] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [topic, setTopic] = useState("");
  const [notes, setNotes] = useState("");
  const [studentId, setStudentId] = useState();

  useEffect(() => {
    setTimeout(async () => {
      await fetch("http://localhost:5000/api/categories")
        .then((res) => res.json())
        .then((response) => {
          setCategories(response);
        });
    }, 200);
  }, [setCategories]);

  const handleAddTopic = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5000/api/topics/add", {
      method: "POST",
      body: JSON.stringify({
        category: selectedCategory,
        topic: topic,
        notes: notes,
        studentId: props.studentId
      
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((response) => console.log(response))
      .catch((err) => {
        console.log(err);
      });
  };

  const handleGetTopic = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5000/api/topics/add", {
      method: "GET",
      body: JSON.stringify({
        studentId: studentId,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((response) => console.log(response))
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value)
  };

  return (
    <div className="App">
      <div>
        <h1>Add</h1>
        <label>Category: </label>
        <form>
          <select value={selectedCategory} onChange={handleCategoryChange}>
          <option>Select</option>
          {categories &&
            categories.length &&
            categories.map((category) => <option>{category.name}</option>)}
        </select>
          <label>Topic: </label>
          <input
            type="text"
            onChange={(e) => {
              setTopic(e.target.value);
            }}
          />
          <label>Notes: </label>
          <input
            type="text"
            onChange={(e) => {
              setNotes(e.target.value);
            }}
          />
          <button onClick={handleAddTopic}>Add</button>
        </form>
      </div>
      <br />
      <div>
        <h1>Get</h1>
        <label>Read: </label>
        <form>
          <input
            type="boolean"
            onChange={(e) => {
              setStudentId(e.target.value);
            }}
          />
          <button onClick={handleGetTopic}>Get</button>
        </form>
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
    studentId: state.studentId
  };
};
export default connect(mapStateToProps)(AddTopic);
