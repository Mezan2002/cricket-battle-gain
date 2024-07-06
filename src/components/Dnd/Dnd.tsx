import React, { useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";

type Todo = {
  id: string;
  text: string;
};

const initialTodos: Todo[] = [
  { id: "1", text: "Learn React" },
  { id: "2", text: "Learn TypeScript" },
  { id: "3", text: "Build a Todo App" },
];

const Dnd: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    const updatedTodos = Array.from(todos);
    const [movedTodo] = updatedTodos.splice(source.index, 1);
    updatedTodos.splice(destination.index, 0, movedTodo);

    setTodos(updatedTodos);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-2xl font-bold mb-5">Todo App</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="todos">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="bg-white p-5 rounded shadow-md"
            >
              {todos.map((todo, index) => (
                <Draggable key={todo.id} draggableId={todo.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="p-4 mb-2 bg-gray-200 rounded shadow"
                    >
                      {todo.text}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Dnd;
