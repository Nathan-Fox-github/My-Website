import { useState } from "react"
import style from './style/Todo.module.css'

export function NewTodoForm({ onSubmit }) {
    const [newItem, setNewItem] = useState("")

    function handleSubmit(e) {
        e.preventDefault()
        if(newItem === "" ) return

        onSubmit(newItem)

        setNewItem("")
    }

    return <form onSubmit={handleSubmit} className={style.newItemForm}>
        <div className={style.formRow}>
            <label className={style.inputLabel} htmlFor="item">New Item</label>
            <input value={newItem}
                onChange={e => setNewItem(e.target.value)}
                type="text"
                id="item"
            />
            <div className={style.underline}/>
        </div>
    </form>
}