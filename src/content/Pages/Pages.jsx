import { PageOption } from "./PageOption";
import { pages } from "../../scripts/App";
import style from "./style/Pages.module.css";

export function Pages({ handlePageChange, checked }) {
  return (
    <div className={style.pageSelectContainer}>
      {pages.map(page => {
        return <PageOption checked={checked} handlePageChange={handlePageChange} page={page} key={crypto.randomUUID()} />
      })}
    </div>
  )
}
