import * as chalk from 'chalk';
export const message = (message: any) => {
    console.log(message);
};

export const good = (message: any) => {
    console.log(chalk.green(message));
};

export const warning = (message: any) => {
    console.log(chalk.yellow(message));
};

export const error = (message: any, error?: string) => {
    console.log(chalk.red(message));
    if (error) {
        console.log(chalk.red(error));
    }
};
