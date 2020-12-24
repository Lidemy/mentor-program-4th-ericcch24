import React, { useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination/";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPosts,
  getHomePagePosts,
} from "../../redux/reducers/postReducer";

const Root = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const PostContainer = styled.div`
  border-bottom: 1px solid rgba(0, 12, 34, 0.2);
  padding: 16px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

const PostTitle = styled(Link)`
  font-size: 24px;
  color: #333;
  text-decoration: none;
`;

const PostDate = styled.div`
  color: rgba(0, 0, 0, 0.8);
`;

function Post({ post }) {
  return (
    <PostContainer>
      <PostTitle to={`/post/${post.id}`}>{post.title}</PostTitle>
      <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
    </PostContainer>
  );
}

Post.propTypes = {
  post: PropTypes.object,
};

export default function HomePage() {
  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store.posts.isLoadingPost);
  const posts = useSelector((store) => store.posts.homePagePosts);
  const pageNumberCount = useSelector((store) => store.posts.pageNumberCount);
  const limit = 5;

  useEffect(() => {
    dispatch(getAllPosts(limit));
    dispatch(getHomePagePosts(limit));
  }, [dispatch]);

  return (
    <Root>
      {!isLoading && (
        <>
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
          <Pagination pageNumberCount={pageNumberCount} limit={limit} />
        </>
      )}
    </Root>
  );
}
