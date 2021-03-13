import { React, useState } from "react";
import { Modal, Button, Form, Input } from "antd";
import { Login } from "../../functions/Auth";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const LoginForm = (props) => {
  const[userData, setUserData] = useState({
    email:"",
    password:""
  })
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

  const handleChange = (e,xyz) => {
    // setUserData({
    //     ...userData,
    //     [e.target.name] : e.target.value
    // });
    console.log(xyz);
}
console.log(userData);

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
          <Button style={{ background: "#008891", color: "#fff" }} onClick={() => Login(userData)}>
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
            value={userData.email || ""}
            onChange={(e) => {setUserData({...userData,email:e.target.value})}}
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
            value={userData.password || ""}
            onChange={(e) => {setUserData({...userData,password:e.target.value})}}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default LoginForm;
