import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Banner } from './Banner';

@Entity()
export class Topic {
  constructor(title: string, description: string) {
    this.title = title;
    this.description = description;
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @OneToMany(type => Banner, banner => banner.topic)
  banners: Banner[];
}
