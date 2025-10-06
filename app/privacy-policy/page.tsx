// app/privacy-policy/page.tsx
export default function PrivacyPolicy() {
  return (
    <main className="prose max-w-3xl mx-auto px-4 py-12">
      <div dangerouslySetInnerHTML={{ __html: `PASTE_TERMLY_SNIPPET_HERE` }} />
    </main>
  );
}
