import React from "react";
import { Alert, Form, Spinner } from "react-bootstrap";
import DatePicker from "react-datepicker";
import useForm from "../app/hooks/useForm";
import { useSelector, useDispatch } from "react-redux";
import { update_user } from "../app/features/auth/authActions";
export default function Profile() {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => ({
    auth: state.auth,
  }));
  const message = window.localStorage.getItem("profile_wait");

  const { userInfo, update_loading, update_success } = { ...auth };

  const [dob, setDob] = React.useState(null);
  const { profile, handleInputChange, setProfile, handleClearForm } = useForm();

  React.useEffect(() => {
    if (userInfo) {
      setProfile(userInfo);
    }
  }, [setProfile, userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInfo.id) {
      const id = userInfo.id;
      dispatch(update_user({ id, profile }));
    }
    handleClearForm();
  };

  React.useEffect(() => {
    if (update_success) {
      localStorage.setItem(
        "profile_wait",
        JSON.stringify(
          "Thank you for updating your profile, please wait as the ministry creates your worker profile. Thank!"
        )
      );
    }
  }, [update_success]);


  return (
    <div className="col-12 grid-margin">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Your Profile</h4>
          {message && (
            <Alert
              variant="success"
              onClose={() => localStorage.removeItem("profile_wait")}
              dismissible
            >
              {<Alert.Heading>{message}</Alert.Heading>}
            </Alert>
          )}
          <form className="form-sample" onSubmit={handleSubmit}>
            <p className="card-description"> Personal info </p>
            <div className="row">
              <div className="col-md-6">
                <Form.Group>
                  <label htmlFor="exampleInputName1">First Name</label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    placeholder="enter first name"
                    name="first_name"
                    value={profile.first_name}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group>
                  <label htmlFor="exampleInputName1">Username</label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    placeholder="enter username"
                    name="username"
                    value={profile.username}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group>
                  <label htmlFor="exampleInputName1">Contact</label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    placeholder="enter contact"
                    name="contact"
                    value={profile.contact}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group>
                  <label htmlFor="exampleInputName1">Last Name</label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    placeholder="enter last name"
                    name="last_name"
                    value={profile.last_name}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <Form.Group className="row">
                  <label className="col-sm-3 col-form-label">Gender</label>
                  <div className="col-sm-9">
                    <select
                      className="form-control"
                      name="gender"
                      value={profile.gender}
                      onChange={handleInputChange}
                    >
                      <option value="choose">Choose your gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="row">
                  <label className="col-sm-3 col-form-label">
                    Date of Birth
                  </label>
                  <div className="col-sm-9">
                    <DatePicker
                      className="form-control w-100"
                      placeholderText="enter date of birth"
                      name="date_of_birth"
                      selected={dob}
                      onChange={(date) => setDob(date)}
                      isClearable
                      showYearDropdown
                      scrollableMonthYearDropdown
                      value={profile.date_of_birth}
                    />
                  </div>
                </Form.Group>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <Form.Group>
                  <label htmlFor="exampleInputName1">Account Type</label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    placeholder="enter account type"
                    name="account_type"
                    value={profile.account_type}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group>
                  <label htmlFor="exampleInputName1">Email</label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    placeholder="enter email"
                    name="email"
                    value={profile.email}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </div>
            </div>
            <p className="card-description"> More </p>
            <div className="row">
              <div className="col-md-6">
                <Form.Group>
                  <label htmlFor="exampleInputName1">Occupation</label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    placeholder="enter occupation"
                    name="occupation"
                    value={profile.occupation}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group>
                  <label htmlFor="exampleInputName1">Home Address</label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    placeholder="enter home address"
                    name="home_address"
                    value={profile.home_address}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </div>
            </div>
            <button type="submit" className="btn btn-gradient-primary mr-2">
              {update_loading ? (
                <Spinner
                  animation="border"
                  size="sm"
                  role="status"
                  variant="light"
                />
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
