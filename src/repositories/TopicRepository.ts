import { Connection, Repository } from 'typeorm';

import { RepositoryConfig } from './../config/RepositoryConfig';
import { Topic } from './../db/entity/Topic';
import { PostRepository } from './PostRepository';

export class TopicRepository {
  topicRepository: Repository<Topic>;
  postRepostory: PostRepository = new PostRepository();
  initialize = async () => {
    if (!this.topicRepository) {
      let connection: Connection = await RepositoryConfig.setup();
      this.topicRepository = connection.getRepository(Topic);
    }
  };
  getAll = async (): Promise<Topic[]> => {
    await this.initialize();
    return this.topicRepository.find();
  };
  getById = async (id: number, eager: boolean = false): Promise<Topic> => {
    await this.initialize();
    if (!eager) {
      return this.topicRepository.findOne(id);
    } else {
      return this.topicRepository.findOne(id, { relations: ['posts'] });
    }
  };
  getByTitle = async (title: string): Promise<Topic> => {
    await this.initialize();
    return this.topicRepository.findOne({ where: { title: title } });
  };
  create = async (topic: Topic): Promise<Topic> => {
    await this.initialize();
    return this.topicRepository.save(topic);
  };
  delete = async (id: number) => {
    await this.initialize();
    return this.topicRepository.delete(id);
  };
  update = async (topicToUpdate: Topic) => {
    await this.initialize();
    this.topicRepository.createQueryBuilder()
    .update(Topic)
    .set({ title: topicToUpdate.title, description: topicToUpdate.description })
    .where("id = :id", { id: topicToUpdate.id })
    .execute();
  };
}
