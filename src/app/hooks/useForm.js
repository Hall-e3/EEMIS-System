import React from "react";

const initialLoginValues = {
  username: "",
  password: "",
};

const initialValues = {
  username: "",
  contact: "",
  account_type: "Worker",
  password: "",
};

const restPasswordData = {
  old_password: "",
  new_password: "",
};

const initialWorkerData = {
  //required
  full_name: "",
  //required
  contact: "",
  email: "",
  nin: "",
  origin_address: "",
  registration_number: "",
  //reguired
  country_of_destination: "",
  countries_been_to: "",
  contract_start_date: "",
  contract_end_date: "",
  employment_company: "",
  work_place_address: "",
  employer_name: "",
  employer_contact: "",
  employer_email: "",
  employer_work_place_address: "",
  employer_company: "",
  //required
  date_of_birth: "",
  agency: "",
  user: "",
  returned: "",
  abroad: "",
};

const userDetials = {
  first_name: "",
  last_name: "",
  username: "",
  account_type: "",
  email: "",
  gender: "",
  contact: "",
  password: "",
  occupation: "",
  home_address: "",
  date_of_birth: "",
};

const agencyInitialData = {
  registered_name: "",
  contact: "",
  email: "",
  premises: "",
  registration_number: "",
  no_workers_affiliated: "",
  countries: "",
};

export default function useForm(validateOnChange = false) {
  const [loginValues, setLoginValues] = React.useState(initialLoginValues);
  const [registerValues, setRegisterValues] = React.useState(initialValues);
  const [profile, setProfile] = React.useState(userDetials);
  const [showPassword, setShowPassword] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [values, setValues] = React.useState(userDetials);
  const [agencyData, setAgencyData] = React.useState(agencyInitialData);
  const [workerData, setWorkerData] = React.useState(initialWorkerData);
  const handleInputChange = (e) => {
    e.persist();
    const { value, name } = e.target;

    setLoginValues({
      ...loginValues,
      [name]: value,
    });

    setAgencyData({
      ...agencyData,
      [name]: value,
    });

    setRegisterValues({
      ...registerValues,
      [name]: value,
    });

    setWorkerData({
      ...workerData,
      [name]: value,
    });

    setProfile({
      ...profile,
      [name]: value,
    });

    setValues({
      ...values,
      [name]: value,
    });

    if (validateOnChange) {
      validateLogin({ [name]: value });
    }
  };

  const validateLogin = () => {
    let temp = {};
    if (loginValues) {
      temp.password =
        loginValues.password.length > 6
          ? ""
          : "Password should contains at least 8 characters";
    }
    setErrors({
      ...temp,
    });

    return Object.values(temp).every((x) => x === "");
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleClearForm = () => {
    setRegisterValues(initialValues);
    setLoginValues(initialLoginValues);
    setProfile(initialValues);
    setValues(userDetials);
    setAgencyData(agencyInitialData);
    setWorkerData(initialWorkerData);
  };

  return {
    values,
    loginValues,
    showPassword,
    errors,
    profile,
    registerValues,
    agencyData,
    workerData,
    setWorkerData,
    setAgencyData,
    setProfile,
    validateLogin,
    setErrors,
    handleInputChange,
    handleClearForm,
    handleShowPassword,
  };
}
