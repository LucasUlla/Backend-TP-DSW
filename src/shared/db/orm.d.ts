import 'reflect-metadata';
export declare const orm: import("@mikro-orm/core").MikroORM<import("@mikro-orm/mysql").MySqlDriver, import("@mikro-orm/mysql").SqlEntityManager<import("@mikro-orm/mysql").MySqlDriver> & import("@mikro-orm/core").EntityManager<import("@mikro-orm/mysql").MySqlDriver>, string[]>;
export declare const syncSchema: () => Promise<void>;
export declare function getEm(): import("@mikro-orm/core").EntityManager<import("@mikro-orm/core").IDatabaseDriver<import("@mikro-orm/core").Connection>>;
