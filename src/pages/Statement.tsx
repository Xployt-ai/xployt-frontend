import React from 'react';
import { Shield, Lock, Github, Brain, Server, Eye, Trash2, Mail } from 'lucide-react';

export default function PrivacyStatement() {
  return (
    <div className="min-h-screen bg-black font-sans">
      <div className="w-full py-16 px-6 flex flex-col items-center">
        {/* Header */}
        <div className="text-center max-w-3xl mb-12">
          <div className="text-gray-500 font-bold tracking-widest mb-2 text-sm">TRANSPARENCY & TRUST</div>
          <h1 className="text-white text-4xl font-extrabold mb-4">Privacy Statement</h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            A clear explanation of how xploit.AI handles your code, data, and privacy. Last updated: October 18, 2025
          </p>
        </div>

        {/* Content */}
        <div className="max-w-4xl w-full flex flex-col gap-8">
          
          <IconCard icon={<Shield />} title="What We Do">
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              xploit.AI is an automated security analysis platform that integrates with GitHub to identify potential 
              vulnerabilities in your MERN stack projects. We scan your code, analyze dependencies, and provide 
              actionable security insights powered by AI.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              <strong className="text-white">Our Commitment:</strong> We are dedicated to safeguarding your data, 
              respecting your privacy, and maintaining complete transparency about how we handle your information.
            </p>
          </IconCard>

          <IconCard icon={<Lock />} title="What Data We Collect">
            <DataPoint 
              title="Account Data" 
              desc="Your GitHub username, email address, profile picture, and OAuth authentication tokens (encrypted and secured)."
            />
            <DataPoint 
              title="Repository Data" 
              desc="Source code files, commit history, package.json dependencies, configuration files, and repository metadata — collected only when you initiate a scan."
            />
            <DataPoint 
              title="Usage Data" 
              desc="Scan logs, vulnerability reports, timestamps, browser details, IP addresses, and error reports for analytics and security monitoring."
            />
            <DataPoint 
              title="Optional Data" 
              desc="Billing information (if using paid plans) and support communication records."
            />
          </IconCard>

          <IconCard icon={<Server />} title="How We Use Your Data">
            <ul className="space-y-3">
              <BulletPoint text="Perform security scans and generate vulnerability reports tailored to your MERN stack projects" />
              <BulletPoint text="Authenticate and manage your GitHub integration securely" />
              <BulletPoint text="Improve our AI detection models using anonymized, aggregated data patterns" />
              <BulletPoint text="Send scan completion notifications, critical security alerts, and service updates" />
              <BulletPoint text="Provide customer support and troubleshoot issues when you contact us" />
            </ul>
            <div className="mt-6 p-4 bg-green-900/30 border border-green-500/20 rounded-lg">
              <p className="text-green-300 font-semibold">
                We NEVER sell, publicly share, or monetize your source code or personal data.
              </p>
            </div>
          </IconCard>

          <IconCard icon={<Brain />} title="AI & Third-Party Services">
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              To provide intelligent vulnerability detection, we use <strong className="text-white">Large Language Models (LLMs)</strong> from 
              third-party providers like OpenAI and Anthropic. Here's what happens:
            </p>
            <ul className="space-y-3 mb-4">
              <BulletPoint text="Small code snippets (not entire repositories) may be transmitted to AI APIs for contextual analysis" />
              <BulletPoint text="These providers process data temporarily and do not retain it after analysis" />
              <BulletPoint text="All transmissions are encrypted using industry-standard TLS/SSL protocols" />
              <BulletPoint text="We select AI providers with strong privacy commitments and SOC 2 compliance" />
            </ul>
            <p className="text-gray-400 text-base">
              Third-party services we use: <span className="text-white">GitHub API, OpenAI API, Anthropic Claude, AWS (hosting), Stripe (payments)</span>
            </p>
            <p className="text-gray-400 text-sm mt-2">
              View their privacy policies: <a href="https://openai.com/privacy" className="text-blue-400 hover:underline">OpenAI</a>, <a href="https://www.anthropic.com/privacy" className="text-blue-400 hover:underline">Anthropic</a>, <a href="https://docs.github.com/en/site-policy/privacy-policies" className="text-blue-400 hover:underline">GitHub</a>
            </p>
          </IconCard>

          <IconCard icon={<Github />} title="Repository Access & Storage">
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              We take repository security seriously. Here's exactly what happens when you scan a project:
            </p>
            <Timeline items={[
              { step: '1', text: 'You grant permission via GitHub OAuth (read-only access to selected repositories)' },
              { step: '2', text: 'Repository is temporarily cloned to our secure, isolated sandbox environment' },
              { step: '3', text: 'AI analysis runs — no human views your code unless you explicitly request support' },
              { step: '4', text: 'Vulnerability report is generated and stored in your dashboard' },
              { step: '5', text: 'Repository files are automatically deleted within 24 hours of scan completion' }
            ]} />
            <div className="mt-6 p-4 bg-gray-900/50 border border-blue-500/20 rounded-lg">
              <p className="text-blue-300">
                <strong className="text-white">GitHub Tokens:</strong> Encrypted using AES-256 and stored securely. 
                Used only for repository access. You can revoke access anytime via GitHub settings.
              </p>
            </div>
          </IconCard>

          <IconCard icon={<Trash2 />} title="Data Retention">
            <RetentionTable items={[
              { type: 'Repository Source Code', duration: '24 hours after scan', note: 'Automatically deleted' },
              { type: 'Scan Results & Reports', duration: 'Until you delete them', note: 'Stored in your dashboard' },
              { type: 'Security Logs', duration: '30 days', note: 'For debugging and security monitoring' },
              { type: 'Account Information', duration: 'While account is active + 90 days', note: 'After account deletion' },
              { type: 'Anonymized Analytics', duration: 'Indefinitely', note: 'Used for model improvement' }
            ]} />
          </IconCard>

          <IconCard icon={<Eye />} title="Your Privacy Rights">
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              Under GDPR, CCPA, and similar laws, you have the right to:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <RightCard title="Access" desc="Request a copy of all your personal data we hold" />
              <RightCard title="Correction" desc="Update or correct inaccurate information in your account" />
              <RightCard title="Deletion" desc="Delete your account and all associated data permanently" />
              <RightCard title="Portability" desc="Export your scan results in machine-readable format (JSON)" />
              <RightCard title="Opt-Out" desc="Unsubscribe from non-essential emails and notifications" />
              <RightCard title="Withdraw Consent" desc="Revoke GitHub access or data processing permissions anytime" />
            </div>
            <p className="text-gray-300 text-lg leading-relaxed mt-6">
              To exercise any of these rights, email us at <a href="mailto:privacy@xploit.ai" className="text-blue-400 hover:underline font-semibold">privacy@xploit.ai</a>. 
              We'll respond within 30 days.
            </p>
          </IconCard>

          <IconCard icon={<Shield />} title="How We Share Data">
            <div className="space-y-4">
              <SharingPoint 
                title="We DO NOT sell your data"
                desc="Your code and personal information will never be sold to advertisers, data brokers, or third parties."
              />
              <SharingPoint 
                title="Anonymized Research"
                desc="We may use aggregated, anonymized vulnerability patterns to improve detection algorithms (no identifiable code or user data)."
              />
              <SharingPoint 
                title="Service Providers"
                desc="We share minimal data with subprocessors like AWS (hosting), Stripe (billing), and email services — all bound by strict confidentiality agreements."
              />
              <SharingPoint 
                title="Legal Compliance"
                desc="We may disclose data if required by law, court order, or to protect against security threats."
              />
            </div>
          </IconCard>

          <IconCard icon={<Lock />} title="Security Measures">
            <div className="grid md:grid-cols-2 gap-4">
              <SecurityFeature title="End-to-End Encryption" desc="TLS 1.3 for data in transit, AES-256 for data at rest" />
              <SecurityFeature title="Isolated Sandboxes" desc="Code runs in containerized environments with no network access" />
              <SecurityFeature title="Access Controls" desc="Role-based permissions and multi-factor authentication (MFA)" />
              <SecurityFeature title="Regular Audits" desc="Quarterly security reviews and penetration testing" />
              <SecurityFeature title="No Human Access" desc="Engineers cannot view your code without explicit permission" />
              <SecurityFeature title="Audit Logs" desc="All data access is logged and monitored for suspicious activity" />
            </div>
          </IconCard>

          <IconCard icon={<Mail />} title="Cookies & Analytics">
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              We use cookies for essential functionality and analytics:
            </p>
            <ul className="space-y-3">
              <BulletPoint text="Essential Cookies: Authentication, session management, security (cannot be disabled)" />
              <BulletPoint text="Analytics Cookies: Google Analytics for usage patterns, page views, and performance (you can opt-out)" />
              <BulletPoint text="Preference Cookies: Dark mode settings, dashboard layout preferences" />
            </ul>
            <p className="text-gray-400 text-base mt-4">
              You can manage cookie preferences in your browser settings or via our cookie banner.
            </p>
          </IconCard>

          <div className="bg-gray-900/50 border border-yellow-500/20 rounded-2xl p-8">
            <h3 className="text-yellow-300 text-2xl font-bold mb-4">Important Disclosures</h3>
            <div className="space-y-4">
              <Disclosure 
                title="Children's Privacy" 
                text="xploit.AI is not intended for users under 16 years of age. We do not knowingly collect data from children. If you're a parent and believe we've collected your child's information, contact us immediately at privacy@xploit.ai."
              />
              <Disclosure 
                title="Policy Updates" 
                text="We may update this Privacy Statement to reflect new features or legal requirements. Significant changes will be announced via email and a dashboard notification 30 days before taking effect. Continued use after changes constitutes acceptance."
              />
              <Disclosure 
                title="International Transfers" 
                text="Your data may be processed in the US or EU. We use Standard Contractual Clauses (SCCs) approved by the European Commission to ensure GDPR-level protection for all international transfers."
              />
            </div>
          </div>

          <div className="bg-gray-900/50 border border-blue-500/20 rounded-2xl p-8 text-center">
            <h3 className="text-white text-2xl font-bold mb-4">Questions or Concerns?</h3>
            <p className="text-gray-300 text-lg mb-6">
              We're here to help. Reach out to our privacy team anytime:
            </p>
            <div className="space-y-2 text-gray-300">
              <p><strong className="text-white">Email:</strong> <a href="mailto:privacy@xploit.ai" className="text-blue-400 hover:underline">privacy@xploit.ai</a></p>
              <p><strong className="text-white">Data Protection Officer:</strong> <a href="mailto:dpo@xploit.ai" className="text-blue-400 hover:underline">dpo@xploit.ai</a></p>
              <p><strong className="text-white">Support Portal:</strong> <a href="https://support.xploit.ai" className="text-blue-400 hover:underline">support.xploit.ai</a></p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

/* ----------------- CHILD COMPONENTS ----------------- */

function IconCard({ icon, title, children }) {
  return (
    <div className="bg-gray-900/50 rounded-2xl p-9 border border-white/10 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400">
          {React.cloneElement(icon, { size: 24 })}
        </div>
        <h2 className="text-white text-3xl font-bold">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function DataPoint({ title, desc }) {
  return (
    <div className="mb-4 pb-4 border-b border-white/10 last:border-0">
      <h4 className="text-white font-semibold text-lg mb-1">{title}</h4>
      <p className="text-gray-300 text-base leading-relaxed">{desc}</p>
    </div>
  );
}

function BulletPoint({ text }) {
  return (
    <li className="flex items-start gap-3">
      <span className="text-blue-400 text-xl mt-1">•</span>
      <span className="text-gray-300 text-lg leading-relaxed">{text}</span>
    </li>
  );
}

function Timeline({ items }) {
  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <div key={i} className="flex items-start gap-4">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            {item.step}
          </div>
          <p className="text-gray-300 text-lg leading-relaxed pt-1">{item.text}</p>
        </div>
      ))}
    </div>
  );
}

