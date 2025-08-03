import { Link } from "react-router-dom"; 
import { Section } from "@/components/ui/Section";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Button } from "@/components/ui/Button";

const IssueDetail = () => {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="text-sm text-gray-400 mb-4 space-x-1">
          <Link to="/" className="text-gray-500 hover:underline">
            Project
          </Link>
          <span>/</span>
          <Link to="/project/automatisch" className="text-gray-500 hover:underline">
            Automatisch
          </Link>
          <span>/</span>
          <span className="text-white">Issue Detail</span>
        </div>

        <h1 className="text-3xl font-bold text-white mb-1">
            SQL Injection Vulnerability   
          </h1>

           <div className="text-sm text-indigo-400 mb-6">
            Critical • High • #12345
          </div>

        <div className="border border-gray-700 p-6 rounded-lg">     

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Issue Details</h2>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-300 divide-y divide-gray-700">
              <div className="py-3 border-b border-gray-700">
                <div className="text-xs uppercase text-gray-400">Status</div>
                <div className="text-white">Open</div>
              </div>
              <div className="py-3 border-b border-gray-700">
                <div className="text-xs uppercase text-gray-400">Severity</div>
                <div className="text-white">High</div>
              </div>
              <div className="py-3">
                <div className="text-xs uppercase text-gray-400">Created</div>
                <div className="text-white">July 15, 2024</div>
              </div>
              <div className="py-3 border-b border-gray-700">
                <div className="text-xs uppercase text-gray-400">Last Updated</div>
                <div className="text-white">July 16, 2024</div>
              </div>
            </div>
          </div>

          {/* Description */}
          <Section title="Description">
            <p className="text-sm text-gray-200 bg-gray-900 p-4 rounded">
              The application is vulnerable to SQL injection attacks through the
              user authentication module. Malicious users can manipulate SQL
              queries by injecting arbitrary SQL code into the username or
              password fields, potentially gaining unauthorized access to the
              database or manipulating data.
            </p>
          </Section>

          {/* Code Snippet */}
          <Section title="Code Snippet">
            <CodeBlock
              code={`Vulnerable Code:
query = "SELECT * FROM users WHERE username = '" + username + "' AND password = '" + password + "'";
cursor.execute(query)`}
            />
          </Section>

          {/* Fix Guidance */}
          <Section title="Fix Guidance">
            <p className="text-gray-200 text-sm mb-2">
              To mitigate this vulnerability, use parameterized queries or
              prepared statements. These methods ensure that user-supplied data is
              treated as parameters rather than executable SQL code.
            </p>
            <CodeBlock
              code={`Fixed Code:
query = "SELECT * FROM users WHERE username = %s AND password = %s"
cursor.execute(query, [username, password])`}
            />
          </Section>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            <Button variant="secondary">Mark as Resolved</Button>
            <Button>Assign Issue</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetail;
