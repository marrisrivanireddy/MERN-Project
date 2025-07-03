import React, { Component } from "react";
import axios from "axios";

export default class CreateUser extends Component {
  constructor(props) {
    super(props);
    // Binding 'this' to all event handlers
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // Initial state of the form
    this.state = {
      username: "",
    };
  }
  onChangeUsername = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  onSubmit(e) {
    e.preventDefault(); // Prevents page refresh

    // Creating an exercise object from the form state
    const user = {
      username: this.state.username,
    };
    console.log(user); // Logs the exercise object to the console

    if (this.state.username.length < 3) {
      alert("Username must be at least 3 characters");
      return; // Stops further execution if validation fails
    }
    axios
      .post("http://localhost:5000/users/add", user)
      .then((res) => console.log(res.data))
      .catch((err) => console.error("Axios error", err));

    // Redirects to home page after submit (for now)
    this.setState({
      username: "",
    });
  }

  render() {
    return (
      <div>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="form-group" style={{ marginTop: "20px" }}>
            <input
              type="submit"
              value="Create User"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
