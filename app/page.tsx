"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import profilePic from "../public/layered.png";
import "@fontsource/kaushan-script";
import { BiLink, BiCopy } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [original, setOriginal] = useState<string>("");
  const [copy, setCopy] = useState<string>("");

  const copyHandler = () => {
    navigator.clipboard.writeText(copy);
    toast("Copied to clipboard", {
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      type: "info",
    });
  };

  const ShortenUrl = () => {
    const data = {
      url: original,
    };

    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(`/api/generate?url=${original}`, requestOptions)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        throw new Error(response.status.toString());
      })
      .then((data) => {
        setCopy(data.generated);
        toast("Successfuly shortened!", {
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          type: "success",
        });
      })
      .catch((error) => {
        toast(error.message, {
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          type: "error",
        });
      });
  };

  return (
    <main className="flex min-h-screen">
      <ToastContainer className="p-8" />
      <div className="flex flex-col justify-center items-center md:items-start md:justify-around min-h-screen w-full md:w-9/12 md:p-16">
        <h1
          className="text-[#FA7268] text-8xl mb-6 md:mb-0"
          style={{ fontFamily: "Kaushan Script" }}
        >
          Smallify
        </h1>
        <div>
          <h3 className="text-lg md:text-xl font-bold tracking-wider">
            Paste your long url here:
          </h3>
          <div className="flex flex-col md:flex-row w-64 md:w-fit items-center  h-13 rounded-full mt-6 md:shadow-slate-400	 shadow-sm">
            <BiLink className="ml-0 md:ml-6 w-16" color="#b3b3b3" size={32} />
            <input
              value={original}
              onChange={(e) => setOriginal(e.target.value)}
              className="m-2 md:m-4 w-64 border-none outline-0 shadow-sm shadow-slate-400 md:shadow-none p-4 md:p-0 rounded-full md:rounded-none"
              placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            />
            <button
              onClick={() => ShortenUrl()}
              className="btn pt-4 pb-4 pl-16 pr-16 rounded-full bg-orange-400 hover:bg-orange-500  transition-colors duration-300 ease-in-out text-white"
            >
              Shorten
            </button>
          </div>
          <h3 className="text-lg md:text-xl font-bold tracking-wider mt-6">
            Your Shortened URL:
          </h3>
          <div className="flex flex-col md:flex-row w-64 md:w-fit items-center  h-13 rounded-full mt-2 md:shadow-slate-400	 shadow-sm">
            <BiLink className="ml-0 md:ml-6 w-16" color="#b3b3b3" size={32} />
            <div className="m-2 overflow-hidden text-slate-400 md:m-4 w-64 border-none outline-0 shadow-sm shadow-slate-400 md:shadow-none p-4 md:p-0 rounded-full md:rounded-none">
              <h3 className="truncate w-64">
                {copy ? copy : "Please Generate url"}
              </h3>
            </div>
            <button
              onClick={() => copyHandler()}
              className="link-copy flex items-center justify-center btn pt-4 pb-4 pl-16 pr-16 rounded-full bg-orange-400 hover:bg-orange-500  transition-colors duration-300 ease-in-out text-white"
            >
              <BiCopy size={18} className="mr-1" />
              Copy
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
        <Image priority src={profilePic} alt="bruh" className="w-full h-full" />
      </div>
    </main>
  );
}
