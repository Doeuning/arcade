import fs from "fs";
import path from "path";

const Home = async () => {
  const filePath = path.join(process.cwd(), "src/components/Game2048.html");
  const htmlContent = fs.readFileSync(filePath, "utf-8");

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

export default Home;
