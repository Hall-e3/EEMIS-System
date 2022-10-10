import React from "react";
import property from "../assets/animations/57997-travelers-find-location.json";
import Lottie from "react-lottie";
import { Container, Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import useForm from "../app/hooks/useForm";
import { register } from "../app/features/auth/authActions";
import { Eye, EyeSlash } from "react-bootstrap-icons";
export default function Register() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [agreeToPolicy, setAgreeToPolicy] = React.useState(false);
  const {
    registerValues,
    handleInputChange,
    showPassword,
    handleShowPassword,
  } = useForm();
  const { auth } = useSelector((state) => ({
    auth: state.auth,
  }));
  const { register_loading, error, isRegistered } = { ...auth };
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: property,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  React.useEffect(() => {
    if (isRegistered) {
      history.push("/login");
    }
  }, [isRegistered]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(registerValues));
  };

  const handleCheck = () => {
    setAgreeToPolicy(!agreeToPolicy);
  };
  return (
    <div>
      <div className="d-flex align-items-center auth px-0">
        <div className="w-400 mx-0">
          {/* <div className="">EEMIS</div> */}
          <Lottie options={defaultOptions} height={800} width={800} />
        </div>
        <div className="row w-100 mx-0 d-flex justify-content-center">
          {/* <div className="col-lg-4 mx-auto"> */}
          <div className="py-5 px-40 px-sm-5">
            <div className="brand-logo d-flex align-items-center">
              <div className="mr-2">
                <div style={{ height: "1%", width: "1%" }}>
                  <img
                    src={require("../assets/images/call-center.png")}
                    alt="logo"
                    height="40"
                    width="10"
                  />
                </div>
              </div>
              <div>
                <h4>EEMIS Agency</h4>
              </div>
            </div>
            <h6 className="font-weight-light">
              Signing up is easy. It only takes a few steps
            </h6>
            <Container>
              <Form className="pt-3" onSubmit={handleSubmit}>
                <div className="form-group">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="enter full name"
                    size="lg"
                    className="form-control form-control-lg"
                    value={registerValues.username}
                    name="username"
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <Form.Label>Contact</Form.Label>
                  <Form.Control
                    type="tex"
                    placeholder="enter contact"
                    size="lg"
                    className="form-control form-control-lg"
                    value={registerValues.contact}
                    name="contact"
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
                    placeholder="enter password"
                    size="lg"
                    className="form-control form-control-lg"
                    value={registerValues.password}
                    name="password"
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <div className="form-check">
                    <label className="form-check-label text-muted">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={agreeToPolicy}
                        onChange={handleCheck}
                      />
                      <i className="input-helper"></i>I agree to all Terms &
                      Conditions
                    </label>
                  </div>
                </div>
                <div className="mt-3">
                  <button
                    disabled={!agreeToPolicy ? true : false}
                    type="submit"
                    className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                  >
                    {register_loading ? (
                      <Spinner
                        animation="border"
                        size="sm"
                        role="status"
                        variant="light"
                      />
                    ) : (
                      "SIGN UP"
                    )}
                  </button>
                </div>
                <div className="text-center mt-4 font-weight-light">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary">
                    Login
                  </Link>
                </div>
              </Form>
            </Container>
          </div>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}
