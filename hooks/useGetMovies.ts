import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";

type OptionType = {
  path: string;
  params?: string;
  q?: string;
};

export const useGetMovies = ({ path, params = "", q = "" }: OptionType) => {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}${path}${params}${q}`,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
  };
};
