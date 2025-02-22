import { DeleteIcon } from "../icons/DeleteIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";

interface CardProps {
  title: string;
  link: string;
  type: "tweet" | "video";
}

export function Card({ title, link, type }: CardProps) {
  return (
    <div className="p-4 bg-white rounded-lg border w-full shadow-sm hover:shadow-md transition-shadow duration-200">
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
          <button className="text-gray-500 hover:text-purple-600 transition-colors duration-200">
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
