import { ACTIONS } from "../../scripts/App"

export default function DigitButton({ dispatch, digit }) {
    return (
        <button 
        onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit }})} 
        className='calculator-btn'>
            {digit}
        </button>
    )
}