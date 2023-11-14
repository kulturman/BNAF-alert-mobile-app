import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class DbService {
  async initializeSQLite() {
    const sqlite = new SQLiteConnection(CapacitorSQLite);
    try {
      const db: SQLiteDBConnection = await sqlite.createConnection('my-database', false, 'no-encryption', 1, false);
      await db.open();

      // Create a new table if it doesn't exist
      await db.execute(`CREATE TABLE IF NOT EXISTS my_table (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
        );`);

      // Database is ready to use
    } catch (e) {
      console.error('Error initializing SQLite database', e);
    }
  }
}
