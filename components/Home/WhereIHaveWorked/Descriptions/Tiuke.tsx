import React from "react";
import ArrowIcon from "../../../Icons/ArrowIcon";
import { getTasksTextWithHighlightedKeyword } from "./taskAndType";

export default function Tiuke() {
  const tasks = [
    {
      text: "Developed numerous web and mobile applications for the Italian Ministry of Agriculture, including the Graphic File System and Sinfor request system.",
      keywords: ["AngularJS", "TypeScript", "jQuery", "AWS", "Python", "GeoPandas", "Node.js", "SQL", "CloudFront", "DataTables", "Linux", "Bootstrap"],
    },
    {
      text: "Optimized and modernized legacy applications into responsive web applications, ensuring cross-device compatibility and mobile design.",
      keywords: ["responsive design", "mobile-first", "CSS", "Bootstrap", "optimization"],
    },
    {
      text: "Created internal automation tools including a management system for generating pre-configured layers with API services for client applications.",
      keywords: ["SQL", "AngularJS", "DataTables", "OracleDB", "QGIS", "API"],
    },
    {
      text: "Developed a backend system for automatic documentation generation, producing Word, Excel, and PDF files to document application configurations.",
      keywords: ["Python", "documentation", "automation", "backend"],
    },
    {
      text: "Implemented LLM applications with specialized agents for extracting textual and polygonal information from databases, and improved geospatial segmentation models on satellite imagery.",
      keywords: ["LLM", "AI", "PyTorch", "TorchJS", "LLaMA"],
    },
    {
      text: "Created batch scripts for processing large volumes of geospatial data, automatically handling projections and attributes correction.",
      keywords: ["Python", "Node.js", "GeoPandas", "Pandas", "batch processing", "geospatial data"],
    },
];


  return (
    <>
      <div className="flex flex-col space-y-5 max-w-xl px-4 md:px-0">
        <div className="flex flex-col spacey-y-2">
          {/* Title */}
          <span className="text-gray-100 sm:text-lg text-sm font-Arimo tracking-wide">
          Full Stack Software Engineer <span className="text-AAsecondary">@Tiuke</span>
          </span>
          {/* Date */}
          <span className="font-mono text-xs text-gray-500">Oct 2019 - Now</span>
          
        </div>
        <div className="flex flex-col space-y-4 sm:text-sm text-xs">
          {/* Tasks Description 1 */}
          {tasks.map((item, index) => {
            return (
              <div key={index} className="flex flex-row space-x-1">
                <ArrowIcon className={" h-5 w-4 text-AAsecondary flex-none"} />
                <span
                  className="text-gray-500 sm:text-sm text-xs"
                  dangerouslySetInnerHTML={{
                    __html: getTasksTextWithHighlightedKeyword(item.text, item.keywords),
                  }}
                ></span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
