import { Db, MongoClient, Collection } from "mongodb";
import { IDataAgent, IDbPRovider } from "../../interfaces";
import { MongoDbAgent } from "../../data-agents/mongodb";

export class MongoDbProvider implements IDbPRovider {

    private db: Db;
    private client: MongoClient;
    private readonly connectionString: string;

    constructor(connectionString: string) {
        this.connectionString = connectionString;
    }

    public connect(dbName: string): Promise<any> {
        return new Promise((resolve, reject) => {
            MongoClient.connect(this.connectionString, (err, client) => {
                if (err) {
                    return reject(err);
                }

                this.client = client;
                this.db = client.db(dbName);
                resolve('Ok');
            });
        });
    }

    public getDataAgent<T>(entity: string): IDataAgent<T> {

        if (!this.db) {
            throw new Error('Connection is not properly initialized');
        }

        const collection: Collection = this.db.collection(entity);
        return new MongoDbAgent(collection);
    }

    public close() {
        if (this.client) {
            this.client.close();
        }
    }
}