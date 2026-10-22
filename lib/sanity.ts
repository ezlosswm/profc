import { client } from "@/sanity/lib/client";

export async function sanityFetch<T>({
  query,
  params = {},
  errorMessage = "Sanity query failed",
  revalidate = 30,
}: {
  query: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: Record<string, any>;
  errorMessage?: string;
  revalidate?: number;
}): Promise<T | null> {
  try {
    const response = await client.fetch<T>(query, params, {
      next: { revalidate: revalidate },
    });

    return response;
  } catch (error) {
    console.error(`${errorMessage}: `, (error as Error).message);
    return null;
  }
}
