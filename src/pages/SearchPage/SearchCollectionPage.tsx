import { useLocation } from "react-router-dom";
import { useSearch } from "../../hooks/search/useSearch";
import { Movie, Person, SearchResult } from "../../types";
import Loader from "../../components/ui/Loader/Loader";
import { toast } from "react-toastify";
import SearchResults from "../../components/Search/SearchResults";

function SearchCollection() {
  const queryParam = useLocation().search;
  const query = queryParam.split("=")[1];

  const { collectionSearchQuery } = useSearch(query);

  const {
    data: collectionSearchResult,
    isLoading: isLoadingCollectionSearch,
    isError: isErrorCollectionSearch,
  } = collectionSearchQuery;

  const isMovie = (item: SearchResult): item is Movie => {
    return "original_title" in item; // devuelve true o false
  };

  const isPerson = (item: SearchResult): item is Person => {
    return "profile_path" in item;
  };

  if (isLoadingCollectionSearch) return <Loader />;
  if (isErrorCollectionSearch)
    toast.error("Ocurrió un error al cargar la información");
  if (!collectionSearchResult) return <p>No se encontró la información</p>;

  return (
    <ul className="flex flex-col gap-4 md:w-2/3">
      {collectionSearchResult.results.length > 0 ? (
        <SearchResults
          searchResult={collectionSearchResult}
          isMovie={isMovie}
          isPerson={isPerson}
        />
      ) : (
        <div className="h-[calc(100vh-237px)]">
          <p className="text-lg font-bold">No se encontraron resultados.</p>
        </div>
      )}
    </ul>
  );
}
export default SearchCollection;
