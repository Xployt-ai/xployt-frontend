import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronDown, ChevronRight, Folder, FolderOpen, File as FileIcon } from "lucide-react"
import { repoEndpoints } from "@/data/network/repo.ts";
import type { FileNode } from "@/data/models/repo.ts";

export default function FileTree({ files, repo, onFileOpen }: { files?: FileNode[] | FileNode; repo: string | null; onFileOpen?: (path: string, content: string) => void }) {
    // Normalize incoming data: API may return a single root FileNode or an array
    let list: FileNode[] = [];
    if (Array.isArray(files)) list = files;
    else if (files && typeof files === 'object') list = [files as FileNode];

    return (
      <ScrollArea className="h-full w-full">
        <ul className="list-none pl-2 text-sm text-gray-200">
          {list.map((file) => (
            <FileNode key={file.name} file={file} level={0} repo={repo} parentPath={""} onFileOpen={onFileOpen} />
          ))}
        </ul>
      </ScrollArea>
    )
  }

 function FileNode({ file, level, repo, parentPath, onFileOpen }: { file: FileNode; level: number; repo: string | null; parentPath: string; onFileOpen?: (path: string, content: string) => void }) {
    const [isOpen, setIsOpen] = useState(true)

    const toggleFolder = () => {
      if (file.type === "folder") {
        setIsOpen(!isOpen)
      }
    }

    const fetchFile = async (filePath: string, repo: string) => {
      try {
        const resp = await repoEndpoints.getFile(repo, filePath)
        // API may return { code: string, language: string } or a raw string
        let content: any = resp;
        if (resp && typeof resp === 'object') {
          // prefer resp.code when present
          if ('code' in resp && typeof (resp as any).code === 'string') {
            content = (resp as any).code;
          } else if ('data' in resp && typeof (resp as any).data === 'string') {
            // some APIs might wrap the payload
            content = (resp as any).data;
          } else {
            // fallback: stringify object
            content = JSON.stringify(resp, null, 2);
          }
        }
        console.log('File content fetched (code only):', content)
        return content as string;
      } catch (err) {
        console.error('Failed to fetch file', filePath, err);
        throw err;
      }
    }

    const handleNodeClick = (e: React.MouseEvent) => {
      // prevent parent handlers when clicking file nodes
      if (file.type === 'file') {
        e.stopPropagation();
        const currentPath = parentPath ? `${parentPath}/${file.name}` : file.name;
        if (!repo) {
          console.warn('Repository not provided. Cannot fetch file:', currentPath);
          console.log('clicked', currentPath);
          return;
        }
        // fetch and notify parent via callback if provided
        fetchFile(currentPath, repo)
          .then((content) => {
            if (onFileOpen) onFileOpen(currentPath, content as string);
          })
          .catch(() => {
            // fallback: still log click
            console.log('clicked', currentPath);
          });
        return;
      }
      // folders toggle open/close
      toggleFolder();
    }

    return (
     <li className="mb-1">
       <div
         className={`flex items-center gap-1 cursor-pointer select-none hover:bg-gray-800 rounded px-1`}
         style={{ paddingLeft: level * 16 }}
         onClick={handleNodeClick}
       >
         {file.type === "folder" ? (
           <>
             {isOpen ? (
               <ChevronDown size={14} className="text-gray-400" />
             ) : (
               <ChevronRight size={14} className="text-gray-400" />
             )}
             {isOpen ? (
               <FolderOpen size={16} className="text-yellow-400" />
             ) : (
               <Folder size={16} className="text-yellow-400" />
             )}
             <span className="text-gray-300">{file.name}</span>
           </>
         ) : (
           <>
             <FileIcon size={14} className="text-gray-500" />
             <span className="text-gray-400 hover:text-gray-100">{file.name}</span>
           </>
         )}
       </div>

       {file.type === "folder" && isOpen && Array.isArray(file.children) && (
         <ul className="list-none pl-4">
           {file.children.map((child) => (
             <FileNode
               key={child.name}
               file={child}
               level={level + 1}
               repo={repo}
               parentPath={parentPath ? `${parentPath}/${file.name}` : file.name}
               onFileOpen={onFileOpen}
             />
           ))}
         </ul>
       )}
     </li>
   )
 }
