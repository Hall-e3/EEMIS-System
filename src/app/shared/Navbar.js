import React from "react";
import { Dropdown } from "react-bootstrap";
import { Trans } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
function Navbar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { auth } = useSelector((state) => ({
    auth: state.auth,
  }));
  const { userInfo } = { ...auth };

  function toggleOffcanvas() {
    document.querySelector(".sidebar-offcanvas").classList.toggle("active");
  }
  function toggleRightSidebar() {
    document.querySelector(".right-sidebar").classList.toggle("open");
  }

  return (
    <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
      <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
        <div className="brand-logo d-flex align-items-center">
          <div className="mr-2">
            <img
              src={require("../../assets/images/call-center.png")}
              alt="logo"
              height="40"
              width="40"
            />
          </div>
          <div>
            <h4>EEMIS Agency</h4>
          </div>
        </div>
      </div>
      <div className="navbar-menu-wrapper d-flex align-items-stretch">
        <button
          className="navbar-toggler navbar-toggler align-self-center"
          type="button"
          onClick={() => document.body.classList.toggle("sidebar-icon-only")}
        >
          <span className="mdi mdi-menu"></span>
        </button>
        <div className="search-field d-none d-md-block">
          <form className="d-flex align-items-center h-100" action="#">
            <div className="input-group">
              <div className="input-group-prepend bg-transparent">
                <i className="input-group-text border-0 mdi mdi-magnify"></i>
              </div>
              <input
                type="text"
                className="form-control bg-transparent border-0"
                placeholder="Search projects"
              />
            </div>
          </form>
        </div>
        <ul className="navbar-nav navbar-nav-right">
          <li className="nav-item nav-profile">
            <Dropdown alignRight>
              <Dropdown.Toggle className="nav-link">
                <div
                  className="nav-profile-image d-flex align-items-center justify-content-center text-primary"
                  style={{
                    backgroundColor: "indigo",
                    borderRadius: "50%",
                    padding: "2px 8px 2px 8px",
                  }}
                >
                  <span
                    className="availability-status online bg-black"
                    style={{
                      fontSize: "30px",
                      fontWeight: "bold",
                      color: "#fff",
                    }}
                  >
                    {userInfo?.username.charAt(0)}
                  </span>
                  <span className="login-status online"></span>
                </div>
                <div className="nav-profile-text">
                  {userInfo !== null && userInfo !== undefined ? (
                    <p className="mb-1 text-black">
                      <Trans>
                        {userInfo?.email ? userInfo?.email : userInfo?.username}
                      </Trans>
                    </p>
                  ) : null}
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu className="navbar-dropdown">
                <Dropdown.Item
                  onClick={(evt) => {
                    evt.preventDefault();
                    localStorage.removeItem("auth_token");
                    dispatch(logout());
                    history.push("/login");
                  }}
                >
                  <i className="mdi mdi-logout mr-2 text-primary"></i>
                  <Trans>Log out</Trans>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
