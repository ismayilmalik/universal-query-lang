"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const mongodb_2 = require("../../data-agents/mongodb");
class MongoDbProvider {
    constructor(connectionString) {
        this.connectionString = connectionString;
    }
    connect(dbName) {
        return new Promise((resolve, reject) => {
            mongodb_1.MongoClient.connect(this.connectionString, (err, client) => {
                if (err) {
                    return reject(err);
                }
                this.client = client;
                this.db = client.db(dbName);
                resolve('Ok');
            });
        });
    }
    getDataAgent(entity) {
        if (!this.db) {
            throw new Error('Connection is not properly initialized');
        }
        const collection = this.db.collection(entity);
        return new mongodb_2.MongoDbAgent(collection);
    }
    close() {
        if (this.client) {
            this.client.close();
        }
    }
}
exports.MongoDbProvider = MongoDbProvider;
//# sourceMappingURL=index.js.map