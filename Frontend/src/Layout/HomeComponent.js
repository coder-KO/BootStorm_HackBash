import React, { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Home from "../pages/Home";

export default function HomeComponent() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Header visible={visible} setVisible={setVisible} />
      <Home visible={visible} setVisible={setVisible} />
      <Footer />
    </>
  );
}
