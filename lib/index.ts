import { MongoDbProvider } from "./db-providers/mongodb";

const db = new MongoDbProvider('mongodb://localhost:27017');
db.connect('bookstore')
    .then(ok => {
        const books = db.getDataAgent('books');
        return books.find({
            where: {
                pages: 190
            },
            take: 1,
            skip: 1,
            projection: { title: true, year: true }
        });
    })
    .then(data => {
        console.log(data);
        db.close();
    })
    .catch(err => {
        console.log(err);
        db.close();
    });