import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrashIcon } from "@radix-ui/react-icons";

interface VideoListProps {
  videos: any[];
  onRemoveVideo: (id: string, index: number) => void;
}

function VideosList({ videos, onRemoveVideo }: VideoListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Videos</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {videos.length > 0
          ? videos.map((video, i) => (
              <Card key={video.id}>
                <CardHeader>
                  <CardTitle className="flex flex-row text-base">
                    <div className="basis-11/12">
                      {i + 1}. {video.title}
                    </div>
                    <div
                      onClick={() => onRemoveVideo(video.id, i)}
                      className="basis-1/12 flex justify-end items-center hover:cursor-pointer"
                    >
                      <TrashIcon />
                    </div>
                  </CardTitle>
                </CardHeader>
              </Card>
            ))
          : "No current videos selected"}
      </CardContent>
    </Card>
  );
}

export { VideosList };
