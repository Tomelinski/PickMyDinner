import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, { useContext, useState } from "react";
import { attemptLogin, attemptGoogleLogin } from "../../api/login";

import "./style.css";

import { AuthContext } from "../../context/authContext";
//import { authenticate } from "passport";

const Login = () => {
  // const [email, setEmail] = useState();
  // const [password, setPassword] = useState();
  const auth = useContext(AuthContext);

  // if(messages.error) console.log();

  // const loginUser = async (e) => {
  //   e.preventDefault();
  //   const response = await attemptLogin({ email, password });
  //   console.log(response);

  //   if (response && response.data) {
  //     console.log("user: " + response.data);
  //     // const username = response.data._id;
  //     auth.login(response.data, response.data._id);
  //   }
  // };

  const loginGoogle = async () => {
    const response = await attemptGoogleLogin();

    if (response && response.data) {
      //console.log("user: " + response.data);
      //const username = response.data._id;
      auth.login(response.data, response.data._id);
    }
  };

  const redirectToGoogle = async () => {
    let timer;
    const googleLoginURL = "http://localhost:8080/user/google";
    const newWindow = window.open(
      googleLoginURL,
      "_black",
      "width=500, height=600"
    );
    if (newWindow) {
      timer = setInterval(() => {
        if (newWindow.closed) {
          console.log("Auth Success");

          loginGoogle();

          if (timer) clearInterval(timer);
        }
      }, 500);
    }
  };

  return (
    <div className="content-justify-center">
      <div className="col-8 m-auto">
        <h1>Login</h1>
        {/* <Form onSubmit={loginUser}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Text className="text-muted">
              We'll never share your profile with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form> */}
        <div className="mt-3">
          <Button
            className="buttonStyle"
            variant="outline-dark"
            onClick={redirectToGoogle}
          >
            <img
              width="20px"
              className="imgStyle"
              alt="Google sign-in"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
            />
            Login with Google
          </Button>
        </div>
        {/* <div className="mt-3">
          <p>
            Don't Have an account? <a href="/Register">Register here</a>
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default Login;
