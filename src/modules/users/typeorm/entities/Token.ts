import { generateKey } from 'crypto';
import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('users_token')
export class Token {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  @Generated('increment')
  token: string;

  @Column()
  user_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}