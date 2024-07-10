import { useState } from 'react';
import { Pages } from '../content/Pages/Pages';
import { Todo } from '../content/Todo/Todo';
import { Calculator } from '../content/Calculator/Calculator';
import { API } from '../content/API/API';
import '../style/App.css';

export let pages = ["Home", "Todo", "Calc", "API"];

export default function App() {
  const [page, changePage] = useState("Home")

  function handlePageChange(page) {
    changePage(page)
  }

  let pageContent;
  switch (page) {
    case 'Home':
      pageContent = <h1>Home</h1>;
      break;
    case 'Todo':
      pageContent = <Todo />
      break;
    case 'Calc':
      pageContent = <Calculator />
      break;
    case 'API':
      pageContent = <API />
      break;
    default:
      pageContent = "";
  }


  return (
    <>
      <Pages handlePageChange={handlePageChange} checked={page} />

      <div className='page-display'>
        {pageContent}
      </div>
    </>
  )
}
