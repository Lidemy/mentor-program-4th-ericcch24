import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { getPost } from "../../WebAPI";
import { LoadingContext } from "../../contexts";

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

function Post({ post }) {
  return (
    <PostContainer>
      <PostTitle>{post.title}</PostTitle>
      <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
      <PostBody>{post.body}</PostBody>
    </PostContainer>
  );
}

Post.propTypes = {
  post: PropTypes.object,
};

export default function PostPage() {
  const [post, setPost] = useState(null);
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getPost(id).then((post) => {
      setPost(post[0]);
      setIsLoading(false);
    });
  }, [id, setIsLoading]);

  return <Root>{!isLoading && post ? <Post post={post} /> : ""}</Root>;
}
