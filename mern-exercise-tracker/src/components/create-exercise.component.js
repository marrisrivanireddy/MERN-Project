import React, { Component } from "react";
import axios from "axios";
// Importing DatePicker component and its styles for picking dates

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// CreateExercise component to handle creating a new exercise log
export default class CreateExercise extends Component {
  // Constructor to initialize state and bind methods
  constructor(props) {
    super(props);
    // Binding 'this' to all event handlers
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // Initial state of the form
    this.state = {
      username: "",
      description: "",
      date: new Date(),
      duration: 0,
      users: [],
    };
  }

  // Lifecycle method to set initial dummy user data when component mounts
  componentDidMount() {
    axios.get("http://localhost:5000/users/").then((response) => {
      if (response.data.length > 0) {
        this.setState({
          users: response.data.map((user) => user.username), // Extract usernames from user objects
          username: response.data[0].username, // Set the first username as default
        });
      }
    });
  }

  // Event handler for changing username from dropdown
  onChangeUsername = (e) => {
    this.setState({
      username: e.target.value,
    });
  };
  onChangeDescription = (e) => {
    this.setState({
      description: e.target.value,
    });
  };
  onChangeDuration = (e) => {
    this.setState({
      duration: e.target.value,
    });
  };
  onChangeDate = (date) => {
    this.setState({
      date: date,
    });
  };
  // Event handler for form submission
  onSubmit(e) {
    e.preventDefault(); // Prevents page refresh

    // Creating an exercise object from the form state
    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
    };
    console.log(exercise); // Logs the exercise object to the console

    axios
      .post("http://localhost:5000/exercises/add", exercise)
      .then((res) => console.log(res.data))
      .catch((err) => console.error("Axios error", err));

    // Redirects to home page after submit (for now)
    window.location = "/";
  }
  // Render method returns JSX that builds the UI
  render() {
    return (
      <div>
        <h3>Create New Exercise Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <select
              //  ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            >
              {this.state.users.map(function (user) {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group">
            <label>Duration (in minutes): </label>
            <input
              type="text"
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
            />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>

          <div className="form-group" style={{ marginTop: "20px" }}>
            <input
              className="btn btn-primary"
              type="submit"
              value="Create Exercise Log"
              //className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
