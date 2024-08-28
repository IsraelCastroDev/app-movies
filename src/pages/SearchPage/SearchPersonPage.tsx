import { useLocation } from "react-router-dom";
import { useSearch } from "../../hooks/search/useSearch";
import Loader from "../../components/ui/Loader/Loader";
import { toast } from "react-toastify";
import SearchResults from "../../components/PageComponents/Search/SearchResults";

function SearchPersonPage() {
  const queryParam = useLocation().search;
  const query = queryParam.split("=")[1];

  const { personSearchQuery } = useSearch(query);

  const {
    data: personSearchResult,
    isLoading: isLoadingPersonSearch,
    isError: isErrorPersonSearch,
  } = personSearchQuery;

  if (isLoadingPersonSearch) return <Loader />;
  if (isErrorPersonSearch)
    toast.error("Ocurrió un error al cargar la información");
  if (!personSearchResult) return <p>No se encontró la información</p>;

  return (
    <ul className="flex flex-col gap-4 md:w-2/3">
      {personSearchResult.results.length > 0 ? (
        <SearchResults searchResult={personSearchResult} />
      ) : (
        <div className="h-[calc(100vh-237px)]">
          <p className="text-lg font-bold">No se encontraron resultados.</p>
        </div>
      )}
    </ul>
  );
}
export default SearchPersonPage;
