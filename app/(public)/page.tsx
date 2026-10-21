import { Metadata } from "next";
import HomePage from "@/components/Home";
import Loader from "@/components/Loader";
import { Suspense } from "react";

async function Home() {
  return (
    <Suspense fallback={<Loader />}>
      <HomePage />;
    </Suspense>
  );
}

export default Home;
