import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { HealthController } from './health.controller.js';
import { Note } from './notes/note.entity.js';
import { NotesController } from './notes/notes.controller.js';
import { NotesService } from './notes/notes.service.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: Number(process.env.DB_PORT ?? 5432),
      username: process.env.DB_USER ?? 'lab',
      password: process.env.DB_PASSWORD ?? 'lab123',
      database: process.env.DB_NAME ?? 'notes',
      autoLoadEntities: true,
      synchronize: true, // chỉ dùng cho lab, production phải dùng migration
    }),
    TypeOrmModule.forFeature([Note]),
  ],
  controllers: [AppController, NotesController, HealthController],
  providers: [AppService, NotesService],
})
export class AppModule {}
