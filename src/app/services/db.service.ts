import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private sqlite: SQLiteConnection;
  private db!: SQLiteDBConnection;

  constructor() {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
  }

  private DB_NAME = 'alerts';

  async initializeSQLite() {
    try {
        if (this.db !== undefined) {
          return;
        }

        if (await this.sqlite.checkConnectionsConsistency()) {
          this.db = await this.sqlite.createConnection(this.DB_NAME, false, 'no-encryption', 1, false);
        }
        else {
          this.db = await this.sqlite.retrieveConnection(this.DB_NAME, false);
        }

        await this.db.open();

        await this.db.execute(`CREATE TABLE IF NOT EXISTS reports (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              report TEXT NOT NULL
          );`);

      // Database is ready to use
    } catch (e) {
      console.error('Error initializing SQLite database', e)
    }
  }

  async saveReport(report: any) {
    await this.initializeSQLite();
    await this.db.run(`INSERT INTO reports(report) VALUES(?)`, [JSON.stringify(report)], false);
  }

  async getAll() {
    await this.initializeSQLite();
    return this.db.query('SELECT * FROM reports');
  }

  async delete(id: number) {
    await this.initializeSQLite();
    return await this.db.run(`DELETE FROM reports WHERE id = ?`, [id]);
  }

  async deleteAll() {
    await this.initializeSQLite();
    return await this.db.run(`DELETE FROM reports`);
  }
}
