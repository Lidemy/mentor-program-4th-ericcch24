import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import { getPost, editPost } from "../../redux/reducers/postReducer";
import { useDispatch, useSelector } from "react-redux";

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
  const { id } = useParams();
  const history = useHistory();
  const post = useSelector((store) => store.posts.post);
  const user = useSelector((store) => store.users.user);
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const [errorMessage, setErrorMessage] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrorMessage(null);
    if (!title || !body) {
      return setErrorMessage("請輸入文章標題與內容");
    }
    if (!user) {
      return setErrorMessage("請登入後繼續");
    }

    dispatch(editPost(id, title, body)).then((newPostResponse) => {
      if (newPostResponse && newPostResponse.id) {
        history.push(`/post/${newPostResponse.id}`);
      }
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
