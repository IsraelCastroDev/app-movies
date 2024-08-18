import { useParams } from "react-router-dom";
import Carousel from "../components/ui/Carousel";
import Loader from "../components/ui/Loader/Loader";
import { toast } from "react-toastify";
import { useMovie } from "../hooks/useMovies";
import { useCredits } from "../hooks/useCredits";
import { useRecommendations } from "../hooks/useRecommendations";

function MoviePage() {
  const { id } = useParams<{ id?: string }>();
  // Asegúrate de que `movieId` sea un número
  const movieId = id ? Number(id) : 0;

  const {
    data: movie,
    isLoading: isLoadingMovie,
    isError: isErrorMovie,
  } = useMovie(movieId);
  const {
    data: credits,
    isLoading: isLoadingCredits,
    isError: isErrorCredits,
  } = useCredits(movieId);
  const {
    data: recommendations,
    isLoading: isLoadingRecommendations,
    isError: isErrorRecommendations,
  } = useRecommendations(movieId);

  if (isLoadingMovie || isLoadingCredits || isLoadingRecommendations)
    return <Loader />;
  if (isErrorMovie || isErrorCredits || isErrorRecommendations)
    return toast.error("No se pudo cargar la información de la película");

  if (!movie) return <p>No se encontró la película</p>;

  const year = new Date(movie.release_date).getFullYear();

  return (
    <>
      <section>
        <div
          className={`bg-center bg-cover bg-no-repeat h-72 relative block`}
          style={{
            backgroundImage: `url("${import.meta.env.VITE_IMAGE_URL}w500${
              movie.backdrop_path
            }")`,
          }}
        >
          <img
            src={`${import.meta.env.VITE_IMAGE_URL}w200${movie.poster_path}`}
            alt={`Poster de ${movie.title}`}
            className="block w-32 h-40 top-1/2 left-1/2 -translate-x-48 -translate-y-1/2 absolute rounded-xl"
          />
        </div>

        <div className="mt-4 px-4">
          <h1 className="text-center text-xl font-bold">
            {movie.title} <span className="font-semibold">({year})</span>
          </h1>

          <div className="mt-2">
            <h3 className="text-lg font-bold">Vista general</h3>

            <div>
              <p className="text-pretty font-semibold mt-2">{movie.overview}</p>
            </div>

            <ol className="grid grid-cols-2 gap-3 mt-4">
              {credits?.crew.slice(0, 4).map((c) => (
                <li key={c.credit_id}>
                  <h3 className="font-black">{c.original_name}</h3>
                  <p>{c.known_for_department}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="px-4 py-2 mt-4 bg-gray-100">
        <h3 className="text-lg font-bold">Reparto</h3>
        <div className="mt-2">
          {credits?.cast && <Carousel data={credits?.cast} />}
        </div>
      </section>

      <section className="px-4 py-2 mt-4">
        <h3 className="text-lg font-bold">Recomendaciones</h3>
        <div className="mt-2">
          {recommendations?.results && (
            <Carousel data={recommendations.results} />
          )}
        </div>
      </section>
    </>
  );
}

export default MoviePage;
