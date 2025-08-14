export function CanonicalCallout({ url }: { url?: string | null }) {
  if (!url) return null;

  return (
    <div className="bg-slate-100 border border-slate-600 text-slate-600 p-2 rounded">
      <p>
        This article was originally published on{' '}
        <a
          className="text-blue-600 hover:underline"
          href={url}
          target="_blank"
          rel="noreferrer noopener"
        >
          Medium
        </a>
        . Follow me there for more writing!
      </p>
    </div>
  );
}
