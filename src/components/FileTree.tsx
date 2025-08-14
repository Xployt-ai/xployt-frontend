import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronDown, ChevronRight, Folder, FolderOpen, File as FileIcon } from "lucide-react"

interface FileItem {
  name: string
  type: "file" | "folder"
  children?: FileItem[]
}

export default function FileTree({ files }: { files: FileItem[] }) {
  return (
    <ScrollArea className="h-full w-full">
      <ul className="list-none pl-2 text-sm text-gray-200">
        {files.map((file) => (
          <FileNode key={file.name} file={file} level={0} />
        ))}
      </ul>
    </ScrollArea>
  )
}

function FileNode({ file, level }: { file: FileItem; level: number }) {
  const [isOpen, setIsOpen] = useState(true)

  const toggleFolder = () => {
    if (file.type === "folder") {
      setIsOpen(!isOpen)
    }
  }

  return (
    <li className="mb-1">
      <div
        className={`flex items-center gap-1 pl-${level * 4} cursor-pointer select-none hover:bg-gray-800 rounded px-1`}
        onClick={toggleFolder}
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

      {file.type === "folder" && isOpen && file.children && (
        <ul className="list-none pl-4">
          {file.children.map((child) => (
            <FileNode key={child.name} file={child} level={level + 1} />
          ))}
        </ul>
      )}
    </li>
  )
}
