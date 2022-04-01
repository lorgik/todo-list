import style from './Main.module.css';
import {useEffect, useState} from "react";

const Main = () => {
    const [todos, setTodos] = useState(() => {
        const savedTodos = JSON.parse(localStorage.getItem('todos'));
        return savedTodos || [];
    });


    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos])

    const addTodo = (text) => {
        const newTodos = [...todos, { text }];
        setTodos(newTodos);
    };

    const markTodo = (index) => {
        const newTodos = [...todos];
        newTodos[index].isDone = !newTodos[index].isDone;
        setTodos(newTodos);
    }

    const removeTodo = (index) => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    }

    const [value, setValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!value) return;
        addTodo(value);
        setValue('');
    }

    const toDoItems = todos
        .map((todo, index) =>
            <div key={index} className={style.toDoItem}>
                <p style={{textDecoration: todo.isDone ? 'line-through' : ''}}>{index + 1}. { todo.text }</p>
                <span className={style.check} onClick={() => {markTodo(index)}}>&#10004;</span>
                <span className={style.cross} onClick={() => {removeTodo(index)}}>&#10008;</span>
            </div>
        );

    return (
        <div className={style.main}>
            <h2>Напиши свою задачу</h2>
            <div className={style.toDo}>
                <form onSubmit={handleSubmit} className={style.form}>
                    <input onChange={e => {
                        setValue(e.target.value)}
                    } type="text" placeholder='Задача' value={value} autoFocus />
                    <button type='submit'>Добавить</button>
                </form>
                <div className={style.toDoItems}>
                    { toDoItems }
                </div>
            </div>
        </div>
    )
};

export default Main;