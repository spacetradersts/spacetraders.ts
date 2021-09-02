const { readFile, writeFile } = require('fs/promises');

(async () => {
try {

    const data = await import('./dist/src/index.js');

    await writeFile('dist/src/index.mjs', `export { ${Object.keys(data).filter(key => key != '__esModule' && key != 'default').join(',\n')} } from './index.js';`);

    const RESTManagerData = await readFile('dist/src/rest/RESTManager.js', { encoding: 'utf-8' });

    await writeFile('dist/src/rest/RESTManager.js', RESTManagerData.replace("require('node-fetch')", 'import("node-fetch")'));

    console.log('compileMjs.js: success');

} catch (err) {
    console.error(err);
}
})();