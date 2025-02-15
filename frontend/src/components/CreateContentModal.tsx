import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import { BACKEND_URL } from "../config";
import axios from "axios";

enum ContentType {
  Youtube = "video",
  Twitter = "tweet",
}

export function CreateContentModal({
  open,
  onClose,
}: {
  open: any;
  onClose: any;
}) {
  const titleRef = useRef<HTMLInputElement>();
  const linkRef = useRef<HTMLInputElement>();
  const [type, setType] = useState(ContentType.Youtube);

  async function addContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;

    await axios.post(
      `${BACKEND_URL}/api/v1/content`,
      { link, title, type },
      { headers: { Authorization: localStorage.getItem("token") } }
    );

    onClose();
  }

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm"></div>
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-4 md:p-6 mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Create Content</h2>
              <button
                onClick={onClose}
                className="text-gray-700 bg-gray-100 p-2 rounded-md hover:bg-gray-200"
              >
                <CrossIcon />
              </button>
            </div>
            <div className="space-y-4">
              <Input
                reference={titleRef}
                placeholder="Title"
                inputType="text"
              />
              <Input reference={linkRef} placeholder="Link" inputType="text" />
              <div>
                <h3 className="text-md font-medium text-gray-700 mb-2">Type</h3>
                <div className="flex justify-evenly">
                  <Button
                    text="Youtube"
                    variant={
                      type === ContentType.Youtube ? "primary" : "secondary"
                    }
                    onClick={() => setType(ContentType.Youtube)}
                    startIcon={<></>}
                  />
                  <Button
                    text="Twitter"
                    variant={
                      type === ContentType.Twitter ? "primary" : "secondary"
                    }
                    onClick={() => setType(ContentType.Twitter)}
                    startIcon={<></>}
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <Button
                  onClick={addContent}
                  variant="primary"
                  text="Submit"
                  startIcon={<></>}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
