import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { NotesService } from './notes.service.js';

interface NoteBody {
  content: string;
}

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  findAll() {
    return this.notesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const note = await this.notesService.findOne(id);

    if (!note) {
      throw new NotFoundException(`Note ${id} not found`);
    }

    return note;
  }

  @Post()
  create(@Body() body: NoteBody) {
    return this.notesService.create(body.content);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: NoteBody) {
    const note = await this.notesService.update(id, body.content);

    if (!note) {
      throw new NotFoundException(`Note ${id} not found`);
    }

    return note;
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const removed = await this.notesService.remove(id);

    if (!removed) {
      throw new NotFoundException(`Note ${id} not found`);
    }
  }
}
