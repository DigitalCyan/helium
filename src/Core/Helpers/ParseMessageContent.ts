import CommandInterface from '../Interfaces/CommandInterface';

export default function parseMessageContent(messageContent: string): CommandInterface {
    const args: string[] = [];

    let inQuotes = false;
    let arg = '';
    const messageChars = messageContent.split('');
    messageChars.forEach((char, index) => {
        if (char == '"') {
            inQuotes = !inQuotes;
        }
        if ((char != ' ' || inQuotes) && char != '"') {
            arg += char;
        }
        if ((char == ' ' && !inQuotes) || index == messageChars.length - 1) {
            args.push(arg);
            arg = '';
        }
    });

    const command = args.shift();

    return {
        command: command,
        args: args,
    };
}
