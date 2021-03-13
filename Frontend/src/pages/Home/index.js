import { React, lazy } from "react";

import IntroContent from "../../content/IntroContent.json";
import MiddleBlockContent from "../../content/MiddleBlockContent.json";
import AboutContent from "../../content/AboutContent.json";
import MissionContent from "../../content/MissionContent.json";
import ProductContent from "../../content/ProductContent.json";
import RegisterContent from "../../content/RegisterContent.json";
import LoginForm from "../../components/LoginForm";

// import RegisterForm from "../../components/RegisterForm";
// import ContentBlock from "../../components/ContentBlock";
// import MiddleBlock from "../../components/MiddleBlock";
// import Container from "../../common/Container";

const RegisterForm = lazy(() => import("../../components/RegisterForm"));
const ContentBlock = lazy(() => import("../../components/ContentBlock"));
const MiddleBlock = lazy(() => import("../../components/MiddleBlock"));
const Container = lazy(() => import("../../common/Container"));

const Home = (props) => {
  return (
    <Container>
      <ContentBlock
        type="right"
        first="true"
        title={IntroContent.title}
        content={IntroContent.text}
        button={IntroContent.button}
        icon="home_2.svg"
        id="intro"
      />
      <MiddleBlock
        title={MiddleBlockContent.title}
        content={MiddleBlockContent.text}
        button={MiddleBlockContent.button}
      />
      <ContentBlock
        type="left"
        title={AboutContent.title}
        content={AboutContent.text}
        icon="blockchain.svg"
        id="about"
      />
      <ContentBlock
        type="right"
        title={MissionContent.title}
        content={MissionContent.text}
        icon="product-launch.svg"
        id="mission"
      />

      <ContentBlock
        type="left"
        title={ProductContent.title}
        content={ProductContent.text}
        icon="waving.svg"
        id="product"
      />

      <RegisterForm
        title={RegisterContent.title}
        content={RegisterContent.text}
        id="register"
      />

      <LoginForm visible={props.visible} setVisible={props.setVisible} />
    </Container>
  );
};

export default Home;
