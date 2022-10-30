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
import { ReactElement } from "react";
import {
  HiOutlineSquares2X2,
  HiOutlineRectangleStack,
  HiOutlinePuzzlePiece,
  HiOutlineUserGroup,
} from "react-icons/hi2";

const MainShell: NextPage<{ children: ReactElement }> = ({ children }) => {
  const router = useRouter();
  // render home page or AppShell
  return (
    <AppShell
      height="100vh"
      sidebar={
        <Sidebar breakpoints={{ sm: true }}>
          <SidebarSection>Logo</SidebarSection>
          <SidebarSection>
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
          </SidebarSection>
        </Sidebar>
      }
    >
      {children}
    </AppShell>
  );
};

export default MainShell;
