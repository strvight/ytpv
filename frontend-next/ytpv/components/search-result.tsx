import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

interface SearchResultProps {
  id: string;
  title: string;
  channel: string;
  thumbnailUrl: string;
  onAddResult: (id: string, title: string) => void;
}

function SearchResult({
  id,
  title,
  channel,
  thumbnailUrl,
  onAddResult,
}: SearchResultProps) {
  return (
    <Card
      onClick={() => onAddResult(id, title)}
      className="hover:cursor-pointer"
    >
      <CardHeader className="flex flex-row">
        <div className="basis-5/6">
          <CardTitle className="text-base">{title}</CardTitle>
          <CardDescription>{channel}</CardDescription>
        </div>
        <div className="basis-1/6 flex justify-end items-center h-full">
          <a href={"https://www.youtube.com/watch?v=" + id} target="_blank">
            <Image src={thumbnailUrl} alt={title} width={60} height={45} />
          </a>
        </div>
      </CardHeader>
    </Card>
  );
}

export { SearchResult };
