import graphene
from graphene_django import DjangoObjectType
from django.core.exceptions import PermissionDenied
from .models import Student


class StudentType(DjangoObjectType):
    class Meta:
        model = Student
        fields = '__all__'


class CreateStudentProfile(graphene.Mutation):
    class Arguments:
        admission_number = graphene.String(required=True)
        date_of_birth = graphene.Date(required=False)
        gender = graphene.String(required=False)
        guardian_name = graphene.String(required=False)
        guardian_phone = graphene.String(required=False)
        known_allergies = graphene.String(required=False)

    student = graphene.Field(StudentType)
    success = graphene.Boolean()
    errors = graphene.List(graphene.String)

    def mutate(self, info, admission_number, **kwargs):
        user = info.context.user
        if user.is_anonymous:
            raise PermissionDenied("Authentication required")

        if hasattr(user, 'student_profile'):
            return CreateStudentProfile(success=False, errors=["Profile already exists"], student=None)

        if Student.objects.filter(admission_number=admission_number).exists():
            return CreateStudentProfile(success=False, errors=["Admission number already in use"], student=None)

        student = Student.objects.create(
            user=user,
            admission_number=admission_number,
            **kwargs,
        )
        return CreateStudentProfile(student=student, success=True, errors=None)


class UpdateStudentProfile(graphene.Mutation):
    class Arguments:
        date_of_birth = graphene.Date(required=False)
        gender = graphene.String(required=False)
        guardian_name = graphene.String(required=False)
        guardian_phone = graphene.String(required=False)
        known_allergies = graphene.String(required=False)

    student = graphene.Field(StudentType)
    success = graphene.Boolean()
    errors = graphene.List(graphene.String)

    def mutate(self, info, **kwargs):
        user = info.context.user
        if user.is_anonymous:
            raise PermissionDenied("Authentication required")

        if not hasattr(user, 'student_profile'):
            return UpdateStudentProfile(success=False, errors=["Profile does not exist"], student=None)

        student = user.student_profile
        for field, value in kwargs.items():
            if value is not None:
                setattr(student, field, value)
        student.save()

        return UpdateStudentProfile(student=student, success=True, errors=None)


class Query(graphene.ObjectType):
    students_status = graphene.String(default_value="students app ready")
    my_profile = graphene.Field(StudentType)
    all_students = graphene.List(StudentType)
    student_by_admission_number = graphene.Field(StudentType, admission_number=graphene.String(required=True))

    def resolve_my_profile(self, info):
        user = info.context.user
        if user.is_anonymous or not hasattr(user, 'student_profile'):
            return None
        return user.student_profile

    def resolve_all_students(self, info):
        user = info.context.user
        if user.is_anonymous or user.role != 'ADMIN':
            raise PermissionDenied("Admin access required")
        return Student.objects.all()

    def resolve_student_by_admission_number(self, info, admission_number):
        user = info.context.user
        if user.is_anonymous or user.role != 'ADMIN':
            raise PermissionDenied("Admin access required")
        return Student.objects.filter(admission_number=admission_number).first()


class Mutation(graphene.ObjectType):
    create_student_profile = CreateStudentProfile.Field()
    update_student_profile = UpdateStudentProfile.Field()