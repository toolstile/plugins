#!/usr/bin/env node
// Local repository contracts, not a replacement for host schema validation.
import assert from 'node:assert/strict';
import { readFile, realpath, stat } from 'node:fs/promises';
import { dirname, resolve, relative, isAbsolute } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const endpoint = 'https://mcp.toolstile.com/mcp';
const support = 'support@toolstile.com';
const publisher = 'contact@toolstile.com';
const site = 'https://www.toolstile.com';
const read = (path) => readFile(resolve(root, path), 'utf8');
const json = async (path) => {
  const value = JSON.parse(await read(path));
  assert(value && typeof value === 'object' && !Array.isArray(value), `${path}: expected an object`);
  return value;
};
const file = async (path) => {
  assert.equal(typeof path, 'string', 'local reference must be a string');
  const actual = await realpath(resolve(root, path));
  const local = relative(await realpath(root), actual);
  assert(local && !local.startsWith('..') && !isAbsolute(local), `${path}: reference must stay in the package`);
  assert((await stat(actual)).isFile(), `${path}: expected a file`);
};

async function validate() {
  const portable = await json('plugin.json');
  const claude = await json('.claude-plugin/plugin.json');
  const cursor = await json('.cursor-plugin/plugin.json');
  const marketplace = await json('.claude-plugin/marketplace.json');
  assert.match(portable.version, /^\d+\.\d+\.\d+$/, 'expected a release version');
  for (const [name, manifest] of [['portable', portable], ['Claude', claude], ['Cursor', cursor]]) {
    assert.equal(manifest.name, 'toolstile', `${name}: plugin name`);
    assert.equal(manifest.version, portable.version, `${name}: version drift`);
    assert.equal(manifest.description, portable.description, `${name}: description drift`);
    assert.equal(manifest.author?.name, 'Akshit Kr Nagpal', `${name}: author`);
    assert.equal(manifest.author?.email, publisher, `${name}: publisher contact`);
    assert.equal(manifest.homepage, site, `${name}: homepage`);
    assert.equal(manifest.repository, 'https://github.com/toolstile/plugins', `${name}: repository`);
    assert.equal(manifest.license, 'MIT', `${name}: license`);
  }
  assert.equal(portable.$schema, 'https://agent-plugins.org/schemas/1.0.0/plugin.schema.json');
  assert(!Object.hasOwn(portable.extensions ?? {}, 'com.openai'), 'obsolete com.openai extension');
  assert.equal(claude.icon, './assets/icon.png', 'Claude icon reference');
  assert.equal(cursor.logo, 'assets/icon.png', 'Cursor logo reference');
  await file(claude.icon);
  await file(cursor.logo);
  assert.equal(cursor.mcpServers, '.mcp.json', 'Cursor MCP reference');
  await file(cursor.mcpServers);
  assert.equal(claude.documentationUrl, `${site}/docs/clients/claude-code`);
  assert.equal(claude.supportUrl, `${site}/faq`, 'Claude support landing page');
  assert.equal(claude.privacyPolicyUrl, `${site}/privacy`);
  assert.equal(claude.termsOfServiceUrl, `${site}/terms`);
  assert.equal(marketplace.name, 'toolstile');
  assert.equal(marketplace.owner?.name, portable.author.name);
  assert.equal(marketplace.owner?.email, publisher);
  assert.equal(marketplace.plugins?.length, 1, 'expected one marketplace entry');
  const entry = marketplace.plugins[0];
  assert.equal(entry.name, portable.name);
  assert.equal(entry.version, portable.version, 'marketplace version drift');
  assert.equal(entry.source, './', 'marketplace must install the package root');
  for (const [path, transport] of [['.mcp.json', 'http'], ['mcp.json', 'streamable-http']]) {
    const config = await json(path);
    assert.deepEqual(config.mcpServers, { toolstile: { type: transport, url: endpoint } }, `${path}: MCP connection drift`);
    if (path === 'mcp.json') {
      assert.equal(config.$schema, 'https://agent-plugins.org/schemas/1.0.0/mcp.schema.json');
    }
  }
  const readme = await read('README.md');
  assert(readme.includes(`[${support}](mailto:${support})`), 'README: support email');
  assert(readme.includes(`[${publisher}](mailto:${publisher})`), 'README: publisher contact');
  assert(readme.includes(endpoint), 'README: MCP endpoint');
  assert(readme.includes('node scripts/validate-manifests.mjs'), 'README: validation command');
  await file('skills/toolstile-setup/SKILL.md');
  const skill = await read('skills/toolstile-setup/SKILL.md');
  assert.match(skill, /^---\r?\nname: toolstile-setup\r?\ndescription: [^\r\n]+\r?\n---/);
  assert(skill.includes(endpoint), 'setup skill: MCP endpoint');
  console.log('Validated Claude, Cursor and portable repository contracts, MCP configuration and support references.');
}

validate().catch((error) => {
  console.error(`Manifest validation failed: ${error.message}`);
  process.exitCode = 1;
});
