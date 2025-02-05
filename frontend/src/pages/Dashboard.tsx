import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CreateContentModal } from "../components/CreateContentModal";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Sidebar } from "../components/Sidebar";
import { useContent } from "../hooks/useContent";

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const { contents, refresh } = useContent();

  useEffect(() => {
    refresh();
  }, [modalOpen]);

  const shareBrain = () => {};

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />

      <main className="ml-72 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Second Brain</h1>
          <div className="flex gap-4">
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contents.map((content: any, index) => (
            <Card key={index} {...content} />
          ))}
        </div>
      </main>

      <CreateContentModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
