import React from "react";
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-between align-items-center px-20">
        <div>
          <Link className="navbar-brand" to="/">
            <h4>EEMIS Agency</h4>
          </Link>
        </div>

        <div>
          <Link to="/login" className="auth-form-btn">
            Login/Register
          </Link>
        </div>
      </nav>
      <div className="content-wrapper d-flex align-items-center auth lock-full-bg h-100">
        <div className="row w-100 align-items-center">
          <div className="col-lg-4 mx-auto">
            <div className="auth-form-transparent text-left p-5 text-center">
              <div>EEMIS Agency welcomes you</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
