import { useEffect, useRef, useState } from "react";
import { connectSearchBox } from "react-instantsearch-dom";
import { FaSearch } from "react-icons/fa";
import styles from "../../styles/InstantSearch.module.scss";

function SearchBox({ refine }) {
  const ref = useRef();
  const [newSearch, setNewSearch] = useState("");

  useEffect(e => {
    const checkIfClickedOutside = e => {
      // clear If the clicked target is not within the form,
      if (ref.current && !ref.current.contains(e.target)) {
        setNewSearch("");
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, []);

  return (
    <form
      action=""
      role="search"
      autoComplete="off"
      className={styles.instantSearch__form}
    >
      <label htmlFor="algolia_search" className={styles.instantSearch__label}>
        <FaSearch />
      </label>
      <input
        ref={ref}
        className={styles.instantSearch__input}
        id="algolia_search"
        type="search"
        value={newSearch}
        accessKey="r"
        placeholder="search.."
        onChange={e => {
          refine(e.currentTarget.value);
          setNewSearch(e.currentTarget.value);
        }}
      />
      <button className={styles.close_icon} accessKey="r" type="reset"></button>
    </form>
  );
}

export default connectSearchBox(SearchBox);
