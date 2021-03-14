import { lazy, Fragment } from "react";
import { Row, Col } from "antd";
import { withTranslation } from "react-i18next";
import Fade from "react-reveal/Fade";

import * as S from "./styles";

const SvgIcon = lazy(() => import("../../common/SvgIcon"));
const Container = lazy(() => import("../../common/Container"));

const Footer = ({ t }) => {
  const SocialLink = ({ href, src }) => {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        key={src}
        aria-label={src}
      >
        <SvgIcon src={src} width="25px" height="25px" />
      </a>
    );
  };

  return (
    <Fragment>
      <Fade bottom>
        <S.Footer>
          <Container>
            <Row type="flex" justify="space-between"></Row>
            <Row type="flex" justify="space-between">
              <Col lg={10} md={10} sm={12} xs={24}>
                <S.Empty />
                <S.Language>{t("Docufied")}</S.Language>
                <S.Para>
                  Certify your documents on blockchain in a future-proof way.
                  With no point of failure and virtually impossible to hack,
                  eliminate the document fraud risks with Docufied.
                </S.Para>
              </Col>
              <Col lg={8} md={8} sm={12} xs={24}></Col>
              <Col lg={6} md={6} sm={12} xs={24}>
                <S.Empty />
                <S.Title>{t("Quick Links")}</S.Title>
                <S.Large left="true" to="#about">
                  {t("About")}
                </S.Large>
                <S.Large left="true" to="#register">
                  {t("Register")}
                </S.Large>
              </Col>
            </Row>
          </Container>
        </S.Footer>
        <S.Extra>
          <Container border="true">
            <Row
              type="flex"
              justify="space-between"
              align="middle"
              style={{ paddingTop: "3rem" }}
            >
              <S.NavLink to="/">
                <S.LogoContainer>
                  <SvgIcon
                    src="logo.svg"
                    aria-label="homepage"
                    width="101px"
                    height="64px"
                  />
                </S.LogoContainer>
              </S.NavLink>
              <S.FooterContainer>
                <SocialLink href="https://github.com/" src="github.svg" />
                <SocialLink href="https://twitter.com/" src="twitter.svg" />
                <SocialLink
                  href="https://www.linkedin.com/"
                  src="linkedin.svg"
                />
                <SocialLink href="https://github.com/" src="instagram.svg" />
              </S.FooterContainer>
            </Row>
          </Container>
        </S.Extra>
      </Fade>
    </Fragment>
  );
};

export default withTranslation()(Footer);
