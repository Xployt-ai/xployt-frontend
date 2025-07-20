import React from 'react';

const Button: React.FC<{ label: string; onClick?: () => void }> = ({ label, onClick }) => (
  <button
    style={{ margin: '10px', padding: '5px 10px', backgroundColor: '#1DA1F2', color: '#fff', border: 'none', cursor: 'pointer' }}
    onClick={onClick}
  >
    {label}
  </button>
);

const Card: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div style={{ backgroundColor: '#1A2B49', padding: '15px', margin: '20px 0', borderRadius: '5px' }}>
    <h2>{title}</h2>
    {children}
  </div>
);

const Index: React.FC = () => {
  const handleMarkResolved = () => {
    console.log("Mark as Resolved clicked!");
  };

  const handleAssignIssue = () => {
    console.log("Assign Issue clicked!");
  };

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: '20px' }}>
      <h1>SQL Injection Vulnerability</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>Project: Automation | Issue Detail</div>
        <div>News Alert</div>
      </div>
      <Card title="Issue Details">
        <div style={{ marginBottom: '10px' }}>Status: Open</div>
        <div style={{ marginBottom: '10px' }}>Severity: High</div>
        <div style={{ marginBottom: '10px' }}>Opened: Jul 5, 2024</div>
        <div style={{ marginBottom: '10px' }}>Updated: Jul 14, 2024</div>
        <div style={{ marginBottom: '10px' }}>
          Description: The application is vulnerable to SQL injection attacks through the user authentication module. Malicious users can manipulate SQL queries by injecting arbitrary code into the username or password fields, potentially gaining unauthorized access.
        </div>
        <div style={{ marginBottom: '10px' }}>Vulnerable Code Snippet:</div>
        <pre style={{ marginBottom: '10px' }}>query = f"SELECT * FROM WHERE username = '{username}' AND password = '{password}'"</pre>
        <div style={{ marginBottom: '10px' }}>Fix Guidance:</div>
        <div style={{ marginBottom: '10px' }}>
          To mitigate this vulnerability, use parameterized queries or prepared statements. These methods ensure that user input is treated as parameters rather than executable SQL code.
        </div>
        <pre style={{ marginBottom: '10px' }}>query = "SELECT * FROM WHERE username = ? AND password = ?"</pre>
        <div>
          <Button label="Mark as Resolved" onClick={handleMarkResolved} />
          <Button label="Assign Issue" onClick={handleAssignIssue} />
        </div>
      </Card>
    </div>
  );
};

export default Index;