import { IQuery } from "../../query";
import { Db, Collection, Cursor } from "mongodb";
import { IDataAgent } from "../../interfaces";

export class MongoDbAgent<T> implements IDataAgent<T> {

    private readonly col: Collection;

    constructor(col: Collection) {
        this.col = col;
    }

    public 

    public find<T>(uql: IQuery): Promise<T[]> {
        return new Promise((resolve, reject) => {
            let query = this.buildWhere(uql);
            let cursor = this.col.find(query);

            if(uql.skip) {
                cursor = cursor.skip(uql.skip);
            }

            if(uql.take) {
                cursor = cursor.limit(uql.take);
            }

            if(uql.projection) {
                cursor.project(uql.projection);
            }

            cursor.toArray((err, data) => {
                if(err) {
                    return reject(err); 
                }

                resolve(data);
            });
        });
    }

    private buildWhere(uql: IQuery): object {
        let query: object = {};

        if (!uql.where) {
            return query;
        }

        Object.keys(uql.where).forEach(key => {
            query[key] = uql.where[key];
        });

        return query;
    }

}