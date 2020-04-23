import React from "react";

class Side extends React.Component {
   
    render() {
        return (
            <div className="side">
            <h2>About us:</h2>
            <p>
              We are brand new site with most delicious recepies.
              <br /> Enyoj!{" "}
            </p>
            <div className="imgSide">
              {" "}
              <img src={require("./pic_side.jpg")} />{" "}
            </div>

            <div className="signInForm">
              <h2 className="signInText">Sign in:</h2>
              Email:{" "}
              <input
                name="name"
                type="text"
                placeholder="Enter email.."
              ></input>{" "}
              <br />
              Password:{" "}
              <input
                name="summary"
                type="password"
                placeholder="Enter password.."
              ></input>
              <br />
              <button className="singInButton" href="https://">
                {" "}
                Submit{" "}
              </button>
            </div>
          </div>
            
        )}
    }

    export default Side;