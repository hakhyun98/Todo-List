import { React, useState, useEffect, useCallback } from "react";
import ThemeContext from "./ThemeContext";
import MainContent from "./MainContent";

export default function TodoList() {

    const [todo, setTodo] = useState("");
    const [todoList, setTodoList] = useState([]);
    const [theme, setTheme] = useState('light');

    const toggleTheme = useCallback(() => {
        if (theme === 'light') {
            setTheme('dark');
        } else if (theme === 'dark') {
            setTheme('light');
        }
    }, [theme]);

    useEffect(() => {
        const todoList = localStorage.getItem("todoList");
        if (todoList) {
            setTodoList(JSON.parse(todoList));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("todoList", JSON.stringify(todoList));
    }, [todoList]);

    const onChange = (event) => {
        setTodo(event.target.value)
    };

    const onSubmit = (event) => {
        if (todoList.includes(todo)) {
            event.preventDefault();
            alert("이미 등록된 할 일입니다.");
            setTodo("");
            return;
        } else {
            event.preventDefault();
            if (todo === "") {
                alert("할 일을 입력해주세요.");
                return;
            }
            setTodo("");
            setTodoList((currentArray) => [todo, ...currentArray]);
        }
    };

    const onDel = (index) => {
        const items = [...todoList];
        items.splice(index, 1);
        setTodoList(items);
    };


    const onKeyDown = (event) => {
        if (event.key === 'Enter' && !event.nativeEvent.isComposing) {
            onSubmit(event);
        }
    };

    return (
        <div>
            <h1>Todo List</h1>
            <form onSubmit={onSubmit}>
                <div>할일:
                    <input type="text" value={todo} onChange={onChange} onKeyDown={onKeyDown} />
                    <button type="submit" onClick={onSubmit}>추가</button>
                    
                </div>
            </form>
            <hr />
            <fieldset>
                <legend>할 일 목록</legend>
                {todoList.length === 0 ? (
                    <li>해야 할 일이 없습니다</li>
                ) : (
                    <ul>
                        {todoList.map((item, index) => (
                            <li key={index}>
                                {item}
                                <button onClick={() => onDel(index)}>삭제</button>
                            </li>
                        ))}
                    </ul>
                )}
            </fieldset>
        </div>
    );
}