const { readFile, writeFile } = require('fs/promises');

(async () => {
try {

    const data = await import('./dist/src/index.js');

    await writeFile('dist/src/index.mjs', `export { ${Object.keys(data).filter(key => key != '__esModule' && key != 'default').join(',\n')} } from './index.js';`);

    console.log('compileMjs.js: success');

} catch (err) {
    console.error(err);
}
})();