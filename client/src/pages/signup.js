import React, { Component } from "react";
import "../App.css";
import axios from "axios";
import { useNavigate } from "react-router";
class Signup extends Component {
  state = {
    name: "",
    pass: "",
    verify: "",
  };
  cha = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  sub = async (e) => {
    e.preventDefault();
    if (!this.state.pass && !this.state.verify && !this.state.name) {
      alert("enter all the feilds");
    } else if (this.state.pass !== this.state.verify) {
      alert("verify password");
    } else if (this.state.pass.length < 6) {
      console.log("pass");
      alert("password should be greater than 6 letters");
    } else {
      await axios.post("/api/user/add", {
        username: this.state.name,
        password: this.state.pass,
        passwordVerify: this.state.verify,
      });

      this.props.navigate("/dashboard");
    }
    this.setState({
      name: "",
      pass: "",
      verify: "",
    });
  };

  render() {
    return (
      <div className="signup container z-depth-3 white-text ">
        <h1 className="white-text text-darken-3 center">REGISTER</h1>

        <form className="container center">
          <div>
            <label className="left black-text" htmlFor="name">
              username :{" "}
            </label>
            <input
              id="name"
              onChange={this.cha}
              value={this.state.name}
              className="white-text"
            />
          </div>
          <div>
            <label className="left black-text" htmlFor="pass">
              password :{" "}
            </label>
            <input
              type="password"
              id="pass"
              onChange={this.cha}
              value={this.state.pass}
              className="white-text"
            />
          </div>
          <div>
            <label className="left black-text" htmlFor="pass">
              verify password :{" "}
            </label>
            <input

              type="password"
              id="verify"
              onChange={this.cha}
              value={this.state.verify}
              className="white-text"
            />
          </div>
          <button
            className="btn center"
            onClick={this.sub}
          >
            Create account
          </button>
          <a href="/">
            <button
              className="btn  center"
              onClick={() => {
                console.log(this.props);
                this.props.navigate("/");
              }}
            >
              switch to login
            </button>
          </a>
        </form>
      </div>
    );
  }
}
export function SignupWITHROUTER(props) {
  const navigate = useNavigate();
  return <Signup navigate={navigate} />
}
export default Signup;
