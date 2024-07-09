import style from './style/Todo.module.css'

export function TodoItem({ completed, id, title, toggleTodo, deleteTodo}) {
    return (
        <li className={style.list} key={id}>
            <label className={style.itemLabel}>
                <input type='checkbox'
                    checked={completed}
                onChange={e => toggleTodo(id, e.target.checked)}
                />
                {title}
            </label>
            <button onClick={() => deleteTodo(id)} className={style.btnDelete}>Delete</button>
        </li>
    )
}