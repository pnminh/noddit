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
  getByIdWithPosts = async (id: number): Promise<Topic> => {
    let topic = await this.getById(id);
    //let posts = await this.postRepostory.getByTopicId(id);
    //topic.posts = posts;
    return topic;
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
