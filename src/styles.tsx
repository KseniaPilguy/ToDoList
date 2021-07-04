import styled, { css } from "styled-components";

type ToDoTitleProps = {
  completed: string;
};

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 80%;
  margin: 50px auto 0;
`;

export const BoardTitle = styled.div`
  font-size: 20px;
  text-transform: uppercase;
  font-family: cursive;
  margin-bottom: 15px;
`;

export const BoardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const BoardContainer = styled.div`
  margin: 0 20px;
  width: 250px;
  border: 0.5px solid black;
  height: 300px;
`;

export const ToDoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 30px 25px;
  border-bottom: 0.5px solid grey;
  padding-bottom: 5px;
  cursor: pointer;

  &:hover {
    border-bottom: 0.5px solid black;
  }
`;

export const DeleteToDo = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export const ToDoTitle = styled.div<ToDoTitleProps>`
  font-size: 18px;
  font-style: oblique;
  ${({ completed }: ToDoTitleProps) => {
    switch (completed) {
      case "Done":
        return css`
          color: green;
        `;
      case "Failed":
        return css`
          color: red;
        `;
      default:
        return css`
          color: black;
        `;
    }
  }};
`;
