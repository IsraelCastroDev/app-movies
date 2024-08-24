import { z } from "zod";
import {
  PersonSchema,
  MovieSchema,
  CastMemberSchema,
  MovieCreditsAPIResponse,
  CreditsAPIResponse,
  RecommendedMovieAPIResponse,
  KeyWordsSchemaAPIResponse,
  VideoSchema,
  MultiAPIResponse,
  TVSeriesSchema,
  KeywordSchema,
} from "../schemas/movieSchema";

export type Movie = z.infer<typeof MovieSchema>;
export type CastMember = z.infer<typeof CastMemberSchema>;
export type MovieCredits = z.infer<typeof MovieCreditsAPIResponse>;
export type CreditsResponse = z.infer<typeof CreditsAPIResponse>;
export type RecommendationsResponse = z.infer<
  typeof RecommendedMovieAPIResponse
>;
export type KeywordsResponse = z.infer<typeof KeyWordsSchemaAPIResponse>;

// person
export type Person = z.infer<typeof PersonSchema>;

// video
export type Video = z.infer<typeof VideoSchema>;

export type Multi = z.infer<typeof MultiAPIResponse>;
export type TVSerie = z.infer<typeof TVSeriesSchema>;
export type Keyword = z.infer<typeof KeywordSchema>;

export type SearchResult = Movie | Person | TVSerie;
