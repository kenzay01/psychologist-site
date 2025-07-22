"use client";

import { useCurrentLanguage } from "@/hooks/getCurrentLanguage";
import { useDictionary } from "@/hooks/getDictionary";
import { Locale } from "@/i18n/config";
import { useState, useEffect, useRef } from "react";
import { ArrowUp, ArrowDown, Play, X } from "lucide-react";

const VideoCommentsSection = () => {
  const currentLocale = useCurrentLanguage() as Locale;
  const { dict } = useDictionary(currentLocale);
  const [validVideos, setValidVideos] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(3);
  const [isDesktop, setIsDesktop] = useState(false);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<number | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const INITIAL_DESKTOP_COUNT = 8;
  const INITIAL_MOBILE_COUNT = 3;
  const INCREMENT_DESKTOP = 4;
  const INCREMENT_MOBILE = 3;

  useEffect(() => {
    const checkScreenSize = () => {
      const desktop = window.innerWidth >= 768;
      setIsDesktop(desktop);
      setDisplayCount(desktop ? INITIAL_DESKTOP_COUNT : INITIAL_MOBILE_COUNT);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const checkVideos = async () => {
      setIsLoading(true);
      const validVideoPaths: string[] = [];

      for (let i = 1; i <= 30; i++) {
        const videoPath = `/video_comments/video_comment_${i}.mp4`;
        try {
          const response = await fetch(videoPath, { method: "HEAD" });
          if (response.ok) {
            validVideoPaths.push(videoPath);
          } else {
            break;
          }
        } catch (error) {
          console.error(`Error fetching video ${videoPath}:`, error);
          break;
        }
      }

      setValidVideos(validVideoPaths);
      setIsLoading(false);
    };

    checkVideos();
  }, []);

  const displayedVideos = validVideos.slice(0, displayCount);

  const handleShowMore = () => {
    setDisplayCount(
      (prev) => prev + (isDesktop ? INCREMENT_DESKTOP : INCREMENT_MOBILE)
    );
  };

  const handleShowLess = () => {
    const reviewsPosition = document.getElementById("videoCommentsContainer");
    if (reviewsPosition) {
      try {
        reviewsPosition.scrollIntoView({ behavior: "smooth", block: "start" });
      } catch (error) {
        const rect = reviewsPosition.getBoundingClientRect();
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        const targetY = rect.top + scrollTop;
        window.scrollTo({ top: targetY, behavior: "smooth" });
        console.error(error);
      }
    }
    setTimeout(() => {
      setDisplayCount(isDesktop ? INITIAL_DESKTOP_COUNT : INITIAL_MOBILE_COUNT);
    }, 300);
  };

  const openVideoModal = (videoIndex: number) => {
    setSelectedVideoIndex(videoIndex);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeVideoModal = () => {
    setIsModalOpen(false);
    setSelectedVideoIndex(null);
    document.body.style.overflow = "unset";
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleModalBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeVideoModal();
    }
  };

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        closeVideoModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isModalOpen]);

  const canShowMore = validVideos.length > displayCount;
  const canShowLess =
    displayCount > (isDesktop ? INITIAL_DESKTOP_COUNT : INITIAL_MOBILE_COUNT);

  return (
    <div className="py-8 bg-white" id="videoCommentsContainer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 text-center">
          {dict?.testimonials?.title || "Відео відгуки"}
          <div className="w-24 h-1 bg-red-500 mx-auto mt-4"></div>
        </h2>
        <p className="text-center text-gray-600 mb-8">
          {dict?.testimonials?.description ||
            "Думки наших клієнтів у відео форматі"}
        </p>

        {isLoading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-500 border-t-transparent mx-auto"></div>
          </div>
        ) : validVideos.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">
              {dict?.testimonials?.noVideos || "Відео відгуки не знайдено"}
            </p>
          </div>
        ) : (
          <>
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
              {displayedVideos.map((video, index) => (
                <div
                  key={video}
                  className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 break-inside-avoid cursor-pointer"
                  onClick={() => openVideoModal(index)}
                >
                  <div className="relative">
                    <video
                      className="w-[400px] h-[280px] object-cover transform group-hover:scale-105 transition-transform duration-300"
                      muted
                      preload="metadata"
                    >
                      <source src={`${video}#t=1`} type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-all duration-300">
                      <div className="bg-white bg-opacity-90 rounded-full p-4 transform group-hover:scale-110 transition-transform duration-300">
                        <Play className="w-8 h-8 text-red-500 fill-current" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {(canShowMore || canShowLess) && (
              <div className="text-center mt-8">
                {canShowMore && (
                  <button
                    onClick={handleShowMore}
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl font-semibold text-base inline-flex items-center gap-2 justify-center hover:scale-105 transition-all duration-300 shadow-md"
                  >
                    {dict?.testimonials?.moreReviews || "Більше відгуків"}
                    <ArrowDown className="w-4 h-4" />
                  </button>
                )}
                {canShowLess && (
                  <button
                    onClick={handleShowLess}
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl font-semibold text-base inline-flex items-center gap-2 justify-center hover:scale-105 transition-all duration-300 shadow-md ml-4"
                  >
                    {dict?.testimonials?.lessReviews || "Менше відгуків"}
                    <ArrowUp className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {isModalOpen && selectedVideoIndex !== null && (
        <div
          className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-4"
          onClick={handleModalBackdropClick}
        >
          <div className="relative bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <button
              onClick={closeVideoModal}
              className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 transition-all duration-200"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="w-full">
              <video
                ref={videoRef}
                className="w-full h-auto max-h-[80vh] object-contain"
                controls
                autoPlay
                preload="metadata"
              >
                <source
                  src={validVideos[selectedVideoIndex]}
                  type="video/mp4"
                />
                Ваш браузер не підтримує відео елемент.
              </video>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCommentsSection;
