import graphene

import accounts.schema
import students.schema
import health_records.schema
import symptoms.schema
import inventory.schema


class Query(
    accounts.schema.Query,
    students.schema.Query,
    health_records.schema.Query,
    symptoms.schema.Query,
    inventory.schema.Query,
    graphene.ObjectType,
):
    pass


class Mutation(
    accounts.schema.Mutation,
    students.schema.Mutation,
    health_records.schema.Mutation,
    symptoms.schema.Mutation,
    inventory.schema.Mutation,
    graphene.ObjectType,
):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)