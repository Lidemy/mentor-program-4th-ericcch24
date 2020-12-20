import React, { useEffect } from "react";
import styled from "styled-components";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import {
  LoginPage,
  HomePage,
  PostPage,
  AboutMePage,
  NewPostPage,
  RegisterPage,
  EditPage,
} from "../../pages/";
import Header from "../Header/";
import { getUser } from "../../redux/reducers/userReducer";
import { useDispatch } from "react-redux";

const Root = styled.div`
  padding-top: 64px;
`;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <Root>
      <Router basename="/w24-react-redux-blog">
        <Header />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/register">
            <RegisterPage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/post/:id">
            <PostPage />
          </Route>
          <Route path="/newpost">
            <NewPostPage />
          </Route>
          <Route path="/about-me">
            <AboutMePage />
          </Route>
          <Route path="/edit/:id">
            <EditPage />
          </Route>
        </Switch>
      </Router>
    </Root>
  );
}

export default App;
