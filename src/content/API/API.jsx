import YouTube from 'react-youtube';
import youtube from '../../scripts/youtube';
import { VideoOption } from './VideoOption';
import style from './style/API.module.css';
import { useState } from 'react';

export function API() {
    const [options, setOptions] = useState([])
    const [selectedOption, setSelected] = useState(null)

    const opts = {
        height: '780',
        width: '1280',
        playerVars: {
            autoplay: 1,
        },
    };

    function _onReady(event) {
        event.target.pauseVideo();
    }

    function handleSubmit(e) {
        // e.preventDefault()
        // API_call()
    }


    async function API_call() {
        // let termFromSearch = document.search;
        // console.log(termFromSearch);
        // const response = await youtube.get('/search', {
        //     params: {
        //         q: termFromSearch
        //     }
        // })

        // setOptions({
        //     options: response.data.items
        // })
        // console.log("tis the resp: ", response);
    }

    return (
        <div className={style.container}>
            <div className={style.border}>
                <div className={style.content}>
                    <YouTube videoId='M7lc1UVf-VE' opts={opts} onReady={_onReady} />

                    <div className={style.buttonPanel}>
                        <div className={style.left}>
                            <form className={style.search} onSubmit={() => handleSubmit}>
                                <textarea id='search' name='searchbar' form='submitButton'></textarea>
                                <input type='submit'></input>
                            </form>
                        </div>
                        <div className={style.right}>
                            <button className={style.refresh}>REFRESH</button>
                        </div>
                    </div>

                    <VideoOption />
                </div>
            </div>
        </div>
    )
}