import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Topic } from './Topic';

@Entity()
export class Banner{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  source: string;

  @Column()
  description: string;

   @ManyToOne(type =>Topic,{
     cascade:["insert","remove"]
   })
   topic:Topic;
}
