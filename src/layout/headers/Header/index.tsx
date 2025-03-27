import React from "react";
import Breadcrumbs from "../../layouts/Breadcrumbs";
import HeaderContainer from "../HeaderContainer";
import HeaderLeft from "../HeaderLeft";
import HeaderMenu from "../HeaderMenu";
import HeaderRight from "../HeaderRight";

type HeaderProps = {
  layoutType: "layout" | "authLayout";
};

const Header: React.FC<HeaderProps> = ({ layoutType }) => {
  return (
    <HeaderContainer layoutType={layoutType}>
      <HeaderLeft layoutType={layoutType}>
        {layoutType !== "authLayout" && <Breadcrumbs />}
      </HeaderLeft>
      <HeaderRight>
        <HeaderMenu />
      </HeaderRight>
    </HeaderContainer>
  );
};

export default Header;
