export function TodoItem({ completed, id, title, toggleTodo, deleteTodo}) {
    return (
        <li className='list' key={id}>
            <label>
                <input type='checkbox'
                    checked={completed}
                onChange={e => toggleTodo(id, e.target.checked)}
                />
                {title}
            </label>
            <button onClick={() => deleteTodo(id)} className='btn btn-delete'>Delete</button>
        </li>
    )
}