function RetentionTable({ items }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/20">
            <th className="text-left text-white font-semibold py-3 px-4">Data Type</th>
            <th className="text-left text-white font-semibold py-3 px-4">Retention Period</th>
            <th className="text-left text-white font-semibold py-3 px-4">Note</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i} className="border-b border-white/10">
              <td className="text-gray-300 py-3 px-4">{item.type}</td>
              <td className="text-gray-300 py-3 px-4">{item.duration}</td>
              <td className="text-gray-400 text-sm py-3 px-4">{item.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RightCard({ title, desc }) {
  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-white/10">
      <h4 className="text-white font-semibold text-lg mb-1">{title}</h4>
      <p className="text-gray-400 text-sm">{desc}</p>
    </div>
  );
}

function SharingPoint({ title, desc }) {
  return (
    <div className="flex items-start gap-4">
      <div>
        <h4 className="text-white font-semibold text-lg mb-1">{title}</h4>
        <p className="text-gray-300 text-base leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function SecurityFeature({ title, desc }) {
  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-white/10">
      <h4 className="text-white font-semibold text-base mb-1">{title}</h4>
      <p className="text-gray-400 text-sm">{desc}</p>
    </div>
  );
}

function Disclosure({ title, text }) {
  return (
    <div>
      <h4 className="text-yellow-200 font-semibold text-lg mb-2">{title}</h4>
      <p className="text-gray-300 text-base leading-relaxed">{text}</p>
    </div>
  );
}
