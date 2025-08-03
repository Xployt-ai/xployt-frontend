type CodeBlockProps = {
  code: string;
};

export const CodeBlock = ({ code }: CodeBlockProps) => (
  <pre className="whitespace-pre-wrap text-sm font-mono">{code}</pre>
);
