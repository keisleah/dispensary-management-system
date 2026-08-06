import graphene
from graphene_django import DjangoObjectType
import graphql_jwt
from graphql_jwt.shortcuts import get_token
from .models import User


class UserType(DjangoObjectType):
    full_name = graphene.String()

    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'phone_number', 'role', 'date_joined')

    def resolve_full_name(self, info):
        return self.full_name


class RegisterStudent(graphene.Mutation):
    class Arguments:
        email = graphene.String(required=True)
        first_name = graphene.String(required=True)
        last_name = graphene.String(required=True)
        phone_number = graphene.String(required=False)
        password = graphene.String(required=True)

    user = graphene.Field(UserType)
    token = graphene.String()
    success = graphene.Boolean()
    errors = graphene.List(graphene.String)

    def mutate(self, info, email, first_name, last_name, password, phone_number=None):
        if User.objects.filter(email=email).exists():
            return RegisterStudent(success=False, errors=["Email already registered"], user=None, token=None)

        user = User.objects.create_user(
            email=email,
            first_name=first_name,
            last_name=last_name,
            password=password,
            phone_number=phone_number or '',
            role=User.Role.STUDENT,
        )

        token = get_token(user)

        return RegisterStudent(user=user, token=token, success=True, errors=None)


class Query(graphene.ObjectType):
    accounts_status = graphene.String(default_value="accounts app ready")
    me = graphene.Field(UserType)

    def resolve_me(self, info):
        user = info.context.user
        if user.is_anonymous:
            return None
        return user


class Mutation(graphene.ObjectType):
    register_student = RegisterStudent.Field()
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()