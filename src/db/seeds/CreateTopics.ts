import { Topic } from '../entity/Topic';
import "reflect-metadata";
import {createConnection} from "typeorm";
import * as Faker from 'faker';
const env = process.env.NODE_ENV||'development'
createConnection(env).then(async connection => {
    console.log("Inserting new topics into the database...");
    for(let i = 1 ; i <= 15 ; i++){
        let topic = new Topic(Faker.hacker.noun(),Faker.hacker.phrase());
        connection.getRepository(Topic).save(topic);
      }
     
}).catch(error => console.log(error));
