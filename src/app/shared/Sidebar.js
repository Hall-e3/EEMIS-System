import React from "react";
import { Link, useLocation, withRouter } from "react-router-dom";
import { Collapse } from "react-bootstrap";
import { Trans } from "react-i18next";
import { useSelector } from "react-redux";
function Sidebar() {
  const location = useLocation();
  const [state, setState] = React.useState({});
  const { auth } = useSelector((state) => ({
    auth: state.auth,
  }));
  const { userInfo } = { ...auth };

  function toggleMenuState(menuState) {
    if (state[menuState]) {
      setState({ [menuState]: false });
    } else if (Object.keys(state).length === 0) {
      setState({ [menuState]: true });
    } else {
      Object.keys(state).forEach((i) => {
        setState({ [i]: false });
      });
      setState({ [menuState]: true });
    }
  }
  React.useEffect(() => {
    if (location !== location) {
      onRouteChanged();
    }
  }, []);

  function onRouteChanged() {
    document.querySelector("#sidebar").classList.remove("active");
    Object.keys(state).forEach((i) => {
      setState({ [i]: false });
    });

    const dropdownPaths = [
      { path: "/apps", state: "appsMenuOpen" },
      { path: "/basic-ui", state: "basicUiMenuOpen" },
      { path: "/advanced-ui", state: "advancedUiMenuOpen" },
      { path: "/worker-form", state: "formElementsMenuOpen" },
      { path: "/tables", state: "tablesMenuOpen" },
      { path: "/maps", state: "mapsMenuOpen" },
      { path: "/icons", state: "iconsMenuOpen" },
      { path: "/worker", state: "chartsMenuOpen" },
      { path: "/user-pages", state: "userPagesMenuOpen" },
      { path: "/ecommerce", state: "ecommercePagesMenuOpen" },
    ];

    dropdownPaths.forEach((obj) => {
      if (isPathActive(obj.path)) {
        setState({ [obj.state]: true });
      }
    });
  }

  function isPathActive(path) {
    return location.pathname.startsWith(path);
  }

  React.useEffect(() => {
    onRouteChanged();

    const body = document.querySelector("body");
    document.querySelectorAll(".sidebar .nav-item").forEach((el) => {
      el.addEventListener("mouseover", function () {
        if (body.classList.contains("sidebar-icon-only")) {
          el.classList.add("hover-open");
        }
      });
      el.addEventListener("mouseout", function () {
        if (body.classList.contains("sidebar-icon-only")) {
          el.classList.remove("hover-open");
        }
      });
    });
  }, []);

  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <ul className="nav">
        <li className="nav-item nav-profile">
          <a
            href="!#"
            className="nav-link"
            onClick={(evt) => evt.preventDefault()}
          >
            <div
              className="nav-profile-image d-flex align-items-center justify-content-center text-success"
              style={{
                backgroundColor: "indigo",
                borderRadius: "50%",
              }}
            >
              <span
                className="availability-status online bg-black text-success"
                style={{ fontSize: "30px", fontWeight: "bold", color: "#fff" }}
              >
                {userInfo?.username.charAt(0)}
              </span>
              <span className="login-status online"></span>
            </div>
            <div className="nav-profile-text">
              {userInfo !== null && userInfo !== undefined ? (
                <>
                  <span className="font-weight-bold mb-2">
                    <Trans>
                      {" "}
                      {userInfo?.email ? userInfo?.email : userInfo?.username}
                    </Trans>
                  </span>
                  <span className="text-secondary text-small">
                    <Trans>{userInfo?.account_type}</Trans>
                  </span>
                </>
              ) : null}
            </div>
            <i className="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
          </a>
        </li>
        <li className={isPathActive("/p") ? "nav-item active" : "nav-item"}>
          <Link className="nav-link" to="/dashboard">
            <span className="menu-title">
              <Trans>Account Profile</Trans>
            </span>
            <i className="mdi mdi-home menu-icon"></i>
          </Link>
        </li>
        {/* <li className={ this.isPathActive('/basic-ui') ? 'nav-item active' : 'nav-item' }>
            <div className={ this.state.basicUiMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('basicUiMenuOpen') } data-toggle="collapse">
              <span className="menu-title"><Trans>Basic UI Elements</Trans></span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-crosshairs-gps menu-icon"></i>
            </div>
            <Collapse in={ this.state.basicUiMenuOpen }>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={ this.isPathActive('/basic-ui/buttons') ? 'nav-link active' : 'nav-link' } to="/basic-ui/buttons"><Trans>Buttons</Trans></Link></li>
                <li className="nav-item"> <Link className={ this.isPathActive('/basic-ui/dropdowns') ? 'nav-link active' : 'nav-link' } to="/basic-ui/dropdowns"><Trans>Dropdowns</Trans></Link></li>
                <li className="nav-item"> <Link className={ this.isPathActive('/basic-ui/typography') ? 'nav-link active' : 'nav-link' } to="/basic-ui/typography"><Trans>Typography</Trans></Link></li>
              </ul>
            </Collapse>
          </li> */}
        <li
          className={
            isPathActive("/worker-form") ? "nav-item active" : "nav-item"
          }
        >
          <div
            className={
              state.formElementsMenuOpen ? "nav-link menu-expanded" : "nav-link"
            }
            onClick={() => toggleMenuState("formElementsMenuOpen")}
            data-toggle="collapse"
          >
            <span className="menu-title">
              <Trans>Worker Profile</Trans>
            </span>
            <i className="menu-arrow"></i>
            <i className="mdi mdi-format-list-bulleted menu-icon"></i>
          </div>
          <Collapse in={state.formElementsMenuOpen}>
            <ul className="nav flex-column sub-menu">
              <li className="nav-item">
                {" "}
                <Link
                  className={
                    isPathActive("/worker-form/profile")
                      ? "nav-link active"
                      : "nav-link"
                  }
                  to="/worker-form/profile"
                >
                  <Trans>Worker Profile</Trans>
                </Link>
              </li>
            </ul>
          </Collapse>
        </li>
        {/* <li
          className={isPathActive("/tables") ? "nav-item active" : "nav-item"}
        >
          <div
            className={
              state.tablesMenuOpen ? "nav-link menu-expanded" : "nav-link"
            }
            onClick={() => toggleMenuState("tablesMenuOpen")}
            data-toggle="collapse"
          >
            <span className="menu-title">
              <Trans>Affiliations</Trans>
            </span>
            <i className="menu-arrow"></i>
            <i className="mdi mdi-table-large menu-icon"></i>
          </div>
          <Collapse in={state.tablesMenuOpen}>
            <ul className="nav flex-column sub-menu">
              <li className="nav-item">
                {" "}
                <Link
                  className={
                    isPathActive("/tables/basic-table")
                      ? "nav-link active"
                      : "nav-link"
                  }
                  to="/tables/basic-table"
                >
                  <Trans>Basic Table</Trans>
                </Link>
              </li>
            </ul>
          </Collapse>
        </li> */}
        {/* <li className={ this.isPathActive('/icons') ? 'nav-item active' : 'nav-item' }>
            <div className={ this.state.iconsMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('iconsMenuOpen') } data-toggle="collapse">
              <span className="menu-title"><Trans>Icons</Trans></span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-contacts menu-icon"></i>
            </div>
            <Collapse in={ this.state.iconsMenuOpen }>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={ this.isPathActive('/icons/mdi') ? 'nav-link active' : 'nav-link' } to="/icons/mdi"><Trans>Material</Trans></Link></li>
              </ul>
            </Collapse>
          </li> */}
        <li
          className={isPathActive("/worker") ? "nav-item active" : "nav-item"}
        >
          <div
            className={
              state.chartsMenuOpen ? "nav-link menu-expanded" : "nav-link"
            }
            onClick={() => toggleMenuState("chartsMenuOpen")}
            data-toggle="collapse"
          >
            <span className="menu-title">
              <Trans>Worker Edit</Trans>
            </span>
            <i className="menu-arrow"></i>
            <i className="mdi mdi-chart-bar menu-icon"></i>
          </div>
          <Collapse in={state.chartsMenuOpen}>
            <ul className="nav flex-column sub-menu">
              <li className="nav-item">
                {" "}
                <Link
                  className={
                    isPathActive("/worker/edit")
                      ? "nav-link active"
                      : "nav-link"
                  }
                  to="/worker/edit"
                >
                  <Trans>Worker Edit</Trans>
                </Link>
              </li>
            </ul>
          </Collapse>
        </li>
        {/* <li className={ this.isPathActive('/user-pages') ? 'nav-item active' : 'nav-item' }>
            <div className={ this.state.userPagesMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('userPagesMenuOpen') } data-toggle="collapse">
              <span className="menu-title"><Trans>User Pages</Trans></span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-lock menu-icon"></i>
            </div>
            <Collapse in={ this.state.userPagesMenuOpen }>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={ this.isPathActive('/user-pages/login-1') ? 'nav-link active' : 'nav-link' } to="/user-pages/login-1"><Trans>Login</Trans></Link></li>
                <li className="nav-item"> <Link className={ this.isPathActive('/user-pages/register-1') ? 'nav-link active' : 'nav-link' } to="/user-pages/register-1"><Trans>Register</Trans></Link></li>
                <li className="nav-item"> <Link className={ this.isPathActive('/user-pages/lockscreen') ? 'nav-link active' : 'nav-link' } to="/user-pages/lockscreen"><Trans>Lockscreen</Trans></Link></li>
              </ul>
            </Collapse>
          </li> */}
        {/* <li className={ this.isPathActive('/error-pages') ? 'nav-item active' : 'nav-item' }>
            <div className={ this.state.errorPagesMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('errorPagesMenuOpen') } data-toggle="collapse">
              <span className="menu-title"><Trans>Error Pages</Trans></span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-security menu-icon"></i>
            </div>
            <Collapse in={ this.state.errorPagesMenuOpen }>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={ this.isPathActive('/error-pages/error-404') ? 'nav-link active' : 'nav-link' } to="/error-pages/error-404">404</Link></li>
                <li className="nav-item"> <Link className={ this.isPathActive('/error-pages/error-500') ? 'nav-link active' : 'nav-link' } to="/error-pages/error-500">500</Link></li>
              </ul>
            </Collapse>
          </li> */}
        {/* <li className={ this.isPathActive('/general-pages') ? 'nav-item active' : 'nav-item' }>
            <div className={ this.state.generalPagesMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('generalPagesMenuOpen') } data-toggle="collapse">
              <span className="menu-title"><Trans>General Pages</Trans></span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-medical-bag menu-icon"></i>
            </div>
            <Collapse in={ this.state.generalPagesMenuOpen }>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={ this.isPathActive('/general-pages/blank-page') ? 'nav-link active' : 'nav-link' } to="/general-pages/blank-page"><Trans>Blank Page</Trans></Link></li>
              </ul>
            </Collapse>
          </li> */}
        {/* <li className="nav-item">
            <a className="nav-link" href="http://bootstrapdash.com/demo/purple-react-free/documentation/documentation.html" rel="noopener noreferrer" target="_blank">
              <span className="menu-title"><Trans>Documentation</Trans></span>
              <i className="mdi mdi-file-document-box menu-icon"></i>
            </a>
          </li> */}
      </ul>
    </nav>
  );
}

export default withRouter(Sidebar);
