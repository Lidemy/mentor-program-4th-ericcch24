import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsLoadingUser,
  setErrorMessage,
  userLogin,
  getUser,
} from "../../redux/reducers/userReducer";

const ErrorMessage = styled.div`
  color: red;
`;

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store.users.isLoadingUser);
  const errorMessage = useSelector((store) => store.users.errorMessage);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setErrorMessage(null));
    if (isLoading) return;
    dispatch(setIsLoadingUser(true));

    dispatch(userLogin(username, password)).then(() => {
      if (!localStorage.token) return;

      dispatch(getUser()).then((response) => {
        if (response.ok === 1) {
          history.push("/");
        }
      });
    });
  };

  useEffect(() => {
    // 每次換頁的時候把 errorMessage 清掉
    if (location.pathname) {
      dispatch(setErrorMessage(null));
    }
    console.log(location);
  }, [dispatch, location]);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        username:{" "}
        <input
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </div>
      <div>
        password:{" "}
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <button>登入</button>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </form>
  );
}
