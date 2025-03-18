import pg from "pg";
const { Client } = pg;

export default async function getConnection() {
  const client = new Client({
    host: "localhost",
    port: 5432,
    user: "mcabos",
    password: "admin123",
    database: "my_store",
  });

  await client.connect();

  return client;
}
