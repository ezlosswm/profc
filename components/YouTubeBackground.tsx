type YouTubeBackgroundProps = {
  videoId: string;
};

export default function YouTubeBackground({ videoId }: YouTubeBackgroundProps) {
  return (
    <div className="absolute inset-0 -z-20 size-full overflow-hidden">
      <iframe
        className="pointer-events-none absolute left-1/2 top-1/2
    h-[56.25vw] min-h-full w-[177.78vh] min-w-full
    -translate-x-1/2 -translate-y-1/2"
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&playsinline=1&rel=0&cc_load_policy=0`}
        title="Background video"
        allow="autoplay; encrypted-media"
        referrerPolicy="strict-origin-when-cross-origin"
        tabIndex={-1}
      />
    </div>
  );
}
