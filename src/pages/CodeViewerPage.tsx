"use client";

import CodeViewer from "@/components/CodeViewer";
import FileTree from "@/components/FileTree";
import { useEffect, useState } from "react";
import { repoEndpoints } from "@/data/network/repo.ts";
import { formatRepoName } from "@/lib/utils.ts";
import type { FileNode } from "@/data/models/repo.ts";

// const files = [
//   { name: "index.tsx", type: "file" },
//   { name: "App.tsx", type: "file" },
//   {
//     name: "components",
//     type: "folder",
//     children: [
//       { name: "CodeViewer.tsx", type: "file" },
//       { name: "Sidebar.tsx", type: "file" },
//     ],
//   },
// ];

export default function CodeViewerPage() {

  const repo = new URLSearchParams(window.location.search).get("repo");

  const [fileTree, setFileTree] = useState<FileNode | FileNode[] | undefined>()
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string>("");
  const [language, setLanguage] = useState<string>("javascript");

  useEffect(() => {
    const fetchFileTree = async () => {
      try {
        if(!repo) return
        const response = await repoEndpoints.getFileTree(formatRepoName(repo))
        console.log("Fetched file tree:", response);
        setFileTree(response)
      }catch (error) {
        console.error("Failed to fetch file tree:", error);
      }
    }
    fetchFileTree()
  }, [repo]);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-700  p-4">
        <h4 className="text-gray-100 font-semibold mb-4">Files</h4>
        <FileTree files={fileTree} repo={repo} onFileOpen={(path, content) => {
          setSelectedPath(path);
          setFileContent(content || "");
          // determine language by extension
          const ext = path.split('.').pop()?.toLowerCase() || "";
          const extToLang: Record<string, string> = {
            js: 'javascript', jsx: 'javascript', ts: 'typescript', tsx: 'typescript', py: 'python', java: 'javascript', json: 'json', css: 'css', html: 'html', jsx: 'javascript', md: 'markdown'
          };
          setLanguage(extToLang[ext] || 'javascript');
        }} />
      </aside>

      {/* Main Code Viewer */}
      <main className="flex-1 p-6 ">
        <div className="mb-4 text-sm text-gray-300">{selectedPath ? `Viewing: ${selectedPath}` : 'Select a file to view'}</div>
        <CodeViewer
          code={fileContent || '// Select a file from the left to view its contents'}
          language={language}
          errors={[]}
        />
      </main>
    </div>
  );
}
