export interface IQueryBuilder {
    buildQuery(uql: IQuery): object;
}

export interface IWhere {
    [key: string]: any;
}

export interface IProjection {
    [field: string]: boolean;
}

export interface IQuery {
    where?: IWhere,
    projection?: IProjection;
    skip?: number;
    take?: number;
}