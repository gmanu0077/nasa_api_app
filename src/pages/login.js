import React, { Component } from "react";
import "../App.css";
import axios from "axios";
import AuthContext from "../context/context-api";
import { useNavigate } from "react-router";
class Login extends Component {

  state = {
    name: "",
    pass: "",
  }


  static contextType = AuthContext;

  cha = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  check = async (e) => {
    e.preventDefault();
    const { getLoggedin, loggedin } = this.context;
    await getLoggedin()
    if (loggedin === false) {
      const el = document.getElementById("e");

      if (el) {
        el.innerHTML = "wrong password or username";
      }

      console.log(loggedin, "after");
    }
    await axios.post(
      "http://localhost:5000/api/user/login",
      {
        username: this.state.name,
        password: this.state.pass,
      },
      {
        withCredentials: true,
      }
    )


    await getLoggedin(this.props.navigate)
    console.log(loggedin, " loggedin", this.props);

    this.setState({
      name: "",
      pass: "",
    });

  };

  render() {
    const { getLoggedin, loggedin } = this.context;
    if (loggedin?.status === true) {
      getLoggedin(this.props.navigate);
    }
    return (
      <div className="main" >
        <div className="loginn container z-depth-3 ">
          <h1 className="white-text center">LOGIN</h1>

          <form className="container center white-text">
            <div>
              <label className="left black-text" htmlFor="name">
                username :{" "}
              </label>
              <input className="white-text" id="name" onChange={this.cha} value={this.state.name} />
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
            <h6 className="red-text" id="e"></h6>
            <button
              className="btn  center"
              onClick={this.check}
            >
              login
            </button>

            <button
              className="btn center"
              onClick={() => {
                console.log(this.props, "props");
                this.props.navigate('/Signup')
              }}
            >
              signup
            </button>
          </form>
        </div>
      </div>
    );
  }
}
export function LoginWITHROUTER(props) {
  const navigate = useNavigate();
  return <Login navigate={navigate} />
}
export default Login;
