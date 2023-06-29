import { Command } from 'commander';
import * as fs from 'fs';
import { capitalizeName, clearUnicodeCharacters } from 'diginext-utils/dist/string';
import { makeSlug } from 'diginext-utils/dist/Slug';

const program = new Command();

const generateName = (name: string) => {
    //
    name = capitalizeName(clearUnicodeCharacters(name)).replace(' ', '');
    return name;
};

const generateFileName = (name: any) => {
    //

    name = makeSlug(clearUnicodeCharacters(name));
    return name;
};

(async () => {
    //get commands

    program
        .name('np')
        .description('CLI to Generate new page in nextjs')
        .version(require('../package.json').version);

    program.option('-e, --example', 'is examples');

    program.parse(process.argv);
    const options = program.opts();
    const { args } = program;
    const { example } = options;

    const DIR_NAME = process.cwd();

    const pathPages = example
        ? args.map((x) => {
              const name = generateName(x);
              const nameComponent = `Page${name}`;
              const fileName = generateFileName(x);
              return {
                  name,
                  nameComponent,
                  fileName,
                  page: `src/pages/examples/${fileName}.tsx`,
                  component: `src/components/router/examples/${nameComponent}.tsx`,
              };
          })
        : args.map((x) => {
              const name = generateName(x);
              const nameComponent = `Page${name}`;
              const fileName = generateFileName(x);
              return {
                  name,
                  nameComponent,
                  fileName,
                  page: `src/pages/${fileName}.tsx`,
                  component: `src/components/router/${nameComponent}.tsx`,
              };
          });

    // console.log('pathPage :>> ', pathPages);

    await Promise.all(
        pathPages.map(({ name, nameComponent, fileName, page, component }) => {
            const contentPage = fs
                .readFileSync('../templates/ts/0.1/pages/page-name.txt', 'utf-8')
                .replace(/@@PAGE_FILE_NAME/g, name);
            const contentComponent = fs
                .readFileSync('../templates/ts/0.1/components/page-name.txt', 'utf-8')
                .replace(/@@PAGE_FILE_NAME/g, name);

            const pagePath = `${DIR_NAME}/${page}`.replace(`/${fileName}.tsx`, '');
            const componentPath = `${DIR_NAME}/${component}`.replace(`/${nameComponent}.tsx`, '');

            // console.log('pagePath :>> ', pagePath);
            // console.log('componentPath :>> ', componentPath);

            if (!fs.existsSync(pagePath)) {
                fs.mkdirSync(pagePath, { recursive: true });
            }

            if (!fs.existsSync(componentPath)) {
                fs.mkdirSync(componentPath, { recursive: true });
            }

            fs.writeFileSync(`${DIR_NAME}/${page}`, contentPage);
            fs.writeFileSync(`${DIR_NAME}/${component}`, contentComponent);
        })
    );

    //
})();
