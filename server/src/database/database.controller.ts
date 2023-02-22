import { Controller, Get } from '@nestjs/common';
import { ConnectionOptions, createConnection } from 'typeorm';

@Controller('database')
export class DatabaseController {
  @Get()
  async checkConnection() {
    const connectionOptions: ConnectionOptions = {
      type: 'mongodb',
      url: process.env.MONGO_URI,
    };

    try {
      const connection = await createConnection(connectionOptions);
      const isConnected = await connection.isConnected;
      await connection.close();
      if (isConnected) {
        return 'Database connection successful';
      } else {
        return 'Database connection failed';
      }
    } catch (error) {
      return `Database connection failed: ${error.message}`;
    }
  }
}
