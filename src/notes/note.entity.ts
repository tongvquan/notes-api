import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
} from 'typeorm';

@Entity('notes')
export class Note {
    @PrimaryGeneratedColumn() id: number;
    @Column() content: string;
    @CreateDateColumn() createdAt: Date;
}