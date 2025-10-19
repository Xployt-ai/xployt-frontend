import React, { useState } from 'react';

export default function TermsAndPolicy() {
  const [activeTab, setActiveTab] = useState('terms');

  return (
    <div className="min-h-screenfont-sans">
      <div className="w-full py-16 px-6 flex flex-col items-center">
        {/* Header */}
        <div className="text-center max-w-3xl mb-12">
          <div className="text-gray-500 font-bold tracking-widest mb-2 text-sm">LEGAL DOCUMENTATION</div>
          <h1 className="text-white text-4xl font-extrabold mb-4">Terms & Privacy Policy</h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            Last updated: October 18, 2025. Please review our terms of service and privacy practices carefully.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="max-w-4xl w-full mb-8 flex gap-4 justify-center">
          <button
            onClick={() => setActiveTab('terms')}
            className={`px-8 py-3 rounded-lg font-semibold text-base border border-white/10 transition-all ${
              activeTab === 'terms' ? ' from-slate-900 text-white' : 'bg-white/5 text-white hover:bg-white/10'
            }`}
          >
            Terms of Service
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-8 py-3 rounded-lg font-semibold text-base border border-white/10 transition-all ${
              activeTab === 'privacy' ? ' from-slate-900 text-white' : 'bg-white/5 text-white hover:bg-white/10'
            }`}
          >
            Privacy Policy
          </button>
        </div>

        {/* Content */}
        <div className="max-w-4xl w-full flex flex-col gap-8">
          {activeTab === 'terms' ? (
            <>
              <Card title="1. Acceptance of Terms">
                By accessing or using xploit.AI (the "Service"), you agree to be bound by these Terms of Service. 
                If you do not agree to these terms, please do not use our Service. We reserve the right to modify 
                these terms at any time, and your continued use constitutes acceptance of any changes.
              </Card>

              <Card title="2. Service Description">
                xploit.AI is an AI-powered vulnerability scanner that analyzes source code and repositories to identify 
                potential security vulnerabilities, code quality issues, and compliance concerns. The Service uses 
                artificial intelligence and machine learning models to provide security insights and recommendations.
              </Card>

              <Card title="3. User Accounts and Authentication">
                To use xploit.AI, you must authenticate using GitHub OAuth. By connecting your GitHub account, you authorize 
                us to access repository information necessary to perform vulnerability scans. You are responsible for:
                <List items={[
                  { title: 'Account Security', desc: 'Maintaining the security of your GitHub account credentials' },
                  { title: 'Authorized Access', desc: 'Ensuring you have permission to scan any repositories you submit' },
                  { title: 'Accurate Information', desc: 'Providing accurate account and repository information' },
                  { title: 'Compliance', desc: 'Using the Service in compliance with all applicable laws and regulations' }
                ]} />
              </Card>

              <Card title="4. Acceptable Use Policy">
                You agree NOT to use xploit.AI to:
                <List items={[
                  { title: 'Unauthorized Scanning', desc: 'Scan repositories or code you do not own or have permission to analyze' },
                  { title: 'Malicious Intent', desc: 'Use vulnerability information to exploit, harm, or attack systems' },
                  { title: 'Service Abuse', desc: 'Overload or attempt to disrupt the Service infrastructure' },
                  { title: 'Reverse Engineering', desc: 'Attempt to reverse engineer our AI models or proprietary algorithms' },
                  { title: 'Illegal Activities', desc: 'Engage in any illegal activities or violation of third-party rights' },
                  { title: 'Reselling', desc: 'Resell or redistribute our Service without explicit written permission' }
                ]} />
              </Card>

              <Card title="5. Third-Party Services">
                xploit.AI integrates with third-party services including GitHub, OpenAI, and other AI/ML providers. 
                Your use of these integrations is subject to their respective terms of service. When you submit code for analysis, 
                portions may be processed by third-party AI services. We make reasonable efforts to select reputable providers, 
                but we are not responsible for their practices or service availability.
              </Card>

              <Card title="6. Data and Intellectual Property">
                <SubTitle>Your Code and Data</SubTitle>
                You retain all ownership rights to your source code and repositories. By using xploit.AI, you grant us 
                a limited, temporary license to analyze your code for the purpose of providing vulnerability scanning services.
                <SubTitle>Our Service</SubTitle>
                All intellectual property rights in the Service, including our AI models, algorithms, reports, and interface, 
                are owned by xploit.AI or our licensors. You may not copy, modify, or create derivative works without permission.
              </Card>

              <Card title="7. Disclaimers and Limitations">
                <SubTitle>No Warranty</SubTitle>
                The Service is provided "AS IS" without warranties of any kind. We do not guarantee that our vulnerability 
                scans will identify all security issues, or that the findings are error-free. Security analysis is inherently 
                complex, and AI-based detection has limitations.
                <SubTitle>Limitation of Liability</SubTitle>
                To the maximum extent permitted by law, xploit.AI shall not be liable for any indirect, incidental, special, 
                consequential, or punitive damages, including loss of profits, data, or business opportunities arising from 
                your use of the Service, even if we've been advised of such possibility.
              </Card>

              <Card title="8. Indemnification">
                You agree to indemnify and hold harmless xploit.AI, its affiliates, and personnel from any claims, damages, 
                losses, or expenses (including legal fees) arising from your use of the Service, violation of these terms, 
                or infringement of any third-party rights.
              </Card>

              <Card title="9. Termination">
                We reserve the right to suspend or terminate your access to xploit.AI at any time, with or without cause, 
                including for violations of these terms. Upon termination, your right to use the Service immediately ceases, 
                and we may delete your account data in accordance with our Privacy Policy.
              </Card>

              <Card title="10. Governing Law">
                These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict 
                of law principles. Any disputes shall be resolved through binding arbitration or in courts of competent jurisdiction.
              </Card>

              <Card title="11. Contact Information">
                For questions about these Terms of Service, please contact us at legal@xploit.ai or visit our support portal.
              </Card>
            </>
          ) : (
            <>
              <Card title="1. Introduction">
                This Privacy Policy explains how xploit.AI ("we," "us," or "our") collects, uses, shares, and protects 
                your personal information when you use our AI-powered vulnerability scanning service. We are committed 
                to protecting your privacy and handling your data with transparency and care.
              </Card>

              <Card title="2. Information We Collect">
                <SubTitle>Account Information</SubTitle>
                When you authenticate via GitHub OAuth, we collect your GitHub username, email address, profile information, 
                and repository access tokens necessary to provide our services.
                <SubTitle>Repository and Code Data</SubTitle>
                When you initiate a vulnerability scan, we temporarily access and process your source code, repository 
                structure, dependencies, and configuration files. This data is necessary to perform security analysis.
                <SubTitle>Usage Information</SubTitle>
                We collect information about how you interact with xploit.AI, including scan history, feature usage, 
                IP addresses, browser type, device information, and access times.
                <SubTitle>Scan Results and Reports</SubTitle>
                We store vulnerability scan results, identified issues, severity ratings, and generated reports to 
                provide you with historical analysis and downloadable documentation.
              </Card>

              <Card title="3. How We Use Your Information">
                We use collected information to:
                <List items={[
                  { title: 'Provide Services', desc: 'Perform vulnerability scans and generate security reports' },
                  { title: 'Improve AI Models', desc: 'Enhance our detection algorithms and accuracy (with anonymization)' },
                  { title: 'Account Management', desc: 'Authenticate users and manage account preferences' },
                  { title: 'Communication', desc: 'Send service updates, security alerts, and support responses' },
                  { title: 'Analytics', desc: 'Understand usage patterns to improve user experience' },
                  { title: 'Security', desc: 'Detect and prevent fraud, abuse, and security incidents' },
                  { title: 'Compliance', desc: 'Meet legal obligations and enforce our terms' }
                ]} />
              </Card>

              <Card title="4. Data Sharing and Third Parties">
                <SubTitle>AI Service Providers</SubTitle>
                We use third-party AI/ML services (including OpenAI and similar providers) to power our vulnerability 
                detection. Code snippets may be sent to these services for analysis. We select providers with strong 
                security practices, but their processing is subject to their own privacy policies.
                <SubTitle>GitHub Integration</SubTitle>
                We access your GitHub repositories via OAuth. GitHub's access policies and API terms apply to this integration.
                <SubTitle>Service Providers</SubTitle>
                We may share data with trusted service providers who assist with hosting, analytics, customer support, 
                and infrastructure. These providers are contractually obligated to protect your data.
                <SubTitle>Legal Requirements</SubTitle>
                We may disclose information if required by law, court order, or to protect our rights, property, or safety.
                <p className="text-gray-300 text-lg leading-relaxed mt-4">
                  We do NOT sell your personal information or code to third parties for marketing purposes.
                </p>
              </Card>

              <Card title="5. Data Retention and Storage">
                <SubTitle>Code Data</SubTitle>
                Source code submitted for scanning is processed in real-time and typically not stored permanently. 
                However, we may retain code snippets temporarily for up to 30 days for quality assurance and model 
                improvement purposes (anonymized after 7 days).
                <SubTitle>Scan Results</SubTitle>
                Vulnerability scan reports and identified issues are stored for the lifetime of your account to provide 
                historical tracking and downloadable reports. You can request deletion at any time.
                <SubTitle>Account Data</SubTitle>
                Account information is retained while your account is active and for up to 90 days after account closure 
                for legal and security purposes.
              </Card>

              <Card title="6. Data Security">
                We implement industry-standard security measures to protect your data, including encryption in transit 
                (TLS/SSL), encryption at rest, access controls, secure authentication, regular security audits, and 
                intrusion detection. However, no system is 100% secure, and we cannot guarantee absolute security.
              </Card>

              <Card title="7. Your Privacy Rights">
                Depending on your jurisdiction, you may have rights to:
                <List items={[
                  { title: 'Access', desc: 'Request a copy of your personal data' },
                  { title: 'Correction', desc: 'Update or correct inaccurate information' },
                  { title: 'Deletion', desc: 'Request deletion of your data (subject to legal obligations)' },
                  { title: 'Portability', desc: 'Receive your data in a structured, machine-readable format' },
                  { title: 'Opt-Out', desc: 'Unsubscribe from marketing communications' },
                  { title: 'Object', desc: 'Object to certain processing of your data' }
                ]} />
                <p className="text-gray-300 text-lg leading-relaxed mt-4">
                  To exercise these rights, contact us at privacy@xploit.ai. We will respond within 30 days.
                </p>
              </Card>

              <Card title="8. Cookies and Tracking">
                We use essential cookies for authentication and session management. We also use analytics cookies to 
                understand how users interact with our Service. You can control cookies through your browser settings, 
                though disabling essential cookies may affect functionality.
              </Card>

              <Card title="9. International Data Transfers">
                Your data may be transferred to and processed in countries other than your own. We ensure appropriate 
                safeguards are in place for international transfers, including standard contractual clauses and 
                adequacy decisions.
              </Card>

              <Card title="10. Children's Privacy">
                xploit.AI is not intended for users under 18 years of age. We do not knowingly collect information 
                from children. If you believe we have collected information from a minor, please contact us immediately.
              </Card>

              <Card title="11. Changes to This Policy">
                We may update this Privacy Policy periodically. We will notify you of significant changes via email 
                or prominent notice in the Service. Your continued use after changes constitutes acceptance.
              </Card>

              <Card title="12. Contact Us">
                For privacy-related questions, requests, or concerns, contact us at:
                <p className="text-gray-300 text-lg leading-relaxed mt-4">
                  Email: privacy@xploit.ai<br/>
                  Data Protection Officer: dpo@xploit.ai<br/>
                  Support Portal: support.xploit.ai
                </p>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className="bg-gradient-to-brrounded-2xl p-9  border-white/[0.5] shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all">
      <h2 className="text-white text-3xl font-bold mb-3">{title}</h2>
      <p className="text-gray-300 text-lg leading-relaxed">{children}</p>
    </div>
  );
}

function SubTitle({ children }) {
  return <h3 className="text-white text-2xl font-bold mb-3 mt-6">{children}</h3>;
}

function List({ items }) {
  return (
    <ul className="mt-4 space-y-4">
      {items.map((item, i) => (
        <li key={i} className="relative pl-10 text-gray-300 leading-relaxed">
          <span className="absolute left-0 top-0 w-7 h-7 bg-gray-700 rounded-full flex items-center justify-center text-white font-bold text-sm">
            {i + 1}
          </span>
          <span className="font-semibold text-white">{item.title}:</span> {item.desc}
        </li>
      ))}
    </ul>
  );
}