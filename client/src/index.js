import React from "react";
import { render } from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.css";
import {AppRouter} from './app.route'
import App from './AdminAPP';
render(
  <AppRouter/>,
  document.getElementById("root")
);


