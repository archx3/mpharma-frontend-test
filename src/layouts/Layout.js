import React         from 'react';
import Aux           from "../higher-order-components/Aux";
import HeaderSection from "../components/HeaderSection/HeaderSection";
import FooterSection from "../components/FooterSection/FooterSection";

const Layout = (props) =>
{
  return (
    <Aux>
      <HeaderSection/>
      <main className="Layout">
        {props.children}
      </main>
      <FooterSection/>
    </Aux>
  );
};

export default Layout;
