import React from "react";
import { Form, Spinner } from "react-bootstrap";
import DatePicker from "react-datepicker";
import bsCustomFileInput from "bs-custom-file-input";
import useForm from "../hooks/useForm";
import { useSelector, useDispatch } from "react-redux";
import { get, update } from "../features/workers/workerActions";
function BasicElements() {
  const dispatch = useDispatch();
  const [abroad, setAbroad] = React.useState(false);
  const [returned, setReturned] = React.useState(false);
  console.log({ abroad, returned });
  const handleAbroad = () => {
    setAbroad(!abroad);
  };
  const handleReturned = () => {
    setReturned(!returned);
  };
  const { workerData, handleInputChange, setWorkerData, handleClearForm } =
    useForm();
  const [dob, setDob] = React.useState(new Date());
  const [contractStart, setContractStart] = React.useState(new Date());
  const [contractEnd, setContractEnd] = React.useState(new Date());

  React.useEffect(() => {
    dispatch(get());
  }, [dispatch]);

  const { worker } = useSelector((state) => ({
    worker: state.worker,
  }));

  const { workerInfo, update_loading } = { ...worker };

  console.log(workerData);

  React.useEffect(() => {
    if (workerInfo) {
      setWorkerData(workerInfo);
    }
  }, [setWorkerData, workerInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("am here");
    if (workerInfo?.id) {
      const id = workerInfo?.id;
      const worker = { ...workerData, returned, abroad };
      dispatch(update({ id, worker }));
    }
    handleClearForm();
  };

  React.useEffect(() => {
    bsCustomFileInput.init();
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Work Profile Edit</h4>
              <p className="card-description">Your working details edit</p>
              <form className="forms-sample" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group>
                      <label htmlFor="exampleInputName1">Full Name</label>
                      <Form.Control
                        type="text"
                        className="form-control"
                        placeholder="enter full name"
                        name="full_name"
                        value={workerData.full_name}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group>
                      <label htmlFor="exampleInputEmail3">Email</label>
                      <Form.Control
                        type="email"
                        className="form-control"
                        placeholder="enter email"
                        name="email"
                        value={workerData.email}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group>
                      <label htmlFor="exampleInputName1">Contact</label>
                      <Form.Control
                        type="text"
                        className="form-control"
                        placeholder="enter contact"
                        name="contact"
                        value={workerData.contact}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group>
                      <label htmlFor="exampleInputEmail3">Nin</label>
                      <Form.Control
                        type="text"
                        className="form-control"
                        placeholder="enter nin"
                        name="nin"
                        value={workerData.nin}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group>
                      <label htmlFor="exampleInputName1">Origin Address</label>
                      <Form.Control
                        type="text"
                        className="form-control"
                        placeholder="enter origin address"
                        name="origin_address"
                        value={workerData.origin_address}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group>
                      <label>Registration Number</label>
                      <Form.Control
                        disabled
                        type="text"
                        className="form-control"
                        placeholder="enter registration number"
                        name="registration_number"
                        value={workerData.registration_number}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group>
                      <label htmlFor="exampleInputName1">
                        Country of Destination
                      </label>
                      <Form.Control
                        type="text"
                        className="form-control"
                        placeholder="enter country of destination"
                        name="country_of_destination"
                        value={workerData.country_of_destination}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="row">
                      <label className="col-sm-3 col-form-label">
                        Countries been to
                      </label>
                      <div className="col-sm-9">
                        <select
                          className="form-control"
                          placeholder="enter countries been to"
                          name="countries_been_to"
                          value={workerData.countries_been_to}
                          onChange={handleInputChange}
                        >
                          <option value="choose">
                            Choose countries you have been to
                          </option>
                          {[
                            "UAE",
                            " Saudi Arabia",
                            "Bahrain",
                            "Oman",
                            "Somalia",
                            "Qatar",
                            "Iraq",
                            "Afganistan",
                            "Mali",
                            "Booking",
                          ].map((c, i) => (
                            <option value="Male" key={i}>
                              {c}
                            </option>
                          ))}
                        </select>
                      </div>
                    </Form.Group>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <Form.Group className="row">
                      <label className="col-sm-3 col-form-label">
                        Contract Start Date
                      </label>
                      <div className="col-sm-9">
                        <DatePicker
                          className="form-control w-100"
                          placeholderText="enter contract start date"
                          name="contract_start_date"
                          selected={contractStart}
                          onChange={(date) => setContractStart(date)}
                          isClearable
                          showYearDropdown
                          scrollableMonthYearDropdown
                          value={workerData.contract_start_date}
                        />
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="row">
                      <label className="col-sm-3 col-form-label">
                        Contract End Date
                      </label>
                      <div className="col-sm-9">
                        <DatePicker
                          className="form-control w-100"
                          placeholderText="enter contract end date"
                          name="contract_end_date"
                          selected={contractEnd}
                          onChange={(date) => setContractEnd(date)}
                          isClearable
                          showYearDropdown
                          scrollableMonthYearDropdown
                          value={workerData.contract_end_date}
                        />
                      </div>
                    </Form.Group>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group>
                      <label htmlFor="exampleInputName1">
                        Employment Company
                      </label>
                      <Form.Control
                        type="text"
                        className="form-control"
                        placeholder="enter employment company"
                        name="employment_company"
                        value={workerData.employment_company}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group>
                      <label htmlFor="exampleInputEmail3">
                        Work Place Address
                      </label>
                      <Form.Control
                        type="text"
                        className="form-control"
                        placeholder="enter work place address"
                        name="work_place_address"
                        value={workerData.work_place_address}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group>
                      <label htmlFor="exampleInputName1">Employer Name</label>
                      <Form.Control
                        type="text"
                        className="form-control"
                        placeholder="enter employer name"
                        name="employer_name"
                        value={workerData.employer_name}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group>
                      <label htmlFor="exampleInputEmail3">
                        Employer Contact
                      </label>
                      <Form.Control
                        type="text"
                        className="form-control"
                        placeholder="enter employer contact"
                        name="employer_contact"
                        value={workerData.employer_contact}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group>
                      <label htmlFor="exampleInputName1">
                        Employer Work Place Address
                      </label>
                      <Form.Control
                        type="text"
                        className="form-control"
                        placeholder="enter employer work place address"
                        name="employer_work_place_address"
                        value={workerData.employer_work_place_address}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group>
                      <label htmlFor="exampleInputEmail3">Employer Email</label>
                      <Form.Control
                        type="email"
                        className="form-control"
                        placeholder="enter employer email"
                        name="employer_email"
                        value={workerData.employer_email}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group>
                      <label htmlFor="exampleInputName1">
                        Employer Company
                      </label>
                      <Form.Control
                        type="text"
                        className="form-control"
                        placeholder="enter employer company"
                        name="employer_company"
                        value={workerData.employer_company}
                        onChange={handleInputChange}
                      />
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
                          value={workerData.date_of_birth}
                        />
                      </div>
                    </Form.Group>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group>
                      <label htmlFor="exampleInputName1">
                        Who Supervised Your Registration
                      </label>
                      <Form.Control
                        type="text"
                        className="form-control"
                        placeholder="enter user"
                        name="user"
                        value={workerData.user}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group>
                      <label htmlFor="exampleInputEmail3">Agency</label>
                      <Form.Control
                        type="text"
                        className="form-control"
                        placeholder="enter agency"
                        name="agency"
                        value={workerData.agency}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </div>
                  <div className="d-flex">
                    <div className="mb-4 ml-4">
                      <div className="form-check">
                        <label className="form-check-label text-muted">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            checked={returned}
                            onChange={handleReturned}
                          />
                          <i className="input-helper"></i>Returned
                        </label>
                      </div>
                    </div>
                    <div className="mb-4 ml-4">
                      <div className="form-check">
                        <label className="form-check-label text-muted">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            checked={abroad}
                            onChange={handleAbroad}
                          />
                          <i className="input-helper"></i>Abroad
                        </label>
                      </div>
                    </div>
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
      </div>
    </div>
  );
}

export default BasicElements;
