// CommanderHelper.ts
import { Command } from 'commander';
import { version } from '@/../package.json';
import defaultClone from '@/modules/workflow/defaultClone';

class CommanderHelper {
    program: Command;

    constructor() {
        this.program = new Command();
        this.configureCommands();
    }

    private configureCommands(): CommanderHelper {
        this.program
            .version(version)
            .description('An alternative CLI for creating CodeFast projects.')
            .argument('[dir]', 'Optional directory to clone into', '')
            .action((dir) => {
                defaultClone(dir);
            });

        return this;
    }

    public run(args: string[]): void {
        this.program.parse(args);
    }
}

export default CommanderHelper;
