const pool = require('../utils/pool');

module.exports = class Post {
  id;
  title;
  content;
  username;

  constructor({ id, title, content }) {
    this.id = id;
    this.title = title;
    this.content = content;
  }
  static async getAll() {
    const { rows } = await pool.query(
      'SELECT * FROM posts ORDER BY id DESC'
    );
    return rows.map(row => new Post(row));
  }
  static async insert({ title, content }) {
    const { rows } = await pool.query(
      'INSERT INTO posts (title, content) VALUES ($1, $2) RETURNING *',
      [title, content]
    );
    return new Post(rows[0]);
  }
};
