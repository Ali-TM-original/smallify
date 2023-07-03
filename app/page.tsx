import Image from "next/image";
import profilePic from "../public/layered.png";
import "@fontsource/kaushan-script";
import { BiLink } from "react-icons/bi";

export default function Home() {
  return (
    <main className="flex min-h-screen">
      <div className="flex flex-col justify-center items-center md:items-start md:justify-around min-h-screen w-full md:w-9/12 md:p-16">
        <h1
          className="text-[#FA7268] text-8xl mb-6 md:mb-0"
          style={{ fontFamily: "Kaushan Script" }}
        >
          Smallify
        </h1>
        <div>
          <h3 className="text-lg md:text-xl font-bold tracking-wider">
            Paste your long url here:{" "}
          </h3>
          <div className="flex flex-col md:flex-row w-64 md:w-fit items-center  h-13 rounded-full mt-6 md:shadow-slate-400	 shadow-sm">
            <BiLink className="ml-0 md:ml-6 w-16" color="#b3b3b3" size={32} />
            <input
              className="m-2 md:m-4 w-64 border-none outline-0 shadow-sm shadow-slate-400 md:shadow-none p-4 md:p-0 rounded-full md:rounded-none"
              placeholder="https://www.youtube.com/"
            />
            <button className="btn pt-4 pb-4 pl-16 pr-16 rounded-full bg-orange-400 hover:bg-orange-500  transition-colors duration-300 ease-in-out text-white">
              Shorten
            </button>
          </div>
        </div>
        <div>
          <p className="order-2 md:order-1 mt-8 md:mt-0">
            &copy; Made with ♡ by
            <span className="text-bold"> Shahzaib Ali</span>.
          </p>
        </div>
      </div>
      <div className="hidden md:block min-h-screen w-3/12">
        <Image src={profilePic} alt="bruh" className="w-full h-full" />
      </div>
    </main>
  );
}
