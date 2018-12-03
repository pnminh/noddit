import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Post } from './Post';

@Entity()
export class Topic {
  constructor(title: string = null, description: string = null) {
    this.title = title;
    this.description = description;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @OneToMany(type => Post, post => post.topic)
  posts: Post[];
}
