import React from "react";
import App from "./container/LoginPage/App.jsx";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ForgotPassword from "container/Forgot Passwrod/index.jsx";
import ResetPassword from "container/ResetPassword";
import Form from "./container/LoginPage/Form.jsx";
import AdminApp from "AdminAPP";

export const FormSwitcher = () => {
  return (
    <div>
      <Route path="/" exact component={Form} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/reset/:token/:email" exact component={ResetPassword} />
    </div>
  );
};
export const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/admin" exact  component={AdminApp} />
        <App>
          <FormSwitcher />
        </App>
      </Switch>
    </Router>
  );
};
