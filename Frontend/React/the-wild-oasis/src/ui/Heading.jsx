import styled, { css } from "styled-components";

const Heading = styled.h1`
  ${(props) => {
    return (
      props.as == "h1" &&
      css`
        font-size: 3rem;
        font-weight: 600;
      `
    );
  }}

  ${(props) => {
    return (
      props.as == "h2" &&
      css`
        font-size: 2rem;
        font-weight: 600;
      `
    );
  }}
    
    ${(props) => {
      return (
        props.as == "h3" &&
        css`
          font-size: 1rem;
          font-weight: 500;
        `
      );
    }};
  }}



  font-size: 23px;
  font-weight: bold;
`;

export default Heading;
