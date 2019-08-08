import React from "react";
import bg from "assets/images/bg.jpg";
import "assets/styles/app.scss";
import LoginImage from "components/LoginImage/index.jsx";



class App extends React.Component {

  render() {
    console.log("fdas");
    return (
      <div>
    
        <div className="bg-color">
        <div className="container-outer">
          <div className="dr">
            <LoginImage url={bg} />
            <div className="form-box">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>

     
      </div>
    );
  }
}
export default App;
