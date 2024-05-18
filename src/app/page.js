import Image from "next/image";
import Game2048 from "@/components/Game2048";

export default function Home() {
  return (
    <main className="main">
      <Game2048 />
    </main>
  );
}
