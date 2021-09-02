const { readFile, writeFile } = require('fs/promises');

(async () => {
try {

    const data = await readFile('dist/src/index.d.ts', { encoding: 'utf-8' });

    await writeFile('dist/src/index.mjs', data);

    const RESTManagerData = await readFile('dist/src/rest/RESTManager.js', { encoding: 'utf-8' });

    await writeFile('dist/src/rest/RESTManager.js', RESTManagerData.replace("require('node-fetch')", 'import("node-fetch")'));

    console.log('compileMjs.js: success');

} catch (err) {
    console.error(err);
}
})();