import { useState } from 'react';
import { Todo } from '../content/Todo';
import { Pages } from '../content/Pages';
import '../style/App.css';

export default function App() {
  const [page, changePage] = useState("")

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
    default:
      pageContent = "";
  }

  return (
    <>
      <Pages handlePageChange={handlePageChange} />

      <div className='page-display'>
        {pageContent}
      </div>
    </>
  )
}
