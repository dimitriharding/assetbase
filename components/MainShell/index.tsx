import type { NextPage } from "next";
import { useRouter } from "next/router";
import { AppShell } from "@saas-ui/app-shell";
import {
  Sidebar,
  SidebarSection,
  SidebarToggleButton,
  SidebarOverlay,
  NavGroup,
  NavItem,
} from "@saas-ui/sidebar";
import { PersonaAvatar } from "@saas-ui/react";
import {
  Spacer,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Avatar,
  IconButton,
} from "@chakra-ui/react";
import { ReactElement } from "react";
import {
  HiOutlineSquares2X2,
  HiOutlineRectangleStack,
  HiOutlinePuzzlePiece,
  HiOutlineUserGroup,
  HiOutlineCog6Tooth,
} from "react-icons/hi2";

const MainShell: NextPage<{ children: ReactElement }> = ({ children }) => {
  const router = useRouter();
  // render home page or AppShell
  return (
    <AppShell
      height="100vh"
      sidebar={
        <Sidebar>
          <SidebarSection direction="row">
            Logo
            <Spacer />
            <Menu>
              <MenuButton
                as={IconButton}
                icon={
                  <PersonaAvatar
                    presence="online"
                    size="xs"
                    src="/showcase-avatar.jpg"
                  />
                }
                variant="ghost"
              />
              <MenuList>
                <MenuItem>Sign out</MenuItem>
              </MenuList>
            </Menu>
          </SidebarSection>
          <SidebarSection>
            <NavGroup>
              <NavItem
                icon={<HiOutlineSquares2X2 />}
                label="Dashboard"
                href="/"
                isActive={router.pathname === "/"}
              />
              <NavItem
                icon={<HiOutlineRectangleStack />}
                label="Assets"
                href="/assets"
                isActive={router.pathname.includes("/assets")}
              />
              <NavItem
                icon={<HiOutlinePuzzlePiece />}
                label="Accessories"
                href="accessories"
                isActive={router.pathname.includes("/accessories")}
              />
              <NavItem
                icon={<HiOutlineUserGroup />}
                label="People"
                href="people"
                isActive={router.pathname.includes("/people")}
              />
            </NavGroup>
            {/* Settings Nav Group */}
            <NavGroup
              icon={<HiOutlineCog6Tooth />}
              title="Settings"
              isCollapsible
            >
              <NavItem
                label="Asset Models"
                href="/settings/models"
                isActive={router.pathname.includes("/settings/models")}
              />
              <NavItem
                label="Manufacturers"
                href="/settings/manufacturers"
                isActive={router.pathname.includes("/settings/manufacturers")}
              />
              <NavItem
                label="Categories"
                href="/settings/categories"
                isActive={router.pathname.includes("/settings/categories")}
              />
            </NavGroup>
          </SidebarSection>
        </Sidebar>
      }
    >
      {children}
    </AppShell>
  );
};

export default MainShell;
