import style from "./style/Pages.module.css";

export function PageOption({ handlePageChange, page, checked }) {
    return (
        <>
            <input checked={checked === page} type='radio' id={page} name={page} onClick={() => handlePageChange(page)}></input>
            <label className={style.pageOption} htmlFor={page}>
                <h1 className={style.pageTitle}>{page}</h1>
                <span className={style.line} />
            </label>
        </>
    )
}