const { Client } = require('pg');
require('dotenv').config();

const SQL = `
CREATE TABLE users (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
                    firstName VARCHAR (255), lastName VARCHAR (255),
                    nickName VARCHAR (255), password VARCHAR (255), admin BOOLEAN);

CREATE TABLE messages (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, nickname TEXT, message TEXT, date TIMESTAMP);

INSERT INTO messages (nickname, message, date) 
  VALUES ('Stroganov Nikita', 'Yea Im finish the project', '${new Date().toISOString()}');
`

async function main() {
    console.log('Seeding...');
    const client = new Client();

    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log('Done!')
};

main();