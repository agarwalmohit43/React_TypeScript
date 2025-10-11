import React, { useReducer, useState } from "react";

interface TODO_OBJECT {
  id: string;
  title: string;
  isCompleted: boolean;
}

type Action =
  | { type: "add"; payload: { id: string; title: string } }
  | { type: "completed"; payload: { id: string } }
  | { type: "uncompleted"; payload: { id: string } };

const initialValue: TODO_OBJECT[] = [
  { id: "1", title: "List 1", isCompleted: false },
  { id: "2", title: "List 2", isCompleted: true },
];

function reducer(state: TODO_OBJECT[], action: Action): TODO_OBJECT[] {
  switch (action.type) {
    case "add": {
      const { id, title } = action.payload;
      if (!title.trim()) return state;
      return [...state, { id, title, isCompleted: false }];
    }
    case "completed": {
      const { id } = action.payload;
      return state.map((item) =>
        item.id === id ? { ...item, isCompleted: true } : item
      );
    }
    case "uncompleted": {
      const { id } = action.payload;
      return state.map((item) =>
        item.id === id ? { ...item, isCompleted: false } : item
      );
    }
    default:
      return state;
  }
}

const TodoList = () => {
  const [title, setTitle] = useState("");
  const [state, dispatch] = useReducer(reducer, initialValue);

  // ✅ Strongly typed input change event
  const handleInputTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  // ✅ Strongly typed button click event
  const handleAddTodoList = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    dispatch({
      type: "add",
      payload: { id: String(Date.now()), title },
    });
    setTitle("");
  };

  // ✅ Strongly typed checkbox event
  const handleCheckboxToggle = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    dispatch({
      type: e.target.checked ? "completed" : "uncompleted",
      payload: { id },
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <h1>TODO List</h1>
      <div style={{ display: "flex", gap: "8px" }}>
        <input
          placeholder="Add item..."
          value={title}
          onChange={handleInputTitleChange}
          style={{
            padding: "6px 8px",
            border: "1px solid #d1d5db",
            borderRadius: "6px",
            outline: "none",
          }}
        />
        <button
          type="button"
          onClick={handleAddTodoList}
          style={{
            padding: "6px 12px",
            border: "none",
            borderRadius: "6px",
            background: title.length === 0 ? "#9ca3af" : "#2563eb", // gray when disabled
            color: "#fff",
            cursor: title.length === 0 ? "not-allowed" : "pointer",
          }}
          disabled={title.length === 0}
        >
          Add
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {state.map((item) => (
          <label
            key={item.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              userSelect: "none",
            }}
          >
            <input
              type="checkbox"
              checked={item.isCompleted}
              onChange={(e) => handleCheckboxToggle(e, item.id)}
            />
            <span
              style={{
                textDecoration: item.isCompleted ? "line-through" : "none",
              }}
            >
              {item.title}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
