import Image from "next/image";
// import Game2048 from "@/components/Game2048";
import Page from "@/pages/home";
import { StrictMode } from "react";

export default function Home() {
  return (
    <main className="main">
      {
        <Page />
        /* <Game2048 /> */
      }
    </main>
  );
}
