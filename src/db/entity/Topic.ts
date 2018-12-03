import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Post } from './Post';

@Entity()
export class Topic {
  constructor(
    title: string = null,
    description: string = null,
    posts: Post[] = null
  ) {
    this.title = title;
    this.description = description;
    this.posts = posts;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @OneToMany(type => Post, post => post.topic)
  /**
   * cannot use eager loading for both sides
   * Failed: Circular eager relations are disallowed. Topic#posts contains
   * "eager: true", and its inverse side Post#topic contains "eager: true" as well.
   * Remove "eager: true"from one side of the relation.
   * */
  posts: Post[];
}
