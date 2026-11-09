import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = new URL('./', import.meta.url);
const sql = readFileSync(new URL('sql/01_create_tables.sql', root), 'utf8');
const comments = new Map([...sql.matchAll(/COMMENT ON (?:TABLE|COLUMN) ([\w."\s]+?) IS '([^']*)';/g)]
  .map(([, key, value]) => [key.replaceAll('"', ''), value]));
const tables = [...sql.matchAll(/CREATE TABLE (\w+) \(([\s\S]*?)\n\);/g)].map(([, name, body]) => {
  const pk = body.match(/PRIMARY KEY \(([^)]+)\)/)[1].split(',').map(s => s.trim());
  const columns = body.split('\n').map(s => s.trim()).filter(s => s && !s.startsWith('CONSTRAINT'))
    .map(line => {
      const [, name, type, rest] = line.match(/^("?\w+"?) (VARCHAR2\(\d+ CHAR\)|NUMBER\(\d+(?:,\d+)?\)|\w+)(.*)$/);
      return { name: name.replaceAll('"', ''), type, rest };
    });
  const checks = [...body.matchAll(/CONSTRAINT (\w+) CHECK \(([^\n]+)\)/g)];
  return { name, pk, columns, checks };
});
const refs = [...sql.matchAll(/ADD CONSTRAINT (\w+) FOREIGN KEY \((\w+)\) REFERENCES (\w+) \((\w+)\)/g)];
const foreignKeys = [...sql.matchAll(/ALTER TABLE (\w+) ADD CONSTRAINT (\w+) FOREIGN KEY \((\w+)\) REFERENCES (\w+) \((\w+)\)/g)];
const quote = value => `'${value.replaceAll("'", "\\'")}'`;
let dbml = '// Generated from sql/01_create_tables.sql by node generate-schema.mjs\n'
  + '// review.date must be quoted as review."date" in Oracle SQL.\n'
  + "Project oracle_shop {\n  database_type: 'Oracle'\n}\n";
let mermaid = 'erDiagram\n';
for (const table of tables) {
  dbml += `\nTable ${table.name} [note: ${quote(comments.get(table.name) ?? '')}] {\n`;
  mermaid += `    ${table.name} {\n`;
  for (const column of table.columns) {
    const options = [];
    if (table.pk.length === 1 && table.pk.includes(column.name)) options.push('pk');
    if (column.rest.includes('NOT NULL')) options.push('not null');
    if (column.rest.includes('IDENTITY')) options.push('increment');
    if (column.rest.includes('DEFAULT CURRENT_TIMESTAMP')) options.push('default: `CURRENT_TIMESTAMP`');
    options.push(`note: ${quote(comments.get(`${table.name}.${column.name}`) ?? '')}`);
    const name = column.name === 'date' ? '"date"' : column.name;
    const type = column.type.includes(' ') ? `"${column.type}"` : column.type.toLowerCase();
    dbml += `  ${name} ${type} [${options.join(', ')}]\n`;
    const key = table.pk.includes(column.name) ? ' PK' : foreignKeys.some(([, t,, c]) => t === table.name && c === column.name) ? ' FK' : '';
    mermaid += `        ${column.type.split('(')[0]} ${column.name}${key}\n`;
  }
  if (table.pk.length > 1) dbml += `\n  indexes {\n    (${table.pk.join(', ')}) [pk]\n  }\n`;
  if (table.checks.length) dbml += '\n  checks {\n' + table.checks.map(([, name, expr]) => `    \`${expr}\` [name: '${name}']`).join('\n') + '\n  }\n';
  dbml += '}\n';
  mermaid += '    }\n';
}
for (const [, table, name, column, target, targetColumn] of foreignKeys) {
  dbml += `\nRef ${name}: ${table}.${column} > ${target}.${targetColumn}`;
  mermaid += `    ${target} ||--o{ ${table} : ${name}\n`;
}
if (tables.length !== 6 || refs.length !== 6 || tables.reduce((n, t) => n + t.checks.length, 0) !== 3) {
  throw new Error('Expected six tables, six foreign keys and three checks');
}
for (const [name, content] of Object.entries({ 'schema.sql': sql, 'schema.dbml': dbml + '\n', 'schema.mmd': mermaid, 'diagram.md': '```mermaid\n' + mermaid + '```\n' })) {
  writeFileSync(fileURLToPath(new URL(name, root)), content, 'utf8');
}
console.log('Generated schema.sql, schema.dbml, schema.mmd and diagram.md');
