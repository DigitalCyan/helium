import StartupModule from '../Interfaces/StartupModule';

const module: StartupModule = {
    name: 'Example',
    function: () => {
        console.log('Example startup module function executed!');
    },
};

export default module;
