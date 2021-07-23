import { connectSearchBox } from "react-instantsearch-dom";
import { FaSearch } from "react-icons/fa";
import styles from "../../styles/InstantSearch.module.scss";

function SearchBox({ refine }) {
  return (
    <form action="" role="search" className={styles.instantSearch__form}>
      <label htmlFor="algolia_search" className={styles.instantSearch__label}>
        <FaSearch />
      </label>
      <input
        className={styles.instantSearch__input}
        id="algolia_search"
        type="search"
        placeholder="search.."
        onChange={e => refine(e.currentTarget.value)}
      />
    </form>
  );
}

export default connectSearchBox(SearchBox);
