"use client";
import path from "path";
import "@/styles/exportHtml.scss";
import { useEffect, useState } from "react";
import game2048JS from "@/utils/game2048.js";

const ExportHtml = () => {
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    const fetchHtml = async () => {
      try {
        const response = await fetch("/api/getHtml");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const text = await response.text();
        setHtmlContent(text);
      } catch (error) {
        console.error("Error fetching HTML:", error);
      }
    };

    fetchHtml();
    game2048JS();
  }, [htmlContent]);

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

export default ExportHtml;
