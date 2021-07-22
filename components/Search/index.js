import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-dom";
import CustomSearchBox from "./CustomSearchBox";
import CustomHits from "./CustomHits";
import styles from "../../styles/InstantSearch.module.scss";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY
);

export default function Search() {
  return (
    <div className={styles.instantSearch}>
      <InstantSearch
        searchClient={searchClient}
        indexName="first-next-contentful-blog"
      >
        <CustomSearchBox />
        <CustomHits />
      </InstantSearch>
    </div>
  );
}
