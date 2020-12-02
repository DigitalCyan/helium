# Helium
Helium is a simple and lightweight Discord bot framework writtein in typescript. It also comes with a pre made help command that is generated based on the command's you've added.

# Setting up
1. Clone the repository:
```
git clone htts://github.com/DigitalCyan/helium
```

2. Hop into it:
```
cd helium
```

3. Install the dependencies:
```
yarn install
```

4. Create a `.env` file:
```
touch .env
```

5. Set your environment variables in the `.env` file. (Check `.env.example` to see how it's done)

6. Run the dev script:
```
yarn dev
```

7. Go to the discord server and send your bot a command!

# Features and structure
## Command modules
`src/Commands`

This is where you add your command modules. They should be a default export of an object that implements the `CommandModule` interface. By doing so it's picked up by the autoloader on bot startup and added to a map of commands.

Example from `src/Commands/Example.ts`
```ts
import { Message } from 'discord.js';
import BotMaster from '../Classes/BotMaster';
import CommandModule from '../Interfaces/CommandModule';

const module: CommandModule = {
    command: 'example',
    description: 'Example command!',
    usage: `${BotMaster.instance.prefix}example`,
    function: (msg: Message) => {
        msg.channel.send(
            'Hello! This is an example command! Please dont forget to remove it!'
        );
    },
};

export default module;
```

## Startup modules
`src/Startup`

This is where you add your startup modules. Tkey should be a default export of an object that implements the `StartupModule` interface. They are executed before the bot goes online.

Example from `src/Startup/Example.ts`
```ts
import StartupModule from '../Interfaces/StartupModule';

const module: StartupModule = {
    name: 'Example',
    function: () => {
        console.log('Example startup module function executed!');
    },
};

export default module;
```