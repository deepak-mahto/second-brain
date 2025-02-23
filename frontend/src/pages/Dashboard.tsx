import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CreateContentModal } from "../components/CreateContentModal";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Sidebar } from "../components/Sidebar";
import { useContent } from "../hooks/useContent";
import { TwitterContent } from "../components/TwitterContent";
import { YoutubeContent } from "../components/YoutubeContent";
import axios from "axios";
import { BACKEND_URL } from "../config";

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<"tweet" | "video" | null>(
    null
  );
  const [shareLink, setShareLink] = useState<string | null>(null);

  const { contents, refresh } = useContent(selectedItem || undefined);

  useEffect(() => {
    refresh();
  }, [modalOpen]);

  const shareBrain = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/brain/share`,
        {
          share: true,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (response.data.hash) {
        const link = `${window.location.origin}/api/v1/brain/${response.data.hash}`;
        setShareLink(link);

        const userConfirmed = window.confirm(
          `${link}\n\nClick "OK" to copy the link.`
        );

        if (userConfirmed) {
          await navigator.clipboard.writeText(link);
          alert("Link copied to clipboard!");
        }
      } else {
        setShareLink(null);
        alert("Your brain is no longer shared.");
      }
    } catch (error) {
      alert("Failed to share brain. Please try again");
    }
  };

  const handleItemClick = (item: "tweet" | "video") => {
    setSelectedItem(item);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar onItemClick={handleItemClick} />

      <main className="flex-1 p-4 md:p-8 ml-0 md:ml-72">
        <div className="flex justify-end gap-2 mb-8">
          <Button
            onClick={() => setModalOpen(true)}
            variant="primary"
            text="Add Content"
            startIcon={<PlusIcon />}
          />
          <Button
            onClick={shareBrain}
            variant="secondary"
            text="Share Brain"
            startIcon={<ShareIcon />}
          />
        </div>

        {selectedItem === "tweet" && <TwitterContent contents={contents} />}
        {selectedItem === "video" && <YoutubeContent contents={contents} />}

        {!selectedItem && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {contents.map((content: any, index) => (
              <Card key={index} {...content} />
            ))}
          </div>
        )}
      </main>

      <CreateContentModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
