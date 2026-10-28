import HomePage from "@/components/home/Home";
import Loader from "@/components/Loader";
import { Suspense } from "react";

export default async function Home() {
  return (
    <Suspense fallback={<Loader />}>
      <HomePage />;
    </Suspense>
  );
}
