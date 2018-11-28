import { Topic } from '../../src/db/entity/Topic';
import "reflect-metadata";
import {createConnection} from "typeorm";
import {Banner} from "../../src/db/entity/Banner";
const env = process.env.NODE_ENV||'development'
createConnection(env).then(async connection => {
    console.log("Inserting a new user into the database...");
    const banner = new Banner();
    banner.description = "banner 1";
    banner.source = "from topic 1";
    const topic = new Topic();
    topic.title = 'topic 1';
    topic.description = "topic 1 desc";
    topic.banners = [banner];
    await connection.manager.save(topic);
    console.log("Saved a new user with id: " + banner.id);
    
    console.log("Loading topics from the database...");
    const topics = await connection.manager.find(Topic);
    console.log("Loaded topics: ", topics);
     
    console.log("Here you can setup and run express/koa/any other framework.");
}).catch(error => console.log(error));
