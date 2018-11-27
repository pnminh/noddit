import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Banner } from './Banner';

@Entity()
export class Topic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @OneToMany(type => Banner, banner => banner.topic)
  banners: Banner[];
}
