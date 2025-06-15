
// Helper to extract the actual video ID from various YouTube URL formats or plain ID.
export function extractYouTubeVideoId(urlOrId: string): string {
  if (!urlOrId) return '';
  // Plain video ID
  if (/^[\w-]{11}$/.test(urlOrId)) return urlOrId;
  // youtu.be short links
  let match = urlOrId.match(/youtu\.be\/([\w-]{11})/);
  if (match) return match[1];
  // youtube.com/watch?v=
  match = urlOrId.match(/[?&]v=([\w-]{11})/);
  if (match) return match[1];
  // Shorts
  match = urlOrId.match(/shorts\/([\w-]{11})/);
  if (match) return match[1];
  // youtube.com/embed/ links
  match = urlOrId.match(/embed\/([\w-]{11})/);
  if (match) return match[1];
  // If all fails, return the whole string
  return urlOrId;
}
