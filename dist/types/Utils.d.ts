import { AxiosError, AxiosResponse } from 'axios';
export declare function escape(string: string): string;
export declare function formatTime(time: number): string;
export declare function requestLogger(response: AxiosResponse): AxiosResponse;
export declare function requestErrorLogger(error: AxiosError): void;
