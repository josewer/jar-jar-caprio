import db from './db.js';

export class Exercise {
  async get () {
    const data = await db.query('select * from exercise');
    return data.rows;
  }

  async getById ({ id }) {
    const query = 'select * from exercise where id = $1';
    const values = [id];
    const data = await db.query(query, values);
    return data.rows;
  }

  async delete ({ id }) {
    const query = 'delete from exercise where id = $1';
    const values = [id];
    const data = await db.query(query, values);
    return data.rowCount !== 0;
  }

  async post ({ input }) {
    const values = [
      crypto.randomUUID(),
      input.name,
      input.muscle,
      input.category
    ];

    const query = `
            insert into exercise (id , name , muscle , category) 
            values ($1 , $2 , $3 , $4)
            RETURNING *;
            `;

    const data = await db.query(query, values);
    return data.rows[0];
  }

  async put ({ id, input }) {
    const values = [
      id,
      input.name,
      input.muscle,
      input.category
    ];

    const query = `
            UPDATE EXERCISE 
            SET NAME = $2 , MUSCLE = $3 , CATEGORY = $4
            WHERE ID = $1
            RETURNING *;
            `;

    const data = await db.query(query, values);

    if (data.rowCount === 0) return false;

    return data.rows[0];
  }
}
