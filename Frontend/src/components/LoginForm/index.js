import { React, useState, useContext } from "react";
import { Modal, Button, Form, Input } from "antd";
// import { Login } from "../../functions/Auth";
import { useHistory } from "react-router-dom";
import { UserContext } from "./../../context/UserContext";
import axios from "./../../helper/axios";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const LoginForm = (props) => {
  const history = useHistory();
  const { userData, setUserData } = useContext(UserContext);
  const [userData2, setUserData2] = useState({
    email: "",
    password: "",
  });
  const [confirmLoading, setConfirmLoading] = useState(false);

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      props.setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    props.setVisible(false);
  };

  const handleChange = (e, xyz) => {
    // setUserData2({
    //     ...userData2,
    //     [e.target.name] : e.target.value
    // });
    console.log(xyz);
  };
  console.log(userData2);

  const Login = async (userData2) => {
    try {
      console.log(userData2);
      //calling the register API
      const returnData = await axios.post("/login", userData2);
      console.log(returnData);
      const token = returnData.data.token;
      localStorage.setItem("auth-token", token);

      setUserData({
        token,
        user: returnData.data.user,
      });
      if (token) {
        history.push("/organisation/dashboard/", { from: "/home" });
      } else {
        console.log("Unauthorized");
      }

      // window.location.href("/organisation/dashboard/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {/* <Button type="primary" onClick={showModal}>
        Open Modal with async logic
      </Button> */}
      <Modal
        title="Login Form"
        visible={props.visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={[
          <Button
            style={{ background: "#008891", color: "#fff" }}
            onClick={() => Login(userData2)}
          >
            Submit
          </Button>,
        ]}
      >
        <Form
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
            value={userData2.email || ""}
            onChange={(e) => {
              setUserData2({ ...userData2, email: e.target.value });
            }}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            value={userData2.password || ""}
            onChange={(e) => {
              setUserData2({ ...userData2, password: e.target.value });
            }}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default LoginForm;
