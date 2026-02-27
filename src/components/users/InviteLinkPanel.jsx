import { useState } from 'react';
import Button from '../ui/Button';

export default function InviteLinkPanel({ link }) {
  const [copied, setCopied] = useState(false);

  if (!link) {
    return null;
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      // Clipboard access can fail due to permissions or non-secure contexts.
      console.error('Failed to copy invite link', error);
    }
  };

  return (
    <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-3 text-sm">
      <div className="font-semibold text-emerald-800">Invite Link</div>
      <div className="mt-2 flex flex-col items-stretch gap-2 sm:flex-row sm:items-start">
        <div className="break-all flex-1 rounded-xl bg-white/88 p-2 text-slate-700">
          {link}
        </div>
        <Button
          type="button"
          onClick={handleCopy}
          className="shrink-0"
        >
          {copied ? 'Copied' : 'Copy'}
        </Button>
      </div>
    </div>
  );
}
