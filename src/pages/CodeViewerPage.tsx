"use client";

import CodeViewer from "@/components/CodeViewer";
import FileTree from "@/components/FileTree";
import { useEffect, useState } from "react";
import { repoEndpoints } from "@/data/network/repo.ts";
import { formatRepoName } from "@/lib/utils.ts";
import type { FileNode } from "@/data/models/repo.ts";
import type { Vulnerability } from "@/data/models/scan.ts";
import { scanCollectionEndpoints } from "@/data/network/scan_collection.ts";

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
  const collection_id = new URLSearchParams(window.location.search).get("collection_id");

  const [fileTree, setFileTree] = useState<FileNode | FileNode[] | undefined>()
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string>("");
  const [language, setLanguage] = useState<string>("javascript");
  const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>([]);
  const [fileErrors, setFileErrors] = useState<{ line: number; message: string }[]>([]);

  useEffect(() => {
    const fetchFileTree = async () => {
      try {
        if(!repo) return
        const response = await repoEndpoints.getFileTree(formatRepoName(repo))
        if(collection_id) {
          const results = await scanCollectionEndpoints.getCollectionResults(collection_id)
          // normalize shapes
          if (Array.isArray(results)) {
            setVulnerabilities(results as any);
          } else if (results && Array.isArray((results as any).vulnerabilities)) {
            setVulnerabilities((results as any).vulnerabilities);
          } else if (results && Array.isArray((results as any).data)) {
            setVulnerabilities((results as any).data);
          } else {
            // fallback empty
            setVulnerabilities([]);
          }
        }
        console.log("Fetched file tree:", response);
        setFileTree(response)
      }catch (error) {
        console.error("Failed to fetch file tree:", error);
      }
    }
    fetchFileTree()
  }, [repo, collection_id]);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-700  p-4">
        <h4 className="text-gray-100 font-semibold mb-4">Files</h4>
        <FileTree files={fileTree} repo={repo} vulnerabilities={vulnerabilities} onFileOpen={(path, content) => {
          setSelectedPath(path);
          setFileContent(content || "");
          // determine language by extension
          const ext = path.split('.').pop()?.toLowerCase() || "";
          const extToLang: Record<string, string> = {
            js: 'javascript', jsx: 'javascript', ts: 'typescript', tsx: 'typescript', py: 'python', java: 'javascript', json: 'json', css: 'css', html: 'html', jsx: 'javascript', md: 'markdown'
          };
          setLanguage(extToLang[ext] || 'javascript');

          // Filter vulnerabilities for this file and convert to CodeViewer errors
          try {
            const filePathNormalized = path.replace(/^\/+/, "");
            const matched = vulnerabilities.filter((v: any) => {
              if (!v || !v.file_path) return false;
              const fp = String(v.file_path).replace(/^\/+/, "");
              return fp === filePathNormalized || fp.endsWith('/' + filePathNormalized) || fp.endsWith(filePathNormalized) || fp.includes(filePathNormalized);
            });
            console.log(`vulnerabilities for ${path}:`, matched);

            // Map to error objects using the vulnerability's first available line
            const getFirstLine = (v: any) => {
              if (!v) return 1;
              if (v.line) return Number(v.line) || 1;
              if (Array.isArray(v.lines) && v.lines.length) return Number(v.lines[0]) || 1;
              if (v.location && typeof v.location === 'object') {
                return Number(v.location.line || v.location.start_line || 1) || 1;
              }
              if (Array.isArray(v.positions) && v.positions.length && v.positions[0].line) return Number(v.positions[0].line) || 1;
              return 1;
            };

            const errors = matched.map((v: any) => {
              const lineNum = getFirstLine(v);
              const sev = ((v.severity || v.severity_level || '') + '').toString().toUpperCase() || 'INFO';
              const desc = v.description || v.vulnerability || '';
              const message = `${sev}: ${desc}`.trim();
              return { line: lineNum, message, severity: sev };
            });
            console.log(`mapped errors for ${path}:`, errors);
            setFileErrors(errors);
          } catch (err) {
            console.error('Error filtering vulnerabilities for', path, err);
            setFileErrors([]);
          }
        }} />
      </aside>

      {/* Main Code Viewer */}
      <main className="flex-1 p-6 ">
        <div className="mb-4 text-sm text-gray-300">{selectedPath ? `Viewing: ${selectedPath}` : 'Select a file to view'}</div>
        <CodeViewer
          code={fileContent || '// Select a file from the left to view its contents'}
          language={language}
          errors={fileErrors}
        />
      </main>
    </div>
  );
}
