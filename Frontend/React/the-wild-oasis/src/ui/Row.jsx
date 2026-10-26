import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;
  gap: 1.2rem;
  ${(props) => {
    if (props.type === "vertical") {
      return css`
        flex-direction: column;
      `;
    }

    if (props.type === "horizontal") {
      return css`
        justify-content: space-between;
        align-items: center;
        gap: 1.6rem;
      `;
    }
  }}
`;

Row.defaultProps = {
  type: "vertical",
};

export default Row;
