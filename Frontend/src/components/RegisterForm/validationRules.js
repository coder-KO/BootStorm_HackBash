export default function validate(values) {
  let errors = {};
  if (!values.name) {
    errors.name = "Organisation Name is required";
  }
  if (!values.password) {
    errors.name = "Password cannot be empty";
  }
  if (!values.email) {
    errors.email = "Email address is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
  }
  if (!values.message) {
    errors.message = "Description is required";
  }
  return errors;
}
