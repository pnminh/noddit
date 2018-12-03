import { Connection, Repository } from 'typeorm';

import { RepositoryConfig } from './../config/RepositoryConfig';
import { Topic } from './../db/entity/Topic';

export class TopicRepository {
  topicRepository: Repository<Topic>;

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
  getById = async (id: number): Promise<Topic> => {
    await this.initialize();
    return this.topicRepository.findOne(id);
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
    let topic = await this.topicRepository.findOne(topicToUpdate.id);
    topic.title = topicToUpdate.title;
    topic.description = topicToUpdate.description;
    return this.topicRepository.save(topic);
  };
}
