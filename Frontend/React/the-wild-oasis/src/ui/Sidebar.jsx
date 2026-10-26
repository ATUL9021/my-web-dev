import styled from "styled-components";
import Logo from "../ui/Logo";
import MainNav from "../ui/MainNav";
function Sidebar() {
  return (
    <StyledSideBar>
      <Logo />
      <MainNav></MainNav>
    </StyledSideBar>
  );
}

const StyledSideBar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  grid-row: 1/-1;
`;

export default Sidebar;
