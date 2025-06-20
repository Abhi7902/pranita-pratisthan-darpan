
// Helper to extract the actual video ID from various YouTube URL formats or plain ID.
export function extractYouTubeVideoId(urlOrId: string): string {
  if (!urlOrId) return '';
  
  // Clean the input string
  const cleanUrl = urlOrId.trim();
  
  // Plain video ID (11 characters, alphanumeric and dashes/underscores)
  if (/^[a-zA-Z0-9_-]{11}$/.test(cleanUrl)) return cleanUrl;
  
  // youtu.be short links
  let match = cleanUrl.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (match) return match[1];
  
  // youtube.com/watch?v=
  match = cleanUrl.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (match) return match[1];
  
  // Shorts
  match = cleanUrl.match(/shorts\/([a-zA-Z0-9_-]{11})/);
  if (match) return match[1];
  
  // youtube.com/embed/ links
  match = cleanUrl.match(/embed\/([a-zA-Z0-9_-]{11})/);
  if (match) return match[1];
  
  // youtube.com/v/ links
  match = cleanUrl.match(/\/v\/([a-zA-Z0-9_-]{11})/);
  if (match) return match[1];
  
  // If all fails, return empty string to avoid invalid embeds
  return '';
}

// Generate proper YouTube embed URL with necessary parameters
export function getYouTubeEmbedUrl(videoId: string): string {
  if (!videoId) return '';
  
  const cleanVideoId = extractYouTubeVideoId(videoId);
  if (!cleanVideoId) return '';
  
  // Add parameters to ensure better compatibility and playback
  const embedParams = new URLSearchParams({
    rel: '0', // Don't show related videos
    modestbranding: '1', // Reduce YouTube branding
    enablejsapi: '1', // Enable JavaScript API
    origin: window.location.origin // Set origin for security
  });
  
  return `https://www.youtube.com/embed/${cleanVideoId}?${embedParams.toString()}`;
}
