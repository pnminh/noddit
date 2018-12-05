# Awesome Project Build with TypeORM
        
Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. Run `npm start` command

To run migration:
1. In development environment:
a. run yarn typeorm cli as we run directly .ts files (https://github.com/typeorm/typeorm/issues/1675)
    e.g yarn typeorm  migration:run -c test => run migration against test connection;yarn typeorm migration:generate -c test -n Post
2. In production:
- push to github
- go to heroku, disable auto build/deploy, then select branch and re-enable auto build/deploy
- run a build
- run heroku run typeorm, e.g heroku run typeorm migration:run -c production
3. Run seed file:
heroku run node build/db/seeds/CreateTopics.js