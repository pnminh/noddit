import { Length, MinLength, IsNotEmpty, IsInt } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Topic } from './Topic';

@Entity()
export class Post {
  constructor(title: string = null, body: string = null, topicId: number = null) {
    this.title = title;
    this.body = body;
    this.topicId = topicId;
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @MinLength(2,{message:'$property must be at least 2 characters in length'})
  title: string;

  @Column({ nullable: false })
  @MinLength(10,{message:'$property must be at least 10 characters in length'})
  body: string;

  @Column({ nullable: true, type: 'int' })
  @IsNotEmpty()
  @IsInt()
  topicId:number;

  @ManyToOne(type => Topic, topic => topic.posts, {
    //insert cascade cause the foreign key set to null, probably a bug
    onDelete: 'CASCADE',
    eager: true
  })
  @JoinColumn({ name: 'topicId' })
  topic: Topic;
}
