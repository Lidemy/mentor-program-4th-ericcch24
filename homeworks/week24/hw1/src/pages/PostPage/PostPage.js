import React, { useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link, useParams, useHistory } from "react-router-dom";
import { getPost, deletePost } from "../../redux/reducers/postReducer";
import { useDispatch, useSelector } from "react-redux";

const Root = styled.div`
  width: 60%;
  margin: 0 auto;
`;

const PostContainer = styled.div`
  border: 1px solid #333;
  padding: 10px 15px;
`;

const PostTitle = styled.div`
  font-size: 26px;
`;

const PostDate = styled.div`
  border-bottom: 1px solid #333;
  margin: 10px 0px;
  font-size: 14px;
`;

const PostBody = styled.div`
  word-break: break-word;
  font-size: 18px;
  margin-top: 15px;
`;

const ButtonWrapper = styled.div`
  text-align: right;
  margin-top: 20px;
`;

const DeleteButton = styled.button`
  cursor: pointer;
`;

const EditButton = styled.button`
  cursor: pointer;
  margin-right: 5px;
  padding: 1px;
`;

const EditLink = styled(Link)`
  box-sizing: border-box;
  text-decoration: none;
  color: black;
  padding: 4px 5px;
`;

function Post({ post, handleDelete, user }) {
  return (
    <PostContainer>
      <PostTitle>{post.title}</PostTitle>
      <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
      <PostBody>{post.body}</PostBody>
      {user ? (
        <ButtonWrapper>
          <EditButton>
            <EditLink to={`/edit/${post.id}`}>編輯</EditLink>
          </EditButton>
          <DeleteButton onClick={handleDelete}>刪除</DeleteButton>
        </ButtonWrapper>
      ) : (
        ""
      )}
    </PostContainer>
  );
}

Post.propTypes = {
  post: PropTypes.object,
};

export default function PostPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoading = useSelector((store) => store.posts.isLoadingPost);
  const post = useSelector((store) => store.posts.post);
  const user = useSelector((store) => store.users.user);

  const handleDelete = (e) => {
    e.preventDefault();

    dispatch(deletePost(id)).then(() => {
      history.push("/");
    });
  };

  useEffect(() => {
    dispatch(getPost(id));
  }, [id, dispatch]);

  return (
    <Root>
      {!isLoading && post ? (
        <Post post={post} handleDelete={handleDelete} user={user} />
      ) : (
        ""
      )}
    </Root>
  );
}
