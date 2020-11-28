import React, { useContext } from "react";
import styled from "styled-components";
import { Link, useLocation, useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts";
import { setAuthToken } from "../../utils";

const HeaderContainer = styled.div`
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding: 0px 32px;
  box-sizing: border-box;
  background: white;
`;

const Brand = styled.div`
  font-size: 32px;
  font-weight: bold;
`;

const NavbarList = styled.div`
  display: flex;
  align-items: center;
  height: 64px;
`;

const Nav = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  box-sizing: border-box;
  width: 100px;
  cursor: pointer;
  color: black;
  text-decoration: none;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }

  ${(props) =>
    props.$active &&
    `
  background: rgba(0,0,0,0.1)
  `};
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;

  ${NavbarList} {
    margin-left: 64px;
  }
`;

export default function Header() {
  const { setUser } = useContext(AuthContext);
  const location = useLocation();
  const history = useHistory();

  const handleLogout = () => {
    setAuthToken("");
    setUser(null);

    if (location.pathname !== "/") {
      history.push("/");
    }
  };

  return (
    <HeaderContainer>
      <LeftContainer>
        <Brand>我的第一個部落格</Brand>
        <NavbarList>
          <Nav to="/" $active={location.pathname === "/"}>
            首頁
          </Nav>
          <Nav to="/about-me" $active={location.pathname === "/about-me"}>
            關於我
          </Nav>
        </NavbarList>
      </LeftContainer>
      <NavbarList>
        {localStorage.token ? (
          <>
            <Nav to="/newpost" $active={location.pathname === "/newpost"}>
              發布文章
            </Nav>
            <Nav onClick={handleLogout}>登出</Nav>
          </>
        ) : (
          <>
            <Nav to="/register" $active={location.pathname === "/register"}>
              註冊
            </Nav>
            <Nav to="/login" $active={location.pathname === "/login"}>
              登入
            </Nav>
          </>
        )}
      </NavbarList>
    </HeaderContainer>
  );
}
