import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service'; // Import DatabaseService
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [DatabaseService], // Provide the DatabaseService
  exports: [DatabaseService], // Export the DatabaseService to make it accessible in other modules
})
export class DatabaseModule {} // Export the DatabaseModule
