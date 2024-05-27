// src/app.module.ts

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SignupController } from './signup/signup.controller';
import { DatabaseModule } from './database/database.module'; // Import DatabaseModule

@Module({
  imports: [AuthModule, UsersModule, DatabaseModule], // Import DatabaseModule here
  controllers: [AppController, SignupController],
  providers: [AppService],
})
export class AppModule {}
