import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface DownloadProps {
  downloadUrl: string;
  reload: () => void;
}

function Download({ downloadUrl, reload }: DownloadProps) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Video Created</CardTitle>
        <CardDescription>
          Your YouTube playlist video has been created
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <Button onClick={() => reload()} variant="outline">
          Create New
        </Button>
        <Button>
          <a href={downloadUrl} download="ytpv_video.mp4">
            Download
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}

export { Download };
