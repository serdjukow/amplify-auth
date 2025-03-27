import { FC, ReactNode } from "react";
import { Slide } from "@mui/material";
import { AppRouteArray, NavigationParam } from "types";
import SidebarBackLink from "../SidebarBackLink";
import getSectionMenu from "../SidebarSectionMenu";
import SidebarSubmenuHeader from "../SidebarSubmenuHeader";

type SidebarEntityMenuProps = {
  isEntityRoute: boolean;
  entitySubNavigations: AppRouteArray[];
  backLinkPath?: string;
  backLinkTitle?: string;
  headerTitle: string | undefined;
  headerSubTitle: string | undefined;
  headerIcon: ReactNode;
  headerLink: string;
  params: NavigationParam[];
  entitySections: Record<string, string>;
};

const SidebarEntityMenu: FC<SidebarEntityMenuProps> = ({
  isEntityRoute,
  entitySubNavigations,
  backLinkPath,
  backLinkTitle,
  headerTitle,
  headerSubTitle,
  headerIcon,
  headerLink,
  params,
  entitySections,
}) => {
  const getEntityMenu = () => {
    console.log("entitySubNavigations", entitySubNavigations);

    const entitySubNavigationSections = entitySubNavigations.map(
      (subNavigation) => subNavigation.section,
    );
    const sections = entitySubNavigationSections.filter(
      (section, index) =>
        entitySubNavigationSections.indexOf(section) === index,
    );

    return sections
      .filter((sectionKey) =>
        entitySubNavigations.some(
          (route) => route.section === sectionKey && route.navigation,
        ),
      )
      .map((sectionKey, i) =>
        getSectionMenu(
          entitySections,
          entitySubNavigations,
          sectionKey,
          i,
          true,
          params,
        ),
      );
  };

  if (!isEntityRoute) return null;

  return (
    <Slide direction="right" in={true} mountOnEnter unmountOnExit timeout={700}>
      <div>
        <SidebarSubmenuHeader
          icon={headerIcon}
          link={headerLink}
          title={headerTitle}
          subTitle={headerSubTitle}
        />
        {backLinkPath && backLinkTitle && (
          <SidebarBackLink link={backLinkPath} title={backLinkTitle} />
        )}
        {getEntityMenu()}
      </div>
    </Slide>
  );
};

export default SidebarEntityMenu;
