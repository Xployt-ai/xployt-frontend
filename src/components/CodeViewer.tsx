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
  <div className=" text-sm rounded-lg shadow-lg overflow-auto h-full min-h-0">
    {/* Language label */}
    <div className="px-3 py-1 text-xs font-semibold text-neutral-300 bg-neutral-800 border-b border-neutral-700 rounded-t-lg">
      {language.charAt(0).toUpperCase() + language.slice(1)}
    </div>

    <pre className={`language-${language}`}>
      <code
        dangerouslySetInnerHTML={{ __html: highlighted }}
      />
    </pre>

    <style jsx>{`
      pre {
        margin: 0;
        padding: 0.5rem;
        line-height: 1; /* compact lines */
      }
      code {
        margin: 0;
        padding: 0;
        display: block;
                line-height: 0.1; 

      }
      .code-line {
        display: flex;
        align-items: center;
        line-height: 1;
        margin: 0;
        padding: 0;
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