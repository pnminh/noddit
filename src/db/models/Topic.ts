import { Banner } from './Banner';
import {
  Table,
  Column,
  Model,
  HasMany,
  PrimaryKey,
  AutoIncrement
} from 'sequelize-typescript';
@Table
export class Topic extends Model<Topic> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  title: string;

  @Column
  description: string;

  @HasMany(() => Banner)
  banners: Banner;
}
