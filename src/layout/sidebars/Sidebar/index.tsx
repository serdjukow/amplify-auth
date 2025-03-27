import React from "react";
import { Drawer } from "@mui/material";
import { useAuthContext, useLayoutContext } from "hooks";
import { HeaderLogo } from "@/layout";
import { AppSections, RoutesArray } from "@/routes";
import SidebarLockButton from "../SidebarLockButton";
import getSectionMenu from "../SidebarSectionMenu";
import SidebarSubmenuLink from "../SidebarSubmenuLink";
import useStyles from "./styles";

const Sidebar: React.FC = () => {
  const { classes, cx } = useStyles();
  const authContext = useAuthContext();
  const layoutContext = useLayoutContext();

  console.log("authContext", authContext);
  console.log(
    "authContext.cognitoUser?.currentGroup.groupID",
    authContext.cognitoUser?.currentGroup.groupID,
  );

  return (
    <Drawer
      className={cx(classes.drawer, {
        [classes.drawerOpen]: layoutContext.menuOpen,
        [classes.drawerClose]: !layoutContext.menuOpen,
      })}
      variant="permanent"
      classes={{
        paper: cx(classes.drawerPaper, {
          [classes.drawerOpen]: layoutContext.menuOpen,
          [classes.drawerClose]: !layoutContext.menuOpen,
        }),
      }}
      onMouseEnter={() =>
        !layoutContext.menuLocked &&
        !layoutContext.menuOpen &&
        layoutContext.setMenuOpen(true)
      }
      onMouseLeave={() =>
        !layoutContext.menuLocked && layoutContext.setMenuOpen(false)
      }
      anchor="left"
    >
      <HeaderLogo layoutType="layout" />

      {!layoutContext.subMenuOpen && <SidebarLockButton />}
      <div className={classes.drawerMenuItems}>
        {RoutesArray.filter(
          (route) =>
            route.section === "general" &&
            route.navigation &&
            (!authContext.cognitoUser ||
              route.groups.includes(
                authContext.cognitoUser.currentGroup.groupID,
              )),
        ).map((route) => (
          <SidebarSubmenuLink
            inSubmenuList={false}
            key={route.key}
            route={route}
            isSubSidebar={false}
          />
        ))}

        {/* ADMIN and OFFICE */}
        {Object.keys(AppSections)
          .filter((sectionKey) =>
            RoutesArray.some(
              (route) =>
                route.section === sectionKey &&
                route.navigation &&
                (!authContext.cognitoUser ||
                  route.groups.includes(
                    authContext.cognitoUser.currentGroup.groupID,
                  )),
            ),
          )
          .map((sectionKey, i) =>
            getSectionMenu(AppSections, RoutesArray, sectionKey, i, false),
          )}
      </div>
    </Drawer>
  );
};

export default Sidebar;
