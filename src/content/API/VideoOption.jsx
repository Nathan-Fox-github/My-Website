import style from './style/API.module.css';

export function VideoOption({ video, handleSelection }) {
    let data = video;
    
    return (
        <div className={style.choice}>
            <input id={data.id.videoId} type='radio' onChange={e => handleSelection(data.id.videoId)} className={style.videoOption} />
            <label className={style.optionSelect} htmlFor={data.id.videoId}>
                <div className={style.thumbnailContainer}>
                    <img className={style.thumbnail} alt="NO THUMBNAIL" src={data.snippet.thumbnails.default.url}></img>
                </div>
                <div className={style.optionText}>
                    <h2 className={style.header}>{data.snippet.title}</h2>
                </div>
            </label>
        </div>
    )
}