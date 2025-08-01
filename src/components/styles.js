import styled from "styled-components";

// export const ContactContainer = styled("div")`
//   padding: 5rem 0;

//   @media only screen and (max-width: 1024px) {
//     padding: 3rem 0;
//   }
// `;

export const FormGroup = styled("div")`
  width: 100%;
  max-width: 520px;

  @media only screen and (max-width: 1045px) {
    max-width: 100%;
    margin-top: 2rem;
  }
`;

export const Span = styled("span")`
  display: block;
  font-weight: 600;
  color: rgb(255, 130, 92);
  height: 0.775rem;
  padding: 0 0.675rem;
`;

export const ButtonContainer = styled("div")`
  text-align: end;
  position: relative;
  margin-bottom: 20px;

  @media only screen and (max-width: 414px) {
    padding-top: 0.75rem;
  }
`;


export const LanguageSwitch = styled("div")`
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  margin: 10px;
  color: #fed287;
  // color: #f9a34c;
  font-size: 20px;

  &:hover,
  &:active,
  &:focus {
    -webkit-transform: scale(1.1);
    -ms-transform: scale(1.1);
    transform: scale(1.1);
  }
`;
