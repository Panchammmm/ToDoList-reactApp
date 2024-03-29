import React, { useState, useEffect } from "react";
import ToDoItem from "./ToDoItem";

function App() {
    const [inputText, setInputText] = useState("");
    const [items, setItems] = useState([]);

    function handleChange(event) {
        const newValue = event.target.value;
        setInputText(newValue);
    }

    function addItem() {
        const trimmedInput = inputText.trim();
        if (trimmedInput !== "") {
            setItems(prevItems => {
                return [...prevItems, trimmedInput];
            });
            setInputText("");
        }
    }

    function deleteItem(id) {
        setItems(prevItems => {
            return prevItems.filter((item, index) => {
                return index !== id;
            });
        });
    }

    function handleKeyPress(event) {
        if (event.key === "Enter") {
            addItem();
        }
    }

    useEffect(() => {
        function handleDeleteKeyPress(event) {
            if (event.key === "Delete" && items.length > 0) {
                setItems(prevItems => {
                    const newItems = [...prevItems];
                    newItems.pop();
                    return newItems;
                });
            }
        }
        document.body.addEventListener("keydown", handleDeleteKeyPress);
        return () => {
            document.body.removeEventListener("keydown", handleDeleteKeyPress);
        };
    }, [items]);

    return (
        <div className="container">
            <div className="heading">
                <h1>To-Do List</h1>
            </div>
            <div className="form">
                <input
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    type="text"
                    value={inputText}
                    placeholder="what to do ?.."
                />
                <button onClick={addItem}>
                    <span>Add</span>
                </button>
            </div>
            <div className="note-items-container">
                <ul>
                    {items.map((todoItem, index) => (
                        <ToDoItem
                            key={index}
                            id={index}
                            text={todoItem}
                            onPressed={deleteItem}
                        />
                    ))}
                </ul>
            </div>

            <p>* tab on items to mark done</p>
        </div>
    );
}

export default App;
