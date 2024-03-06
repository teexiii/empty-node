#!/usr/bin/env node

import CommanderHelper from '@/modules/helpers/commander';

(async () => {
    //

    const commandHelper = new CommanderHelper();
    commandHelper.run(process.argv);
})();
