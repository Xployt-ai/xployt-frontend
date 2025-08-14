import { useMemo } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";

import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-typescript";

interface CodeViewerProps {
  code: string;
  language: string;
  errors?: { line: number; message: string }[];
}

export default function CodeViewer({
  code,
  language,
  errors = [],
}: CodeViewerProps) {
  const highlighted = useMemo(() => {
    const html = Prism.highlight(code, Prism.languages[language], language);

    const lines = html.split("\n").map((line, index) => {
      const lineNumber = index + 1;
      const error = errors.find((e) => e.line === lineNumber);

      return `
        <div class="code-line ${error ? "error-line" : ""}">
          <span class="line-number">${lineNumber}</span>
          <span class="code-content">${line || "&nbsp;"}</span>
          ${error ? `<span class="error-message">💡 ${error.message}</span>` : ""}
        </div>
      `;
    });

    return lines.join("");
  }, [code, language, errors]);

  return (
    <div className="bg-neutral-900 text-sm rounded-lg shadow-lg overflow-auto h-full min-h-0">
      <pre className={`language-${language}`}>
        <code
          className={`language-${language}`}
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      </pre>

      <style jsx>{`
        pre {
          margin: 0;
          line-height: 1.2; /* tighter line spacing */
        }
        code {
          margin: 0;
          padding: 0;
        }
        .code-line {
          display: flex;
          align-items: center; /* vertically align to center */
        }
        .line-number {
          color: #555;
          padding-right: 0.75rem;
          user-select: none;
          min-width: 2rem;
          text-align: right;
        }
        .code-content {
          flex: 1;
          white-space: pre-wrap;
        }
        .error-line {
          background-color: rgba(255, 0, 0, 0.1);
        }
        .error-message {
          color: #ff6b6b;
          margin-left: 0.75rem;
          font-style: italic;
          white-space: pre-wrap;
        }
      `}</style>
    </div>
  );
}
