import style from "./style/API.module.css";
import youtube from '../../scripts/youtube';
import { useState } from 'react';

export function ButtonPanel( { setOptions } ) {
    const [inputValue, setInputValue] = useState('');

    function handleAmountChange(e) {
        e.preventDefault()
        youtube.defaults.params.maxResults = e.target.value;
    }
    
    function handleInputChange(e) {
        setInputValue(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        API_call()
    }
    
    async function API_call() {
        const response = await youtube.get('/search', {
            params: {
                'q': inputValue
            }
        })

        setOptions(Array(response.data.items))
    }

    return (
        <div className={style.buttonPanel}>
            <div className={style.left}>
                <form id="submitButton" className={style.searchForm} onSubmit={handleSubmit}>
                    <input type="text" value={inputValue} className={style.textInput} onChange={handleInputChange} form='submitButton' placeholder='Search'></input>
                    <input type='submit' className={style.btnInput}></input>
                </form>
            </div>
            <div className={style.right}>
                <form>
                    <input type='number' min="1" max="20" defaultValue="5" className={style.amountBtn} placeholder="Videos" onChange={handleAmountChange} />
                </form>
            </div>
        </div>
    )
}