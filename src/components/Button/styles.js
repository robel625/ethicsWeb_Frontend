import styled from "styled-components";

export const StyledButton = styled("button").attrs(({ color }) => ({
  // color: color || "#2e186a",
  // backgroundColor: color ? "#2E186A" : "#fff",
}))`
  font-size: 1rem;
  font-weight: 700;
  width: 100%;
  border: 1px solid #edf3f5;
  border-radius: 30px;
  padding: 13px 0;
  cursor: pointer;
  margin-top: 0.625rem;
  max-width: 180px;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 16px 30px rgb(23 31 114 / 20%);
  background-color: #F9A34C;
  color: #fff;
  );  

  &:hover,
  &:active,
  &:focus {
    color: #fff;
    border: 1px solid rgb(255, 130, 92);
    background-color: rgb(255, 130, 92);   

  }
`;
