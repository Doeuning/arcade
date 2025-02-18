import Image from "next/image";
import Game2048 from "@/components/Game2048";
// import Game2048 from "@/components/Game2048_ver1";
// import Game2048 from "@/components/Game2048";
import ExportHtml from "@/pages/exportHtml";
import { StrictMode } from "react";

export default function Home() {
  return (
    <main className="main">
      {
        // <ExportHtml />
        <Game2048 />
      }
    </main>
  );
}
