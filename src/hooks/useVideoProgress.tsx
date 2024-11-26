"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import axios from "axios";

// VideoProgressContextType defines the structure of the context that holds the current time of the video,
// a function to set the current time, the chapters of the video, and a function to fetch those chapters.
interface VideoProgressContextType {
  currentTime: number;
  setCurrentTime: (time: number) => void;
  videoChapters: Chapter[];
  fetchVideoChapters: (videoId: string) => void;
  videoTitle: string;
  channelTitle: string;
}

interface Chapter {
  start: number;
  end: number;
  title: string;
}

const VideoProgressContext = createContext<
  VideoProgressContextType | undefined
>(undefined);

const YOUTUBE_API_URL =
  "https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails";

interface VideoProgressProviderProps {
  children: React.ReactNode;
}

// VideoProgressProvider component manages the state of the video progress and provides context to its children.
export const VideoProgressProvider: React.FC<VideoProgressProviderProps> = ({
  children,
}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [videoChapters, setVideoChapters] = useState<Chapter[]>([]);
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null);
  const [videoTitle, setVideoTitle] = useState<string>('');
  const [channelTitle, setChannelTitle] = useState<string>('');

  // updateTime function updates the current time of the video element and the state.
  const updateTime = useCallback((time: number) => {
    const videoElement = document.querySelector("video");
    if (videoElement) {
      videoElement.currentTime = time;
    }
    setCurrentTime(time);
  }, []);

  // parseDuration function converts the ISO 8601 duration format to seconds.
  const parseDuration = (duration: string): number => {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return 0;

    const hours = parseInt(match[1]) || 0;
    const minutes = parseInt(match[2]) || 0;
    const seconds = parseInt(match[3]) || 0;

    return hours * 3600 + minutes * 60 + seconds;
  };

  // parseChaptersFromDescription function extracts chapters from the video description based on timestamps.
  const parseChaptersFromDescription = (
    description: string,
    videoDuration: number
  ): Chapter[] => {
    const pattern = /(?:^|\n)(\d{1,2}:\d{2}(?::\d{2})?)\s*[-–—:]*\s*(.+)/g;
    const chapters: Chapter[] = [];
    let match;
  
    while ((match = pattern.exec(description)) !== null) {
      const [, timestamp, title] = match;
  
      const timeParts = timestamp.split(":").map(Number).reverse();
      const seconds =
        (timeParts[0] || 0) +
        (timeParts[1] || 0) * 60 +
        (timeParts[2] || 0) * 3600;
  
      const cleanedTitle = title.trim();
  
      if (chapters.length > 0) {
        chapters[chapters.length - 1].end = seconds;
      }
  
      chapters.push({
        start: seconds,
        end: videoDuration,
        title: cleanedTitle,
      });
    }
  
    if (chapters.length > 0) {
      chapters[chapters.length - 1].end = videoDuration;
    }
  
    return chapters;
  };

  // fetchVideoChapters function fetches video chapters from the YouTube API based on the video ID.
  const fetchVideoChapters = useCallback(
    async (videoId: string) => {
      console.log("API Key:", process.env.NEXT_PUBLIC_YOUTUBE_API_KEY);
      if (videoId === currentVideoId) {
        return;
      }
      setCurrentVideoId(videoId);
      try {
        const response = await axios.get(YOUTUBE_API_URL, {
          params: {
            id: videoId,
            key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
          },
        });

        console.log("API Key:", process.env.NEXT_PUBLIC_YOUTUBE_API_KEY);
        const data = response.data;
        const snippet = data.items[0].snippet;
        const description = snippet.description;
        const title = snippet.title;
        const channel = snippet.channelTitle;
        setVideoTitle(title);
        setChannelTitle(channel);

        const duration = data.items[0].contentDetails?.duration;
        if (!duration) {
          console.error("Duration not found in contentDetails");
          return;
        }

        const videoDuration = parseDuration(duration);
        const chapters = parseChaptersFromDescription(
          description,
          videoDuration
        );
        setVideoChapters(chapters);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Axios error:", error.response?.data);
        } else {
          console.error("Failed to fetch video chapters:", error);
        }
      }
    },
    [currentVideoId]
  );

  // useEffect hook to handle time updates of the video element.
  useEffect(() => {
    const videoElement = document.querySelector("video");
    if (!videoElement) return;

    const handleTimeUpdate = () => {
      console.log("Current video time:", videoElement.currentTime);
      setCurrentTime(videoElement.currentTime);
    };

    videoElement.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      videoElement.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  return (
    <VideoProgressContext.Provider
      value={{
        currentTime,
        setCurrentTime: updateTime,
        videoChapters,
        fetchVideoChapters,
        videoTitle,
        channelTitle,
      }}
    >
      {children}
    </VideoProgressContext.Provider>
  );
};

// useVideoProgress hook provides access to the VideoProgressContext.
export const useVideoProgress = (): VideoProgressContextType => {
  const context = useContext(VideoProgressContext);
  if (!context) {
    throw new Error(
      "useVideoProgress must be used within a VideoProgressProvider"
    );
  }
  return context;
};
