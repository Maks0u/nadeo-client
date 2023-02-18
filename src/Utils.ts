export function formatTime(time: number): string {
    const minutes = `${Math.floor(time / 60000)}`.padStart(2, '0');
    const seconds = `${Math.floor((time / 1000) % 60)}`.padStart(2, '0');
    const millisec = `${Math.round((time / 1000 - Math.floor(time / 1000)) * 1000)}`.padEnd(3, '0');
    return `${minutes}:${seconds}.${millisec}`;
}
