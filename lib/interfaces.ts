import { IQuery } from "./query";

export interface IDataAgent<T> {
    find(uql: IQuery): Promise<T[]>;
}

export interface IDbPRovider {
    connect(dbName: string): Promise<any>;
    getDataAgent<T>(entity: string): IDataAgent<T>;
    close(): void;
}