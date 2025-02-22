import { Card } from "./Card";

interface TwitterContentProps {
  contents: any[];
}

export function TwitterContent({ contents }: TwitterContentProps) {
  console.log(contents);
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Twitter Posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {contents.map(
          (content: any, index) =>
            content.type === "tweet" && <Card key={index} {...content} />
        )}
      </div>
    </div>
  );
}
