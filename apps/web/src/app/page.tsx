import { ArrowRight } from "lucide-react";
import Image from "next/image";

const Home = () => {
  return (
    <div className="px-12 py-4 flex flex-col gap-8">
      <header className="inset-x-0 top-0 z-10">
        <nav className="flex items-center justify-between">
          <span className="font-mono text-4xl font-bold text-primary-500">
            Zap
          </span>
          <a
            href="#"
            className="
              flex items-center gap-2
              bg-primary-500 rounded-full py-3 px-7 border border-black
            "
          >
            Sign Up
            <ArrowRight strokeWidth={1} />
          </a>
        </nav>
      </header>

      <div className="pt-32 pb-14 sm:py-48 bg-cyan-950/50 rounded-3xl relative overflow-hidden text-white">
        <div className="mx-auto max-w-6xl px-12 grid xl:grid-cols-2">
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-sans font-semibold tracking-tight text-zinc-50 leading-tight">
              Send messages (not) privately
            </h1>
            <p className="mt-6 text-lg sm:text-xl leading-8 tracking-tighter">
              Simple, reliable, private messaging and calling for free*,
              available all over the world.
            </p>

            <a
              href="#"
              className="
                flex items-center justify-center gap-2 w-40 text-black
                bg-primary-500 py-3 px-7 mt-24 rounded-full border border-black
              "
            >
              Sign Up
              <ArrowRight strokeWidth={1} />
            </a>
          </div>
        </div>

        <Image
          layout="fill"
          objectFit="cover"
          alt="mountains"
          src={"/trees.jpg"}
          className="absolute -z-10"
        />
      </div>
    </div>
  );
};

export default Home;
