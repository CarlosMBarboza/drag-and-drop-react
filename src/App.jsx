import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useEffect, useState } from "react";

const initialTodos = JSON.parse(localStorage.getItem("todos")) || [
  { id: 1, title: "Aprender React.js " },
  { id: 2, title: "Aprender Next.js" },
  { id: 3, title: "Aprender Gatsby.js" }
];


const App = () => {
  const [todos, setTodos] = useState(initialTodos);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const starIndex = result.source.index;
    const endIndex = result.destination.index;

    const copyArray = [...todos]; // copia del array
    const [removed] = copyArray.splice(starIndex, 1); // remueve el elemento del array
    copyArray.splice(endIndex, 0, removed); // agrega el elemento en la posicion final
    setTodos(copyArray); // actualiza el estado
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <h1>Todo app</h1>
      <Droppable droppableId="todos">
        {(DroppableProvider) => (
          <ul
            ref={DroppableProvider.innerRef}
            {...DroppableProvider.droppableProps}
          >
            {todos.map((todo, index) => (
              <Draggable 
              index={index} 
              key={todo.id} 
              draggableId={`${todo.id}`}
              >
                {
                  (draggableProvider ) => (
                    <li ref={draggableProvider.innerRef}
                    {...draggableProvider.draggableProps}
                    {...draggableProvider.dragHandleProps}
                    >{todo.title}</li>
                    )
                }
              </Draggable>
            ))}
            {DroppableProvider.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default App;
