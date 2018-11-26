import * as Sequelize from "sequelize";
interface IBannerAttributes {
  id?: Int32Array; // id is an auto-generated UUID
  name: string;
  price: string; // DOUBLE is a string to preserve floating point precision
  archived?: boolean; // is false by default
  createdAt?: string;
  updatedAt?: string;
}
type BannerInstance = Sequelize.Instance<IBannerAttributes>;
/* import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo
} from 'sequelize-typescript';
import { Topic } from './Topic';
@Table
export class Banner extends Model<Banner> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  source: string;

  @Column
  description: string;

  @ForeignKey(() => Topic)
  @Column
  topicId: number;

  @BelongsTo(() => Topic)
  topic: Topic;
}
 */