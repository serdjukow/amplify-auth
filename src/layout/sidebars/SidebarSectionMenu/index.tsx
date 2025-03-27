import { AppRouteArray, NavigationParam } from "types";
import SidebarSubmenu from "../SidebarSubmenu";
import SidebarSubmenuLink from "../SidebarSubmenuLink";
import SidebarSubmenuList from "../SidebarSubmenuList";

const getSectionMenu = (
  sections: Record<string, string>,
  children: AppRouteArray[],
  sectionKey: string,
  index: number | string,
  isSubSidebar: boolean,
  params?: NavigationParam[],
) => (
  <SidebarSubmenu
    key={index}
    submenuTitle={sections[sectionKey]}
    isSubSidebar={isSubSidebar}
  >
    {children
      .filter((route) => route.section === sectionKey && route.navigation)
      .map((route, i) => {
        if (
          route.children.length &&
          route.children.some((subNavigation) => subNavigation.navigation)
        ) {
          return (
            <SidebarSubmenuList
              key={i}
              route={route}
              isSubSidebar={isSubSidebar}
            >
              {route.children
                .filter((subRoute) => subRoute.navigation)
                .map((subRoute, j) => (
                  <SidebarSubmenuLink
                    key={i + " " + j}
                    inSubmenuList={true}
                    route={subRoute}
                    params={params}
                    isSubSidebar={isSubSidebar}
                  />
                ))}
            </SidebarSubmenuList>
          );
        }

        return (
          <SidebarSubmenuLink
            key={i}
            inSubmenuList={false}
            route={route}
            params={params}
            isSubSidebar={isSubSidebar}
          />
        );
      })}
  </SidebarSubmenu>
);

export default getSectionMenu;
