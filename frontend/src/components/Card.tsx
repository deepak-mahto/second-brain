import axios from "axios";
import { DeleteIcon } from "../icons/DeleteIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { BACKEND_URL } from "../config";

interface CardProps {
  _id: string;
  title: string;
  link: string;
  type: "tweet" | "video";
}

const removeContent = async (_id: string) => {
  await axios.delete(`${BACKEND_URL}/api/v1/content/${_id}`, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
};

export function Card({ _id, title, link, type }: CardProps) {
  return (
    <div className="p-4 w-full">
      <div className="flex justify-between items-center">
        <div className="flex items-center text-md font-medium text-gray-700">
          <div className="pr-2 text-gray-500">
            {type === "tweet" ? <TwitterIcon /> : <YoutubeIcon />}
          </div>
          <span className="truncate">{title}</span>
        </div>
        <div className="flex items-center space-x-2">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-purple-600 transition-colors duration-200"
          >
            <ShareIcon />
          </a>
          <button
            onClick={() => removeContent(_id)}
            className="text-gray-500 hover:text-purple-600 transition-colors duration-200"
          >
            <DeleteIcon />
          </button>
        </div>
      </div>

      <div className="pt-4">
        {type === "video" && (
          <iframe
            className="w-full aspect-video rounded-lg"
            src={link.replace("watch", "embed").replace("?v=", "/")}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}

        {type === "tweet" && (
          <blockquote className="twitter-tweet">
            <a href={link.replace("x.com", "twitter.com")}></a>
          </blockquote>
        )}
      </div>
    </div>
  );
}
