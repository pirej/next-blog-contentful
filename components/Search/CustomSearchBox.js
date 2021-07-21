import { connectSearchBox } from "react-instantsearch-dom";

function SearchBox({ refine }) {
  return (
    <form action="" role="search">
      <label htmlFor="algolia_search">Search </label>
      <input
        id="algolia_search"
        type="search"
        placeholder="type here.."
        onChange={e => refine(e.currentTarget.value)}
      />
    </form>
  );
}

export default connectSearchBox(SearchBox);
