import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts";
import { postArticle } from "../../WebAPI";

const NewPostContainer = styled.div`
  margin: 10px auto;
  width: 900px;
  padding: 30px;
  border: 1px solid black;
  box-sizing: border-box;
`;

const NewPostForm = styled.form``;

const NewPostHeader = styled.div`
  font-size: 20px;
`;

const NewPostTitle = styled.div`
  margin-top: 20px;
`;

const NewPostTitleInput = styled.input`
  width: 98%;
  padding: 6px;
  font-size: 100%;
  font-family: inherit;
`;

const NewPostBody = styled.div`
  margin-top: 30px;
`;

const NewPostBodyTextarea = styled.textarea`
  width: 98%;
  padding: 6px;
  font-family: inherit;
  font-size: 100%;
`;

const NewPostButtonWrapper = styled.div`
  text-align: right;
  margin-top: 20px;
`;

const NewPostButton = styled.button`
  display: inline-block;
  cursor: pointer;
  padding: 10px 30px;
  font-family: inherit;
  font-size: 100%;
`;

const ErrorMessage = styled.div`
  margin-top: 10px;
  color: red;
`;

export default function NewPostPage() {
  const { user } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!title || !body) {
      return setErrorMessage("請輸入文章標題與內容");
    }
    if (!user) {
      return setErrorMessage("請登入後繼續");
    }

    postArticle(title, body).then(() => {
      history.push("/");
    });
  };
  return (
    <NewPostContainer>
      {user ? (
        <NewPostForm onSubmit={handleSubmit}>
          <NewPostHeader>發布文章：</NewPostHeader>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          <NewPostTitle>
            <NewPostTitleInput
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              placeholder="輸入文章標題"
            />
          </NewPostTitle>
          <NewPostBody>
            <NewPostBodyTextarea
              value={body}
              onChange={(e) => {
                setBody(e.target.value);
              }}
              placeholder="輸入文章內容"
              rows={20}
            />
          </NewPostBody>
          <NewPostButtonWrapper>
            <NewPostButton>送出</NewPostButton>
          </NewPostButtonWrapper>
        </NewPostForm>
      ) : (
        <ErrorMessage>"請登入後繼續"</ErrorMessage>
      )}
    </NewPostContainer>
  );
}
