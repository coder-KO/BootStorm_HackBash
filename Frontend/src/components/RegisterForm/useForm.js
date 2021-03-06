import { useState, useEffect } from "react";
import { notification } from "antd";
import axios from "axios";

const useForm = (validate) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [shouldSubmit, setShouldSubmit] = useState(false);

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Success",
      description: "User Registered Successfully!",
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validate(values));
    console.log(values)
    // Your url for API
    const url = "http://localhost:5000/users/register";

    if (Object.keys(values).length !== 0) {
      axios
        .post(url, {
          ...values
        })
        .then(() => {
          setShouldSubmit(true);

        })
        .catch(err => {
          console.log(err)
        });
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && shouldSubmit) {
      setValues("");
      openNotificationWithIcon("success");
    }
  }, [errors, shouldSubmit]);

  const handleChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
    setErrors((errors) => ({ ...errors, [event.target.name]: "" }));
  };

  console.log(values);


  return {
    handleChange,
    handleSubmit,
    values,
    errors,
  };
};

export default useForm;
