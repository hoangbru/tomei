import { fetcher } from "@/lib/fetcher";
import { API_KEY, TMDB_API_BASE_URL } from "@/utils/config";
import useSWR from "swr";

type OptionType = {
  path: string;
  params?: string;
  q?: string;
};

export const useGetMovieDetail = ({ path, params = "", q = "" }: OptionType) => {
  const { data, error, isLoading } = useSWR(
    `${TMDB_API_BASE_URL}${path}${params}?api_key=${API_KEY}${q}`,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
  };
};
