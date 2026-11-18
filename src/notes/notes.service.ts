import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { Note } from './note.entity.js';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly notesRepository: Repository<Note>,
  ) {}

  findAll(): Promise<Note[]> {
    return this.notesRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  findOne(id: number): Promise<Note | null> {
    return this.notesRepository.findOneBy({ id });
  }

  create(content: string): Promise<Note> {
    const note = this.notesRepository.create({ content });
    return this.notesRepository.save(note);
  }

  async update(id: number, content: string): Promise<Note | null> {
    const note = await this.findOne(id);

    if (!note) {
      return null;
    }

    note.content = content;
    return this.notesRepository.save(note);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.notesRepository.delete(id);
    return result.affected === 1;
  }
}
