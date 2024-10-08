import {
  CreditsResponse,
  TVSerieKeywordsResponse,
  TVSerieRecommendationsResponse,
} from "@/types";
import Carousel from "@components/ui/Carousel";

interface Props {
  tvSerieCredits: CreditsResponse;
  tvSerieRecommendations: TVSerieRecommendationsResponse;
  tvSerieKweywords: TVSerieKeywordsResponse;
}

function RelatedInformationAboutTVSerie({
  tvSerieCredits,
  tvSerieRecommendations,
  tvSerieKweywords,
}: Props) {
  return (
    <section className="px-4 md:px-10 py-2 mt-4 lg:flex">
      <div className="lg:w-2/3 md:space-y-3">
        <div>
          <h3 className="text-xl font-bold md:text-2xl">Reparto</h3>
          <div className="mt-2">
            {tvSerieCredits?.cast && tvSerieCredits.cast.length > 0 ? (
              <Carousel data={tvSerieCredits?.cast} />
            ) : (
              <p>No hay reparto</p>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold md:text-2xl">Recomendaciones</h3>
          <div className="mt-2">
            {tvSerieRecommendations.results.length > 0 ? (
              <Carousel data={tvSerieRecommendations.results} />
            ) : (
              <p>No hay recomendaciones</p>
            )}
          </div>
        </div>
      </div>

      <aside className="lg:w-1/3 lg:pl-4  py-4 shadow-box-shadow-left shadow-box-shadow">
        <h3 className="text-xl font-bold md:text-2xl">Palabras claves</h3>

        <div className="flex w-full flex-wrap justify-start gap-2 mt-2">
          {tvSerieKweywords.results.length > 0 ? (
            tvSerieKweywords?.results.map((keyword) => (
              <div
                key={keyword.id}
                className="bg-gray-300 px-2 py-1 rounded-md"
              >
                <p className="font-semibold text-sm md:font-bold">
                  {keyword.name}
                </p>
              </div>
            ))
          ) : (
            <p>No hay palabras claves</p>
          )}
        </div>
      </aside>
    </section>
  );
}
export default RelatedInformationAboutTVSerie;
