/* eslint-disable @typescript-eslint/no-explicit-any */
import chalk from 'chalk';
export default function todo(message?: any, ...optionalParams: any[]) {
    //
    //
    try {
        console.log(chalk.yellow('[TODO]', message, ...optionalParams));
    } catch (error) {
        console.error(`todo error`, error);
    }
}
