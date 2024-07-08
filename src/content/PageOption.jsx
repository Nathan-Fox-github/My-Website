export function PageOption({ handlePageChange, page }) {
    return (
        <>
            <input type='radio' id={page} name='page-choice' onClick={() => handlePageChange(page)}></input>
            <label className='page-option' htmlFor={page}>
                <h1 className='page-title'>{page}</h1>
            </label>
        </>
    )
}