import fs from "fs";
import path from "path";
import "@/styles/exportHtml.scss";

const ExportHtml = async () => {
  const filePath = path.join(process.cwd(), "src/components/Game2048.html");
  const htmlContent = fs.readFileSync(filePath, "utf-8");

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

export default ExportHtml;
