import { buildSchema } from "type-graphql";
import { join } from "path";

//Comment this out
import { Resolver, Query, Arg, Ctx } from "type-graphql";
import type { Context } from "@types";
@Resolver()
class ExampleResolver {
    @Query(returns => String, { description: "A test query" })
    async test(@Arg("text") text: string, @Ctx() ctx: Context) {
        return text;
    };
};

export const schema = await buildSchema({
    resolvers: [ExampleResolver], //Put all resolvers into this array
    orphanedTypes: [],
    emitSchemaFile: join(process.cwd(), "graphql", "schema.graphql") //generating a GraphQL schema file into this directory
});