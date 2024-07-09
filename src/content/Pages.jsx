import { PageOption } from "./PageOption";

export function Pages({ handlePageChange }) {
  let pages = ["Home", "Todo", "Calc"];

  return (
    <div className="page-select-container">
      {pages.map(page => {
        return <PageOption handlePageChange={handlePageChange} page={page} key={crypto.randomUUID()} />
      })}
    </div>
  )
}
