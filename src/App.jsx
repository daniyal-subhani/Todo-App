import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  // input text value
  const [input, setInput] = useState("");
  // this array holds all the todos
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("todos"));
    if (items) {
      setTodos(items);
    }
  }, []);

  const handleInputChange = (e) => {
    setInput(e.target.value);
    console.log(input);
    saveToLS();
  };
  const handleSave = () => {
    //  [...todos] should create a new array
    setTodos([...todos, { id: uuidv4(), input }]);
    setInput("");
    saveToLS();
  };

  // The handleDelete function is used to delete a todo item from the todos list. Here’s how it works:

  // It takes an id as a parameter. This id is the unique identifier of the todo item that you want to delete.
  // setTodos(todos.filter((todo) => todo.id !== id)) is used to update the todos state.
  // The filter function is used to create a new array with all elements that pass the test implemented by the provided function. In this case, it creates a new array that includes all todos except the one with the id that you passed to handleDelete.
  // So, after this function is executed, the todos state will be updated to a new array that doesn’t include the todo item with the id that you passed to handleDelete.
  // This way, you can delete a specific todo item from the todos list by its id.
  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    console.log(id);
    saveToLS();
  };

  const handleEdit = (id) => {
    // Find the todo that the user wants to edit
    const todoToEdit = todos.find((todo) => todo.id === id);

    // Set the edit input to the todo's text
    setInput(todoToEdit.input);

    // Remove the todo that the user wants to edit from the todos state
    setTodos(todos.filter((todo) => todo.id !== id));
    saveToLS();
  };

  const handleCheckbox = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
      )
    );
    saveToLS();
  };
  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };
  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  return (
    <>
      {/* navbar => import from navbar.jsx */}
      <Navbar />
      {/* parent div that holds all the data */}
      <div
        className="bg-violet-100 md:container  md:w-[35%] md:mx-auto  min-h-[80vh]  mx-3 my-5 p-5
       rounded-lg  "
      >
        <h1 className="font-bold text-3xl text-center ">
          iTask - Manage your todos at one place
        </h1>
        <div className="flex flex-col my-5 gap-4">
          <h2 className="font-bold text-2xl my-4">Add a Todo</h2>
          <div className="flex">
            <input
              className="rounded-full  mx-auto w-full px-5 py-1"
              type="text"
              value={input}
              onChange={handleInputChange}
            />
            <button
              onClick={handleSave}
              disabled={input.length <= 3}
              className="bg-violet-600 disabled:bg-violet-800 rounded-full mx-2 p-4 py-2 cursor-pointer  text-sm text-white"
            >
              save
            </button>
          </div>
        </div>
        <input
          onChange={toggleFinished}
          className="my-4"
          type="checkbox"
          name=""
          id="this"
          checked={showFinished}
        />
        <label className="mx-2" htmlFor="this">
          Show Checked
        </label>
        <div className="w-[90%] h-[1px] opacity-15 bg-black mx-auto my-2"></div>
        <h2 className="font-bold text-2xl my-4">Your Todos</h2>

        <div className="todos">
          {todos.length === 0 && <div>No Todos to Display</div>}
          {/* this function store todos in a line one by one  */}
          {todos.map((item) => {
            return (
              (showFinished || !item.isComplete) && (
                <div key={item.id} className="todo flex my-3 justify-between">
                  <div className="flex gap-5">
                    <input
                      onClick={() => handleCheckbox(item.id)}
                      type="checkbox"
                      name=""
                      id=""
                      checked={item.isComplete}
                    />
                    <div className={item.isComplete ? "line-through" : ""}>
                      {item.input}
                    </div>
                  </div>
                  <div className="buttons">
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="bg-violet-600 rounded-md text-white mx-2 px-2 py-1"
                    >
                      edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-violet-600 rounded-md text-white mx-2 px-2 py-1"
                    >
                      delete
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
