import { useState } from 'react';
import { Todo } from '../content/Todo';
import '../style/App.css';

export default function App() {
  const [page, changePage] = useState("")

  function handlePageChange(page) {
    changePage(() => {
      return page
    })
  }

  let pageContent;
  switch (page) {
    case "page 1":
      pageContent = <h1>Page 1</h1>;
      break;
    case "Todo":
      pageContent = <Todo/>
      break;
    default:
      pageContent = "";
  }

  return (
    <>
      <div className='page-select-container'>
        <input type='radio' id='option-1' name='page-choice' onClick={() => handlePageChange("page 1")}></input>
        <label className='page-option' id='page-option-1' htmlFor='option-1'>
          <h1 className='page-title'>Page</h1>
        </label>
        <input type='radio' id='option-2' name='page-choice' onClick={() => handlePageChange("Todo")}></input>
        <label className='page-option' id='page-option-2' htmlFor='option-2'>
          <h1 className='page-title'>Page</h1>
        </label>
      </div>

      <div className='page-display'>
        {pageContent}
      </div>


    </>
  )
}
