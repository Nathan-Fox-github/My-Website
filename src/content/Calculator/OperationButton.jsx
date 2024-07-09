import { ACTIONS } from "./Calculator"
import calculator from "./style/Calculator.module.css"

export default function OperationtButton({ dispatch, operation }) {
    return (
        <button 
        onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation }})} 
        className={calculator.btn}>
            {operation}
        </button>
    )
}