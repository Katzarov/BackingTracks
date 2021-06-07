function _getHostNameFromUrl(url: string): string {
    return new URL(url).hostname;
}

export function isYouTubeUrl(url: string): boolean {
    return _getHostNameFromUrl(url) === "www.youtube.com";
}

export function isGuitarBackingTrackUrl(url: string): boolean {
    return _getHostNameFromUrl(url) === "www.guitarbackingtrack.com";
}
