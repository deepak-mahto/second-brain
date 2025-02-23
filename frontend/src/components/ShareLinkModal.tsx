import { useState } from "react";
import { Button } from "./Button";

interface ShareLinkModalProps {
  open: boolean;
  onClose: () => void;
  shareLink: string | null;
}

export function ShareLinkModal({
  open,
  onClose,
  shareLink,
}: ShareLinkModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    if (shareLink) {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Share Brain</h2>
        <p className="text-gray-700 mb-4 break-all">{shareLink}</p>
        <div className="flex justify-end gap-2">
          <Button
            onClick={handleCopyLink}
            variant="primary"
            text={copied ? "Copied!" : "Copy Link"}
            startIcon={<></>}
          />
          <Button
            onClick={onClose}
            variant="secondary"
            text="Close"
            startIcon={<></>}
          />
        </div>
      </div>
    </div>
  );
}
