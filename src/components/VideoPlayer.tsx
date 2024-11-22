"use client";

import React, { useEffect, useRef } from "react";
import { VideoContainer } from "./VideoPlayer.styles";
import { useVideoProgress } from "@/hooks/useVideoProgress";

interface VideoPlayerProps {
  videoId: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId }) => {
  const { currentTime, setCurrentTime, fetchVideoChapters } =
    useVideoProgress();
  const playerRef = useRef<YT.Player | null>(null);

  useEffect(() => {
    const loadYouTubeAPI = () => {
        if (!("YT" in window)) {
          const tag = document.createElement("script");
          tag.src = "https://www.youtube.com/iframe_api";
          const firstScriptTag = document.getElementsByTagName("script")[0];
          firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
        } else {
          onYouTubeIframeAPIReady();
      }
    };

    const onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player("yt-player", {
        videoId,
        events: {
          onReady: () => {
            fetchVideoChapters(videoId);
          },

          // Event handler for state changes of the player
          onStateChange: (event: { data: number }) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              const interval = setInterval(() => {
                const currentTime = playerRef.current?.getCurrentTime() || 0;
                setCurrentTime(currentTime);
              }, 1000);

              return () => clearInterval(interval);
            }
          },
        },
      });
    };

    loadYouTubeAPI();

    // Assign the API ready callback to the window object
    window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

    return () => {
      // Cleanup function to destroy the player instance
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [videoId, setCurrentTime, fetchVideoChapters]);

  // Updates the player time to match currentTime state for smooth playback.
  useEffect(() => {
    if (
      playerRef.current &&
      Math.abs(playerRef.current.getCurrentTime() - currentTime) > 0.5
    ) {
      playerRef.current.seekTo(currentTime, true);
    }
  }, [currentTime]);

  return (
    <VideoContainer>
      <div id="yt-player" />
    </VideoContainer>
  );
};
