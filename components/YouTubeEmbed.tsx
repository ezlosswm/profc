type YouTubeEmbedProps = {
  videoId: string;
  title?: string;
};

export default function YouTubeEmbed({
  videoId,
  title = "YouTube video",
}: YouTubeEmbedProps) {
  return (
    <div className="aspect-video max-w-7xl mx-auto overflow-hidden rounded-xl">
      <iframe
        className="h-full w-full"
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&muted=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
}
