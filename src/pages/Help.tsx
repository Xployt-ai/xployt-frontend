import React, { useState } from 'react';
import { BookOpen, Zap, Shield, AlertCircle, Lightbulb, CreditCard, Mail, Activity, Search, ChevronDown, ChevronUp } from 'lucide-react';

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', label: 'Getting Started', icon: <BookOpen size={20} /> },
    { id: 'platform', label: 'Using Platform', icon: <Zap size={20} /> },
    { id: 'security', label: 'Security & Privacy', icon: <Shield size={20} /> },
    { id: 'troubleshooting', label: 'Troubleshooting', icon: <AlertCircle size={20} /> },
    { id: 'practices', label: 'Best Practices', icon: <Lightbulb size={20} /> },
    { id: 'billing', label: 'Account & Billing', icon: <CreditCard size={20} /> },
    { id: 'support', label: 'Contact Support', icon: <Mail size={20} /> },
    { id: 'status', label: 'System Status', icon: <Activity size={20} /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br to-slate-800 font-sans">
      <div className="w-full py-16 px-6 flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center max-w-3xl mb-12">
          <div className="text-gray-500 font-bold tracking-widest mb-2 text-sm">SUPPORT & DOCUMENTATION</div>
          <h1 className="text-white text-4xl font-extrabold mb-4">Help Center</h1>
          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            Everything you need to know about using xploit.AI
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="max-w-5xl w-full mb-8 flex flex-wrap gap-2 justify-center">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm border transition-all ${
                activeSection === section.id 
                  ? 'bg-blue-500 text-white border-blue-500' 
                  : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'
              }`}
            >
              {section.icon}
              {section.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="max-w-5xl w-full">
          {activeSection === 'overview' && <OverviewSection />}
          {activeSection === 'platform' && <PlatformSection />}
          {activeSection === 'security' && <SecuritySection />}
          {activeSection === 'troubleshooting' && <TroubleshootingSection />}
          {activeSection === 'practices' && <PracticesSection />}
          {activeSection === 'billing' && <BillingSection />}
          {activeSection === 'support' && <SupportSection />}
          {activeSection === 'status' && <StatusSection />}
        </div>

      </div>
    </div>
  );
}

function OverviewSection() {
  return (
    <div className="space-y-6">
      <HelpCard title="What is xploit.AI?">
        <p className="text-gray-300 leading-relaxed mb-4">
          xploit.AI is an AI-powered security scanner designed specifically for MERN stack applications. 
          It analyzes your MongoDB, Express, React, and Node.js code to detect vulnerabilities like 
          SQL injection, XSS, insecure dependencies, exposed secrets, and authentication flaws.
        </p>
        <p className="text-gray-300 leading-relaxed">
          <strong className="text-white">Why xploit.AI?</strong> Get automated security insights in minutes, 
          not days. No manual code review needed.
        </p>
      </HelpCard>

      <HelpCard title="How It Works">
        <Steps items={[
          { num: '1', title: 'Connect GitHub', desc: 'Sign in with GitHub OAuth and grant repository access' },
          { num: '2', title: 'Choose Repository', desc: 'Select the MERN project you want to scan' },
          { num: '3', title: 'Select Scan Type', desc: 'Pick Basic, Deep Static, AI-Powered, or Runtime Scan' },
          { num: '4', title: 'View Results', desc: 'Get detailed vulnerability reports with fix recommendations' }
        ]} />
      </HelpCard>

      <HelpCard title="Account Setup Guide">
        <SubSection title="Creating an Account">
          <p className="text-gray-300 leading-relaxed mb-3">
            Click "Sign in with GitHub" on the homepage. You'll be redirected to GitHub to authorize xploit.AI. 
            No manual registration needed—your account is created automatically.
          </p>
        </SubSection>
        
        <SubSection title="Managing GitHub Tokens">
          <p className="text-gray-300 leading-relaxed mb-3">
            We use OAuth tokens to access your repositories securely. Tokens are encrypted and stored using AES-256. 
            You can revoke access anytime via GitHub Settings → Applications → xploit.AI.
          </p>
        </SubSection>

        <SubSection title="Required Permissions">
          <ul className="space-y-2">
            <ListItem text="Read access to code: To clone and analyze repository files" />
            <ListItem text="Read metadata: To fetch repo details, branches, and commit history" />
            <ListItem text="Read user email: For account identification and notifications" />
          </ul>
          <div className="mt-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <p className="text-blue-300 text-sm">
              ℹ️ We <strong>never</strong> request write access or access to private keys.
            </p>
          </div>
        </SubSection>
      </HelpCard>
    </div>
  );
}

function PlatformSection() {
  return (
    <div className="space-y-6">
      <HelpCard title="Selecting Scan Type">
        <ScanType 
          name="Basic Scan"
          time="~2 min"
          desc="Quick pattern-based detection for common vulnerabilities (secrets, hardcoded credentials, basic XSS)"
        />
        <ScanType 
          name="Deep Static Analysis"
          time="~5-10 min"
          desc="Comprehensive code analysis with dependency checks, OWASP Top 10 coverage, and dataflow analysis"
        />
        <ScanType 
          name="AI-Powered Scan"
          time="~8-15 min"
          desc="Uses LLMs to detect complex logic flaws, business logic vulnerabilities, and context-aware threats"
        />
        <ScanType 
          name="Runtime Scan"
          time="~15-30 min"
          desc="Executes your app in a sandbox to detect runtime-only issues like SSRF, IDOR, and race conditions"
        />
      </HelpCard>

      <HelpCard title="Understanding Scan Results">
        <SubSection title="Severity Levels">
          <div className="space-y-2">
            <SeverityBadge level="Critical" color="red" desc="Immediate exploitation risk—patch now" />
            <SeverityBadge level="High" color="orange" desc="Serious vulnerability—fix within 7 days" />
            <SeverityBadge level="Medium" color="yellow" desc="Moderate risk—schedule fix soon" />
            <SeverityBadge level="Low" color="gray" desc="Minor issue—fix when convenient" />
          </div>
        </SubSection>

        <SubSection title="Report Sections">
          <ul className="space-y-2 mt-3">
            <ListItem text="Secrets Detection: Exposed API keys, tokens, database credentials" />
            <ListItem text="Injection Flaws: SQL injection, NoSQL injection, command injection" />
            <ListItem text="XSS Vulnerabilities: Reflected, stored, and DOM-based XSS" />
            <ListItem text="Authentication Issues: Weak JWT, insecure sessions, missing rate limits" />
            <ListItem text="Dependency Risks: Outdated packages with known CVEs" />
          </ul>
        </SubSection>
      </HelpCard>

      <HelpCard title="Fixing Vulnerabilities">
        <p className="text-gray-300 leading-relaxed mb-4">
          Each vulnerability includes:
        </p>
        <ul className="space-y-2 mb-4">
          <ListItem text="Exact file path and line number" />
          <ListItem text="Code snippet showing the vulnerable code" />
          <ListItem text="Remediation steps with secure code examples" />
          <ListItem text="Links to relevant OWASP/CVE documentation" />
        </ul>
        <div className="bg-slate-800 border border-white/10 rounded-lg p-4">
          <p className="text-gray-400 text-sm font-mono mb-2">Example Fix:</p>
          <code className="text-green-400 text-sm">
            // Before: app.get('/user', (req, res) =&gt; User.findOne(req.query))<br/>
            // After: app.get('/user', (req, res) =&gt; User.findById(req.query.id))
          </code>
        </div>
      </HelpCard>

      <HelpCard title="Re-scanning">
        <p className="text-gray-300 leading-relaxed">
          After fixing vulnerabilities, click "Re-scan" in your dashboard. xploit.AI will compare the new scan 
          with previous results and highlight what's been fixed, what's new, and what remains. This helps track 
          your security improvement over time.
        </p>
      </HelpCard>
    </div>
  );
}

function SecuritySection() {
  return (
    <div className="space-y-6">
      <HelpCard title="Why We Need GitHub Tokens">
        <p className="text-gray-300 leading-relaxed mb-3">
          GitHub OAuth tokens allow us to clone your repositories temporarily for analysis. Without token access, 
          we cannot read your code or perform security scans.
        </p>
        <p className="text-gray-300 leading-relaxed">
          <strong className="text-white">Protection:</strong> Tokens are encrypted (AES-256), never logged, and 
          used only for API requests. We never store your actual code permanently.
        </p>
      </HelpCard>

      <HelpCard title="How Repository Data is Handled">
        <Steps items={[
          { num: '1', title: 'Cloning', desc: 'Repo is cloned to an isolated, encrypted sandbox with no internet access' },
          { num: '2', title: 'Analysis', desc: 'AI and static analysis tools scan files locally—no human views your code' },
          { num: '3', title: 'Storage', desc: 'Vulnerability reports are saved; source code is deleted within 24 hours' },
          { num: '4', title: 'Transmission', desc: 'Small code snippets may be sent to AI APIs (OpenAI/Anthropic) over TLS' }
        ]} />
      </HelpCard>

      <HelpCard title="What's Shared with AI Providers">
        <p className="text-gray-300 leading-relaxed mb-3">
          For AI-powered scans, we send context snippets (10-50 lines) to LLM APIs for intelligent analysis. 
          Full repositories are never uploaded. Providers do not retain data after processing.
        </p>
        <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
          <p className="text-green-300 text-sm">
            ✓ We never share your entire codebase with third parties.
          </p>
        </div>
      </HelpCard>

      <HelpCard title="Learn More">
        <p className="text-gray-300 leading-relaxed">
          For full details, read our <a href="#" className="text-blue-400 hover:underline">Privacy Policy</a> and 
          <a href="#" className="text-blue-400 hover:underline ml-1">Privacy Statement</a>.
        </p>
      </HelpCard>
    </div>
  );
}

function TroubleshootingSection() {
  return (
    <div className="space-y-6">
      <FAQItem 
        question="GitHub repository not connecting"
        answer="Ensure you've granted access to the repository in GitHub Settings → Applications → xploit.AI. If it's a private repo, verify 'repo' scope is enabled. Try disconnecting and reconnecting your GitHub account."
      />
      <FAQItem 
        question="Scan stuck in 'Progress' status"
        answer="Large repositories (>500 files) may take up to 30 minutes. If stuck for >1 hour, click 'Cancel Scan' and retry. Check System Status page for service issues. Contact support if problem persists."
      />
      <FAQItem 
        question="Token expired / Authentication failed"
        answer="Your GitHub OAuth token may have expired. Go to Settings → Reconnect GitHub. If you revoked access manually, you'll need to re-authorize xploit.AI from the login page."
      />
      <FAQItem 
        question="Runtime sandbox errors"
        answer="Runtime scans require specific environment setup (Node.js version, dependencies). Ensure your package.json has a 'start' script. Check logs in scan details for specific error messages. Common issue: missing .env file—upload via dashboard."
      />
      <FAQItem 
        question="Billing or subscription issues"
        answer="For payment failures, update card details in Billing → Payment Methods. To upgrade/downgrade, go to Billing → Change Plan. Refund requests: email billing@xploit.ai within 14 days of purchase."
      />
      <FAQItem 
        question="False positives in scan results"
        answer="Mark findings as 'False Positive' in the report—this helps train our AI. You can also add ignore rules in Settings → Scan Configuration to exclude specific files or patterns."
      />
    </div>
  );
}

function PracticesSection() {
  return (
    <div className="space-y-6">
      <BestPracticeCard 
        title="Common Security Mistakes in MERN Apps"
        tips={[
          'Using req.query directly in MongoDB queries (NoSQL injection risk)',
          'Missing input validation on Express routes',
          'Storing JWT secrets in client-side code',
          'Not sanitizing user input before rendering in React',
          'Using outdated packages with known CVEs'
        ]}
      />
      <BestPracticeCard 
        title="How to Secure Environment Variables"
        tips={[
          'Never commit .env files to Git (add to .gitignore)',
          'Use process.env in Node.js, never hardcode secrets',
          'Rotate API keys every 90 days',
          'Use services like AWS Secrets Manager for production',
          'Set restrictive file permissions (chmod 600 .env)'
        ]}
      />
      <BestPracticeCard 
        title="How to Write Safer Express Routes"
        tips={[
          'Always validate input with libraries like Joi or Zod',
          'Use parameterized queries for databases',
          'Implement rate limiting with express-rate-limit',
          'Enable helmet.js for security headers',
          'Add authentication middleware to protected routes'
        ]}
      />
      <BestPracticeCard 
        title="Understanding Dependency Vulnerabilities"
        tips={[
          'Run npm audit regularly and fix high/critical issues',
          'Keep Node.js and npm updated to latest LTS versions',
          'Use package-lock.json to lock dependency versions',
          'Avoid installing packages with no recent updates (>2 years)',
          'Check package downloads and GitHub stars before installing'
        ]}
      />
    </div>
  );
}

function BillingSection() {
  return (
    <div className="space-y-6">
      <HelpCard title="Subscription Plans">
        <div className="space-y-3">
          <PlanCard name="Free" price="$0/mo" features={['5 scans/month', 'Basic scan only', 'Public repos']} />
          <PlanCard name="Pro" price="$29/mo" features={['Unlimited scans', 'All scan types', 'Private repos', 'Priority support']} />
          <PlanCard name="Team" price="$99/mo" features={['Everything in Pro', '5 team members', 'Custom scan rules', 'API access']} />
        </div>
      </HelpCard>

      <HelpCard title="How to Upgrade/Downgrade">
        <p className="text-gray-300 leading-relaxed mb-3">
          Go to Settings → Billing → Change Plan. Select your desired plan and confirm. Changes take effect immediately. 
          Downgrades are prorated—unused credit is applied to next billing cycle.
        </p>
      </HelpCard>

      <HelpCard title="Scan Token Limits">
        <p className="text-gray-300 leading-relaxed mb-3">
          Free plan: 5 tokens/month (resets on 1st). Pro: Unlimited. Tokens are consumed per scan, not per repository. 
          If you exceed limits, you'll be prompted to upgrade.
        </p>
      </HelpCard>

      <HelpCard title="Refund & Cancellation Policy">
        <p className="text-gray-300 leading-relaxed">
          Cancel anytime from Settings → Billing. No refunds for partial months. Full refund available within 14 days 
          of initial purchase if you've used &lt;3 scans. Email billing@xploit.ai to request refunds.
        </p>
      </HelpCard>
    </div>
  );
}

function SupportSection() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-8 text-center">
        <h3 className="text-white text-2xl font-bold mb-6">Get in Touch</h3>
        <div className="space-y-4 text-left max-w-md mx-auto">
          <ContactOption 
            icon="📧"
            title="Email Support"
            value="support@xploit.ai"
            note="Response time: 24-48 hours"
          />
          <ContactOption 
            icon="🚨"
            title="Critical Issues"
            value="urgent@xploit.ai"
            note="Response time: 4-8 hours (Pro/Team only)"
          />
          <ContactOption 
            icon="💬"
            title="Live Chat"
            value="Available in dashboard"
            note="Mon-Fri, 9 AM - 6 PM EST"
          />
          <ContactOption 
            icon="🐛"
            title="Bug Reports"
            value="bugs@xploit.ai"
            note="Include scan ID and screenshots"
          />
        </div>
      </div>
    </div>
  );
}

function StatusSection() {
  return (
    <div className="space-y-6">
      <HelpCard title="System Status">
        <div className="space-y-3">
          <StatusItem service="Scan Engine" status="operational" />
          <StatusItem service="GitHub Integration" status="operational" />
          <StatusItem service="AI Analysis" status="operational" />
          <StatusItem service="Dashboard" status="operational" />
        </div>
        <p className="text-gray-400 text-sm mt-4">
          Last updated: 2 minutes ago · <a href="#" className="text-blue-400 hover:underline">View full status page</a>
        </p>
      </HelpCard>

      <HelpCard title="Scheduled Maintenance">
        <p className="text-gray-300 leading-relaxed">
          No maintenance scheduled. We'll notify users via email 48 hours before any planned downtime.
        </p>
      </HelpCard>

      <HelpCard title="Latest Updates">
        <UpdateItem version="v2.3.0" date="Oct 15, 2025" changes={[
          'Added support for Next.js 15 vulnerability detection',
          'Improved AI scan accuracy by 12%',
          'Fixed false positives in React component scanning'
        ]} />
        <UpdateItem version="v2.2.1" date="Oct 1, 2025" changes={[
          'Enhanced MongoDB injection detection',
          'Added export to PDF for scan reports',
          'Performance improvements for large repos'
        ]} />
      </HelpCard>
    </div>
  );
}

// Helper Components
function HelpCard({ title, children }) {
  return (
    <div className="bg-gradient-to-br from-white/[0.02] to-white/[0.005] rounded-2xl p-8 border border-white/[0.04] shadow-lg">
      <h2 className="text-white text-2xl font-bold mb-4">{title}</h2>
      {children}
    </div>
  );
}

function SubSection({ title, children }) {
  return (
    <div className="mb-6 last:mb-0">
      <h3 className="text-white text-lg font-semibold mb-3">{title}</h3>
      {children}
    </div>
  );
}

function Steps({ items }) {
  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <div key={i} className="flex gap-4">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
            {item.num}
          </div>
          <div>
            <h4 className="text-white font-semibold">{item.title}</h4>
            <p className="text-gray-400 text-sm">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function ListItem({ text }) {
  return (
    <li className="flex items-start gap-2">
      <span className="text-blue-400 mt-1">•</span>
      <span className="text-gray-300">{text}</span>
    </li>
  );
}

function ScanType({ name, time, desc }) {
  return (
    <div className="mb-4 pb-4 border-b border-white/10 last:border-0">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-white font-semibold">{name}</h4>
        <span className="text-gray-400 text-sm">{time}</span>
      </div>
      <p className="text-gray-300 text-sm">{desc}</p>
    </div>
  );
}

function SeverityBadge({ level, color, desc }) {
  const colors = {
    red: 'bg-red-500/20 border-red-500/50 text-red-300',
    orange: 'bg-orange-500/20 border-orange-500/50 text-orange-300',
    yellow: 'bg-yellow-500/20 border-yellow-500/50 text-yellow-300',
    gray: 'bg-gray-500/20 border-gray-500/50 text-gray-300'
  };
  return (
    <div className={`flex items-center justify-between p-3 rounded-lg border ${colors[color]}`}>
      <span className="font-semibold">{level}</span>
      <span className="text-sm">{desc}</span>
    </div>
  );
}

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-gradient-to-br from-white/[0.02] to-white/[0.005] rounded-xl p-6 border border-white/[0.04]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left"
      >
        <h3 className="text-white font-semibold text-lg">{question}</h3>
        {isOpen ? <ChevronUp className="text-gray-400" size={20} /> : <ChevronDown className="text-gray-400" size={20} />}
      </button>
      {isOpen && (
        <p className="text-gray-300 mt-4 leading-relaxed">{answer}</p>
      )}
    </div>
  );
}

function BestPracticeCard({ title, tips }) {
  return (
    <div className="bg-gradient-to-br from-white/[0.02] to-white/[0.005] rounded-2xl p-8 border border-white/[0.04] shadow-lg">
      <h3 className="text-white text-xl font-bold mb-4">{title}</h3>
      <ul className="space-y-2">
        {tips.map((tip, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="text-green-400 mt-1">✓</span>
            <span className="text-gray-300">{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PlanCard({ name, price, features }) {
  return (
    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-white font-semibold text-lg">{name}</h4>
        <span className="text-blue-400 font-bold">{price}</span>
      </div>
      <ul className="space-y-1">
        {features.map((f, i) => (
          <li key={i} className="text-gray-400 text-sm">• {f}</li>
        ))}
      </ul>
    </div>
  );
}

function ContactOption({ icon, title, value, note }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-2xl">{icon}</span>
      <div>
        <h4 className="text-white font-semibold">{title}</h4>
        <p className="text-blue-400">{value}</p>
        <p className="text-gray-400 text-sm">{note}</p>
      </div>
    </div>
  );
}

function StatusItem({ service, status }) {
  const isOperational = status === 'operational';
  return (
    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
      <span className="text-gray-300">{service}</span>
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${isOperational ? 'bg-green-500' : 'bg-red-500'}`} />
        <span className={isOperational ? 'text-green-400' : 'text-red-400'}>
          {isOperational ? 'Operational' : 'Down'}
        </span>
      </div>
    </div>
  );
}

function UpdateItem({ version, date, changes }) {
  return (
    <div className="mb-6 pb-6 border-b border-white/10 last:border-0">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-white font-semibold">{version}</span>
        <span className="text-gray-400 text-sm">{date}</span>
      </div>
      <ul className="space-y-1">
        {changes.map((change, i) => (
          <li key={i} className="text-gray-300 text-sm">• {change}</li>
        ))}
      </ul>
    </div>
  );
}