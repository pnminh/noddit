import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Topic } from './Topic';

@Entity()
export class Post {
  constructor(title: string = null, body: string = null, topic: Topic = null) {
    this.title = title;
    this.body = body;
    this.topic = topic;
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  title: string;

  @Column()
  @IsNotEmpty()
  body: string;

  @ManyToOne(type => Topic, {
    cascade: ['insert', 'remove'],
    eager: true
  })
  topic: Topic;
}
