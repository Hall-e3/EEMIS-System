import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Alert, Container, Form, Spinner } from "react-bootstrap";
import property from "../assets/animations/121421-login.json";
import Lottie from "react-lottie";
import useForm from "../app/hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, login } from "../app/features/auth/authActions";
import { clearError } from "../app/features/auth/authSlice";
import { Eye, EyeSlash } from "react-bootstrap-icons";
export default function Login() {
  const { loginValues, handleInputChange, showPassword, handleShowPassword } =
    useForm();
  const [errorMessage, setErrorMessage] = React.useState(null);
  const [stay, setStay] = React.useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  const { auth } = useSelector((state) => ({
    auth: state.auth,
  }));

  const { login_loading, error, isAuthenticated, userInfo } = { ...auth };
  console.log(error);
  React.useEffect(() => {
    if (isAuthenticated || stay) {
      dispatch(loadUser());
    }
  }, [dispatch, isAuthenticated]);

  React.useEffect(() => {
    if (isAuthenticated) {
      if (userInfo !== null || userInfo !== undefined) {
        history.push("/dashboard");
      } else {
        history.push("/login");
      }
    }
  }, [isAuthenticated, userInfo]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: property,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  React.useEffect(() => {
    if (error) {
      if (error.non_field_errors) {
        setErrorMessage(error.non_field_errors?.toString());
      }
    } else {
      setErrorMessage(null);
    }
  }, [error, setErrorMessage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginValues));
  };
  return (
    <div>
      <div className="col d-flex align-items-center auth px-0">
        <div className="w-100 mx-0">
          {/* <div className="position-absolute tp-0 r-0">EEMIS</div> */}
          <Lottie options={defaultOptions} height={800} width={800} />
        </div>
        <div className="w-100 mx-0 d-flex row justify-content-center">
          {/* <div>love</div> */}
          <div className="py-5 px-4 px-sm-5 w-full">
            <div className="brand-logo d-flex align-items-center">
              <div className="mr-2">
                <img
                  src={require("../assets/images/call-center.png")}
                  alt="logo"
                  height="40"
                  width="10"
                />
              </div>
              <div>
                <h4>EEMIS Agency</h4>
              </div>
            </div>
            <h4>Hello! let's get started</h4>
            <h6 className="font-weight-light">Sign in to continue.</h6>
            {errorMessage && (
              <Alert
                variant="danger"
                onClose={() => dispatch(clearError())}
                dismissible
              >
                {<Alert.Heading>{errorMessage}</Alert.Heading>}
              </Alert>
            )}
            <Container>
              <Form className="pt-3" onSubmit={handleSubmit}>
                <div className="form-group">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="username"
                    size="lg"
                    className="form-control form-control-lg"
                    value={loginValues.username}
                    name="username"
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <div className="d-flex justify-content-between">
                    <Form.Label>Password</Form.Label>
                    <div onClick={handleShowPassword}>
                      {showPassword ? <Eye /> : <EyeSlash />}
                    </div>
                  </div>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    size="lg"
                    className="form-control form-control-lg"
                    value={loginValues.password}
                    name="password"
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mt-3">
                  <button
                    type="submit"
                    className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                  >
                    {login_loading ? (
                      <Spinner
                        animation="border"
                        size="sm"
                        role="status"
                        variant="light"
                      />
                    ) : (
                      "SIGN IN"
                    )}
                  </button>
                </div>
                <div className="my-2 d-flex justify-content-between align-items-center">
                  <div className="form-check">
                    <label className="form-check-label text-muted">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={stay}
                        onChange={() => setStay(!stay)}
                      />
                      <i className="input-helper"></i>
                      Keep me signed in
                    </label>
                  </div>
                  {/* <a
                    href="!#"
                    onClick={(event) => event.preventDefault()}
                    className="auth-link text-black"
                  >
                    Forgot password?
                  </a> */}
                </div>

                <div className="text-center mt-4 font-weight-light">
                  Don't have an account?{" "}
                  <Link to="/register" className="text-primary">
                    Create
                  </Link>
                </div>
              </Form>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
}
