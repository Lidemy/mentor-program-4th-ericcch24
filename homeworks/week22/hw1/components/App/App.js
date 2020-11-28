import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import {
  LoginPage,
  HomePage,
  PostPage,
  AboutMePage,
  NewPostPage,
  RegisterPage,
} from "../../pages/";
import Header from "../Header/";
import { AuthContext, LoadingContext } from "../../contexts";
import { getMe } from "../../WebAPI";

const Root = styled.div`
  padding-top: 64px;
`;

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getMe().then((response) => {
      if (response.ok) {
        setUser(response.data);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Root>
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
          <Router>
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
            </Switch>
          </Router>
        </LoadingContext.Provider>
      </Root>
    </AuthContext.Provider>
  );
}

export default App;
