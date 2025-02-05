import { ShareIcon } from "../icons/ShareIcon";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
}

export function Card({ title, link, type }: CardProps) {
  return (
    <div className="p-4 bg-white rounded-lg border border-gray-200 max-w-80 min-w-72 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-center">
        <div className="flex items-center text-md font-medium text-gray-700">
          <div className="pr-2 text-gray-500">
            <ShareIcon />
          </div>
          {title}
        </div>
        <div className="flex items-center space-x-2">
          <a
            href={link}
            target="_blank"
            className="text-gray-500 hover:text-purple-600 transition-colors duration-200"
          >
            <ShareIcon />
          </a>
          <div className="text-gray-500 hover:text-purple-600 transition-colors duration-200">
            <ShareIcon />
          </div>
        </div>
      </div>

      <div className="pt-4">
        {type === "youtube" && (
          <iframe
            className="w-full rounded-lg"
            src={link.replace("watch", "embed").replace("?v=", "/")}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}

        {type === "twitter" && (
          <blockquote className="twitter-tweet">
            <a href={link.replace("x.com", "twitter.com")}></a>
          </blockquote>
        )}
      </div>
    </div>
  );
}
