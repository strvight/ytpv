"use client";
import { useState } from "react";

import { Search } from "@/components/search";
import { VideosList } from "@/components/videos-list";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download } from "@/components/download";

import { uploadImage } from "@/lib/firebase";
import axios from "axios";

export default function Home() {
  const [videos, setVideos] = useState([] as any[]);
  const [file, setFile] = useState(null as File | null);
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null as string | null);
  const { toast } = useToast();

  const reload = () => {
    setVideoUrl(null);
    setLoading(false);
    setVideos([]);
    setFile(null);
  };

  const addSearchResult = (id: string, title: string) => {
    if (videos.length >= 3) {
      toast({
        variant: "destructive",
        description: "To save my money, you can only add up to 3 videos.",
      });
      return;
    }

    setVideos([...videos, { id, title }]);
    toast({
      description: `Added ${title}`,
    });
  };

  const removeVideo = (id: string, index: number) => {
    const newVideos = [...videos];
    newVideos.splice(index, 1);
    setVideos(newVideos);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];

      if (validImageTypes.includes(file.type)) {
        setFile(file);
      } else {
        toast({
          variant: "destructive",
          description: "Only JPG and PNG files are allowed.",
        });
      }
    }
  };

  const createVideo = async () => {
    if (videos.length === 0) {
      toast({
        variant: "destructive",
        description: "Please add at least one video.",
      });
      return;
    }

    if (!file) {
      toast({
        variant: "destructive",
        description: "Please select a background picture.",
      });
      return;
    }
    setLoading(true);

    // upload image to firestore
    let snapshot;

    try {
      snapshot = await uploadImage(file);
      // console.log(snapshot);
    } catch (error) {
      reload();
      console.error("Error uploading image:", error);
      toast({
        variant: "destructive",
        description: "Error uploading image.",
      });
      return;
    }

    // call backend to create video
    try {
      const requestBody = {
        image: snapshot.metadata.fullPath,
        songs: videos.map((video, index) => {
          return {
            id: {
              videoId: video.id,
            },
            order_num: index,
          };
        }),
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/createVideo`,
        requestBody,
        {
          responseType: "blob", // This is important to get the response as a blob
        }
      );
      const url = URL.createObjectURL(response.data);
      setVideoUrl(url);
      setLoading(false);
      setVideos([]);
      setFile(null);
    } catch (error) {
      reload();
      console.error("Error generating the video:", error);
      toast({
        variant: "destructive",
        description: "Error generating video.",
      });
      return;
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-start px-24 py-12">
      <div className="z-10 w-full max-w-5xl font-sans text-sm mb-16">
        <h1 className="text-5xl font-bold">ytpv</h1>
      </div>
      {!loading && !videoUrl && (
        <>
          {" "}
          <div className="z-10 w-full max-w-5xl font-sans text-sm mb-4">
            <Search onAddResult={addSearchResult} />
          </div>
          <div className="z-10 w-full max-w-5xl font-sans mb-6">
            <VideosList videos={videos} onRemoveVideo={removeVideo} />
          </div>
          <div className="z-10 w-full max-w-5xl font-sans mb-5">
            <div className="w-1/2">
              <Label htmlFor="picture">Background Picture</Label>
              <Input
                id="picture"
                type="file"
                accept="image/png, image/jpeg"
                onChange={(e) => handleFileChange(e)}
              />
            </div>
          </div>
        </>
      )}

      {videoUrl === null && (
        <div className="z-10 w-full max-w-5xl font-sans">
          {loading ? (
            <div>
              <p className="mb-3">
                Please be patient, it takes a while for the video to be created!
              </p>
              <Button disabled>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Creating Video
              </Button>
            </div>
          ) : (
            <Button onClick={() => createVideo()}>
              <ChevronRightIcon className="mr-2 h-4 w-4" />
              Create Video
            </Button>
          )}
        </div>
      )}

      {videoUrl && (
        <div className="flex flex-col gap-3 z-10 max-w-5xl font-sans">
          <Download downloadUrl={videoUrl} reload={reload} />
        </div>
      )}

      <Toaster />
    </main>
  );
}
