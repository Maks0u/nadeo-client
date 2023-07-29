import logger from 'logger';
import { inspect } from 'util';
export function escape(string) {
    return string.replace(/\$[oiwntslgz]|\$[\w]{3}|\$/gim, '');
}
export function formatTime(time) {
    const minutes = `${Math.floor(time / 60000)}`.padStart(2, '0');
    const seconds = `${Math.floor((time / 1000) % 60)}`.padStart(2, '0');
    const millisec = `${Math.round((time / 1000 - Math.floor(time / 1000)) * 1000)}`.padStart(3, '0');
    return `${minutes}:${seconds}.${millisec}`;
}
export function requestLogger(response) {
    logger.http(`${response.config.method} \u00b7 ${response.config.url} \u00b7 ${response.status} ${response.statusText}`);
    logger.debug(inspect(response.data, { depth: 1, maxArrayLength: 6 }));
    return response;
}
export function requestErrorLogger(error) {
    logger.error(`${error.config?.method} \u00b7 ${error.config?.url} \u00b7 ${error.response?.status} ${error.response?.statusText}`);
}
