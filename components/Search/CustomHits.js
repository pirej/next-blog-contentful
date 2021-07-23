import Link from "next/link";
import { connectStateResults } from "react-instantsearch-dom";
import styles from "../../styles/InstantSearch.module.scss";

function Hits({ searchState, searchResults }) {
  const validQuery = searchState.query?.length >= 3;

  return (
    <div className={styles.instantSearch__hits}>
      {searchResults?.hits.length === 0 && validQuery && (
        <p className={styles.instantSearch__noResults}>
          Aw snap! No search results were found.
        </p>
      )}
      {searchResults?.hits.length > 0 && validQuery && (
        <ol className={styles.instantSearch__hitsList}>
          {searchResults.hits.map(hit => (
            <li
              key={hit.objectID}
              className={styles.instantSearch__hitsListItem}
            >
              <Link href={`/posts/${hit.slug}`}>
                <a>{hit.title}</a>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

export default connectStateResults(Hits);
