import { lazy } from "react";

import IntroContent from "../../content/IntroContent.json";

const ContentBlock = lazy(() => import("../../components/ContentBlock"));
const Container = lazy(() => import("../../common/Container"));

const Home = () => {
  return (
    <Container>
      <ContentBlock
        type="right"
        first="true"
        title={IntroContent.title}
        content={IntroContent.text}
        button={IntroContent.button}
        icon="home_main.svg"
        id="intro"
      />
    </Container>
  );
};

export default Home;
