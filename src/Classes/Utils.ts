import * as chalk from 'chalk';

export const logError = (error: string) => {
    console.log(chalk.red(`ERROR | ${error}`));
};

export const logGood = (message: string) => {
    console.log(chalk.green(message))
}