// import { useState, useContext } from "react";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
// import { attemptRegister, attemptGoogleLogin } from "../../api/login";

// import { AuthContext } from "../../context/authContext";

// import "./style.css";

// const Register = () => {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const auth = useContext(AuthContext);

//   const loginGoogle = async () => {
//     const response = await attemptGoogleLogin();

//     if (response && response.data) {
//       //console.log("user: " + response.data);
//       //const username = response.data._id;
//       auth.login(response.data, response.data._id);
//     }
//   };

//   const redirectToGoogle = async () => {
//     let timer;
//     const googleLoginURL = "http://localhost:8080/user/google";
//     const newWindow = window.open(
//       googleLoginURL,
//       "_black",
//       "width=500, height=600"
//     );
//     if (newWindow) {
//       timer = setInterval(() => {
//         if (newWindow.closed) {
//           console.log("Auth Success");

//           loginGoogle();

//           if (timer) clearInterval(timer);
//         }
//       }, 500);
//     }
//   };

//   const checkValid = () => {
//     if (password === confirmPassword) {
//       return true;
//     } else {
//       return false;
//     }
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     if (checkValid) {
//       const response = await attemptRegister({
//         firstName,
//         lastName,
//         email,
//         password,
//       });

//       console.log(response);

//       if (response && response.data) {
//         //console.log("user: " + response.data);
//         //const username = response.data._id;
//         auth.login(response.data, response.data._id);
//       }
//     }
//   };

//   return (
//     <div className="content-justify-center">
//       <div className="col-8 m-auto">
//         <h2>Register</h2>
//         <Form onSubmit={handleRegister}>
//           <Form.Group controlId="formBasicFirstName">
//             <Form.Label>First Name</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter First Name"
//               onChange={(e) => setFirstName(e.target.value)}
//             />
//           </Form.Group>
//           <Form.Group controlId="formBasicLastName">
//             <Form.Label>Last Name</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter Last Name"
//               onChange={(e) => setLastName(e.target.value)}
//             />
//           </Form.Group>
//           <Form.Group controlId="formBasicEmail">
//             <Form.Label>Email address</Form.Label>
//             <Form.Control
//               type="email"
//               placeholder="Enter email"
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <Form.Text className="text-muted">
//               We'll never share your email with anyone else.
//             </Form.Text>
//           </Form.Group>

//           <Form.Group controlId="formBasicPassword">
//             <Form.Label>Password</Form.Label>
//             <Form.Control
//               type="password"
//               placeholder="Password"
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </Form.Group>

//           <Form.Group>
//             <Form.Label>Confirm Password</Form.Label>
//             <Form.Control
//               type="password"
//               placeholder="Password"
//               onChange={(e) => setConfirmPassword(e.target.value)}
//             />
//           </Form.Group>

//           <Button variant="primary" type="submit">
//             Register
//           </Button>
//         </Form>
//         <div className="mt-3">
//           <Button
//             className="buttonStyle"
//             variant="outline-dark"
//             onClick={redirectToGoogle}
//           >
//             <img
//               width="20px"
//               className="imgStyle"
//               alt="Google sign-in"
//               src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
//             />
//             Login with Google
//           </Button>
//         </div>
//         <div className="mt-3">
//           <p>
//             Have an account? <a href="/Login">Login here</a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;
