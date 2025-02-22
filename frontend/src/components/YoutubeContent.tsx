import { Card } from "./Card";

interface YoutubeContentProps {
  contents: any[];
}

export function YoutubeContent({ contents }: YoutubeContentProps) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">YouTube Videos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {contents.map(
          (content: any, index) =>
            content.type === "video" && <Card key={index} {...content} />
        )}
      </div>
    </div>
  );
}
