import HomePage from "@/components/home/Home";
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
