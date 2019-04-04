const console = require('console');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

const DB_PATH = 'database/database.sqlite';

fs.writeFile(DB_PATH, '', { flag: 'a' }, (err) => {
  if (err) {
    throw err;
  }
});
const db = new sqlite3.Database(DB_PATH);

db.serialize(() => {
  db.run('CREATE TABLE lorem (info TEXT)');

  const stmt = db.prepare('INSERT INTO lorem VALUES (?)');
  for (let i = 0; i < 10; i++) {
    stmt.run(`Ipsum ${i}`);
  }
  stmt.finalize();

  db.each('SELECT rowid AS id, info FROM lorem', (err, row) => {
    console.log(`${row.id}: ${row.info}`);
  });
});

db.close();
