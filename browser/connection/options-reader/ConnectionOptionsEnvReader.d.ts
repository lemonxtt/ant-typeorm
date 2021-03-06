import { ConnectionOptions } from "../ConnectionOptions";
/**
 * Reads connection options from environment variables.
 * Environment variables can have only a single connection.
 * Its strongly required to define TYPEORM_CONNECTION env variable.
 */
export declare class ConnectionOptionsEnvReader {
    /**
     * Reads connection options from environment variables.
     */
    read(): ConnectionOptions;
    /**
     * Transforms logging string into real logging value connection requires.
     */
    protected transformLogging(logging: string): any;
    /**
     * Converts a string which contains multiple elements split by comma into a string array of strings.
     */
    protected stringToArray(variable?: string): string[];
}
