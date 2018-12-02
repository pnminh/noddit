
module.exports = [{
        "name": "development",
        "type": "sqlite",
        "username": "test",
        "password": "test",
        "database": "src/db/sqlite_dbs/dev.db",
        "entities": [
            "src/db/entity/*.ts"
        ],
        "subscribers": [
            "src/db/subscriber/*.ts"
        ],
        "migrations": [
            "src/db/migration/*.ts"
        ],
        "cli": {
            "entitiesDir": "src/db/entity",
            "migrationsDir": "src/db/migration",
            "subscribersDir": "src/db/subscriber"
        },
        "synchronize": false,
        "migrationsRun": true
    },
    {
        "name": "test",
        "type": "sqlite",
        "username": "test",
        "password": "test",
        "database": "src/db/sqlite_dbs/test.db",
        "entities": [
            "src/db/entity/*.ts"
        ],
        "subscribers": [
            "src/db/subscriber/*.ts"
        ],
        "migrations": [
            "src/db/migration/*.ts"
        ],
        "cli": {
            "entitiesDir": "src/db/entity",
            "migrationsDir": "src/db/migration",
            "subscribersDir": "src/db/subscriber"
        },
        "synchronize": false,
        "migrationsRun": true
    },
    {
        "name": "production",
        "url": process.env.DATABASE_URL,
        "type": "postgres",
        "synchronize": false,
        "extra": {
            "ssl": true
        },
        "entities": [
            "build/db/entity/*.js"
        ],
        "subscribers": [
            "build/db/subscriber/*.js"
        ],
        "migrations": [
            "build/db/migration/*.js"
        ],
        "cli": {
            "entitiesDir": "build/db/entity",
            "migrationsDir": "build/db/migration",
            "subscribersDir": "build/db/subscriber"
        }
    }
]