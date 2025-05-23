export function truncateString(text: string, limit: number): string {
    if (text.length <= limit) return text;
    const truncated = text.slice(0, limit);
    return truncated.slice(0, truncated.lastIndexOf(' ')) + '...';
}