import { useMemo } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-typescript";



interface CodeViewerProps {
  code: string;
  language: string;
  // errors may include an optional severity to render colored markers
  errors?: { line: number; message: string; severity?: string }[];
}

export default function CodeViewer({
  code,
  language,
  errors = [],
}: CodeViewerProps) {
  // ensure we use a Prism-supported language for highlighting and UI
  const safeLang = Prism.languages[language] ? language : 'javascript';
  const highlighted = useMemo(() => {
    // ensure code is a string (Prism expects a string)
    const codeStr = code;
    // ensure language is available in Prism, fallback to javascript
    const lang = safeLang;
    const html = Prism.highlight(codeStr, Prism.languages[lang], lang);

    const severityColors: Record<string, string> = {
      CRITICAL: '#DC2626',
      HIGH: '#EA580C',
      MEDIUM: '#CA8A04',
      LOW: '#6B7280',
      INFO: '#6B7280',
    };
    const lines = html.split("\n").map((line, index) => {
      const lineNumber = index + 1;
      const error = errors.find((e) => e.line === lineNumber);
      // build gutter marker HTML if severity present
      let gutterHtml = '';
      if (error && error.severity) {
        const key = String(error.severity).toUpperCase();
        const color = severityColors[key] || '#6B7280';
        gutterHtml = `<span class="gutter-marker" style="background:${color}" title="${key}"></span>`;
      } else if (error) {
        // default marker for errors without severity
        gutterHtml = `<span class="gutter-marker" style="background:${severityColors.INFO}" title="INFO"></span>`;
      }

      return `
        <div class="code-line ${error ? "error-line" : ""}">
          ${gutterHtml}
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
    <pre className={`language-${safeLang}`}>
      <code
        dangerouslySetInnerHTML={{ __html: highlighted }}
      />
    </pre>

    <style>{`
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
      .gutter-marker {
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 2px;
        margin-right: 0.5rem;
        box-shadow: 0 0 0 2px rgba(0,0,0,0.2) inset;
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
