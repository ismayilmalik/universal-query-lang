"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MongoDbAgent {
    constructor(col) {
        this.col = col;
    }
    find(uql) {
        return new Promise((resolve, reject) => {
            let query = this.buildWhere(uql);
            let cursor = this.col.find(query);
            if (uql.skip) {
                cursor = cursor.skip(uql.skip);
            }
            if (uql.take) {
                cursor = cursor.limit(uql.take);
            }
            if (uql.projection) {
                cursor.project(uql.projection);
            }
            cursor.toArray((err, data) => {
                if (err) {
                    return reject(err);
                }
                resolve(data);
            });
        });
    }
    buildWhere(uql) {
        let query = {};
        if (!uql.where) {
            return query;
        }
        Object.keys(uql.where).forEach(key => {
            query[key] = uql.where[key];
        });
        return query;
    }
}
exports.MongoDbAgent = MongoDbAgent;
//# sourceMappingURL=index.js.map