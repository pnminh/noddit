import { Topic } from '../entity/Topic';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as Faker from 'faker';
import { Post } from '../entity/Post';
const env = process.env.NODE_ENV || 'development';
createConnection(env)
  .then(async connection => {
    console.log('Inserting new topics into the database...');
    for (let i = 1; i <= 15; i++) {
      let topic = new Topic(Faker.hacker.noun(), Faker.hacker.phrase());
      topic = await connection.getRepository(Topic).save(topic);
      if (topic.id % 2) {
        for (let i = 1; i <= 5; i++) {
          let post = new Post(Faker.name.title(), Faker.hacker.phrase(), topic.id);
          await connection.getRepository(Post).save(post);
        }
      }
    }
  })
  .catch(error => console.log(error));
