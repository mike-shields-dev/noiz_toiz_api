import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { dbCredentials } from './credentials';
import { ConfigService } from '@nestjs/config';

const { user, password, host, database, port } = dbCredentials;
@Injectable()
export class DatabaseService {
  private readonly pool: Pool;

  constructor(private configService: ConfigService) {
    const connectionString = `postgresql://${user}:${password}@${host}:${port}/${database}?sslmode=verify-full`;
    this.pool = new Pool({
      connectionString: connectionString,
    });
  }

  async test() {
    const dbUser = this.configService.get<string>('DB_USER');
    console.log({ dbUser });
  }

  async executeQuery(query: string, values: any[] = []): Promise<any> {
    const client = await this.pool.connect();
    try {
      const result = await client.query(query, values);
      return result.rows;
    } finally {
      client.release(); // Release the client back to the pool
    }
  }

  async disconnect(): Promise<void> {
    await this.pool.end(); // End all connections in the pool
  }
}
