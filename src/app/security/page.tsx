export default function SecurityPage() {
  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "2rem 1rem" }}>
      <h1>Security</h1>
      <p><strong>Last updated:</strong> 2026-02-16</p>

      <p>We take security seriously. If you believe you have discovered a vulnerability, please report it responsibly.</p>

      <h2>Responsible Disclosure</h2>
      <ul>
        <li>A clear description of the issue</li>
        <li>Steps to reproduce</li>
        <li>Impact assessment</li>
        <li>Relevant logs/screenshots (avoid sensitive personal data)</li>
      </ul>

      <h2>Report a Vulnerability</h2>
      <p>Email: ceo@aivaulttech.com</p>

      <h2>Do Not</h2>
      <ul>
        <li>Publicly disclose vulnerabilities before we have time to fix</li>
        <li>Attempt to access or modify data you do not own</li>
        <li>Perform denial-of-service attacks</li>
      </ul>
    </main>
  );
}
