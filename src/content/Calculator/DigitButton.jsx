import { ACTIONS } from "./Calculator"
import calculator from "./style/Calculator.module.css"

export default function DigitButton({ dispatch, digit }) {
    return (
        <button 
        onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit }})} 
        className={calculator.btn}>
            {digit}
        </button>
    )
}