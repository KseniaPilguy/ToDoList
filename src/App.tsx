// before you start, please read READMe

import { useEffect, useState } from "react";
import { useCallback } from "react";

import toDoList from "./mocks/toDoList";
import boardsList from "./mocks/boardsList";
import { ToDo, Board } from "./types/index";
import {
  Wrapper,
  BoardsContainer,
  BoardTitle,
  BoardContainer,
  ToDoContainer,
  DeleteToDo,
  ToDoTitle,
} from "./styles";

function App() {
  const [boards, setBoadrs] = useState<Board[]>(boardsList);
  const [actions, setAction] = useState<ToDo[]>(toDoList);
  const [currentAction, setCurrentAction] = useState<ToDo | null>(null);

  const checkItemsOnBoard = useCallback((actions) => {
    const filledBoard = boards.map((board) => {
      const isAnySameAction: boolean = actions.some(
        (action: ToDo) => action.board === board.id
      );

      if (isAnySameAction) {
        const filteredArray = actions.filter(
          (action: ToDo) => action.board === board.id
        );
        return { ...board, items: filteredArray };
      }

      return board;
    });

    setBoadrs(filledBoard);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => checkItemsOnBoard(actions), [actions]);

  function dragOverHandler(e: any) {
    e.preventDefault();
  }

  function dragStartHandler(item: ToDo) {
    setCurrentAction(item);
  }
  function dropHandler(board: Board) {
    if (board.id === 1) return;

    const isAnyItemsOnBoard = board.items.length === 0;
    const isNotSameItemOnBoard = board.items.some(
      (action: ToDo) => JSON.stringify(action) !== JSON.stringify(currentAction)
    );

    if (isAnyItemsOnBoard || isNotSameItemOnBoard) {
      setAction(
        actions.map((action: ToDo) =>
          action.id === currentAction?.id
            ? { ...action, board: board.id }
            : action
        )
      );
      checkItemsOnBoard(actions);
    }
  }

  function onHandleDelete(item: ToDo) {
    setAction(
      actions.map((action) =>
        action.id === item.id ? { ...action, board: 1 } : action
      )
    );
  }

  return (
    <Wrapper>
      {boards.map((board) => (
        <BoardsContainer>
          <BoardTitle> {board.title} </BoardTitle>
          <BoardContainer
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={() => dropHandler(board)}
          >
            {board.items.map((item) => (
              <ToDoContainer
                draggable={true}
                onDragStart={(e) => dragStartHandler(item)}
              >
                <ToDoTitle completed={board.title}> {item.title} </ToDoTitle>
                {board.id !== 1 && (
                  <DeleteToDo onClick={(e) => onHandleDelete(item)}>
                    {" "}
                    &#9746;{" "}
                  </DeleteToDo>
                )}
              </ToDoContainer>
            ))}
          </BoardContainer>
        </BoardsContainer>
      ))}
    </Wrapper>
  );
}

export default App;
