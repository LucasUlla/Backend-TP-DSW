import 'reflect-metadata';//?
import { MikroORM } from "@mikro-orm/mysql";
import { SqlHighlighter } from "@mikro-orm/sql-highlighter";
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { RequestContext } from '@mikro-orm/core'

export const orm = await MikroORM.init({
    metadataProvider: TsMorphMetadataProvider,
    entities: ['dist/**/*.entity.js'],
    entitiesTs: ['src/**/*.entity.ts'],
    dbName: 'clubdeportivo',
    clientUrl: 'mysql://root:Lucasulla%3F2018@localhost:3306/clubdeportivo',
    highlighter: new SqlHighlighter(),
    debug: true,
    schemaGenerator: { //never in production
        disableForeignKeys: true,
        createForeignKeyConstraints: true,
        ignoreSchema: [],
    }
})

export const syncSchema = async () => {
  const generator = orm.schema
  /*   
  await generator.drop()
  await generator.create()
  */
  await generator.update()
}
/////////////////////////////////////
export function getEm() {
    const em = RequestContext.getEntityManager()
    if (!em) {
        throw new Error('No hay EntityManager en el contexto de la request. ¿Falta el middleware de RequestContext?')
    }
    return em
}