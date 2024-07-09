import { PageOption } from "./PageOption";
import { pages } from "../../scripts/App"

export function Pages({ handlePageChange }) {
  return (
    <div className="page-select-container">
      {pages.map(page => {
        return <PageOption handlePageChange={handlePageChange} page={page} key={crypto.randomUUID()} />
      })}
    </div>
  )
}
