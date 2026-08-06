import graphene
from graphene_django import DjangoObjectType
from django.core.exceptions import PermissionDenied
from django.db import transaction
from .models import Medicine, DispensingRecord
from health_records.models import HealthRecord


class MedicineType(DjangoObjectType):
    is_low_stock = graphene.Boolean()

    class Meta:
        model = Medicine
        fields = '__all__'

    def resolve_is_low_stock(self, info):
        return self.is_low_stock


class DispensingRecordType(DjangoObjectType):
    class Meta:
        model = DispensingRecord
        fields = '__all__'


class CreateMedicine(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        description = graphene.String(required=False)
        quantity_in_stock = graphene.Int(required=False)
        unit = graphene.String(required=False)
        reorder_level = graphene.Int(required=False)
        expiry_date = graphene.Date(required=False)

    medicine = graphene.Field(MedicineType)
    success = graphene.Boolean()
    errors = graphene.List(graphene.String)

    def mutate(self, info, name, **kwargs):
        user = info.context.user
        if user.is_anonymous or user.role != 'ADMIN':
            raise PermissionDenied("Admin access required")

        if Medicine.objects.filter(name=name).exists():
            return CreateMedicine(success=False, errors=["Medicine already exists"], medicine=None)

        medicine = Medicine.objects.create(name=name, **kwargs)
        return CreateMedicine(medicine=medicine, success=True, errors=None)


class UpdateMedicineStock(graphene.Mutation):
    class Arguments:
        medicine_id = graphene.ID(required=True)
        quantity_in_stock = graphene.Int(required=False)
        reorder_level = graphene.Int(required=False)
        expiry_date = graphene.Date(required=False)

    medicine = graphene.Field(MedicineType)
    success = graphene.Boolean()
    errors = graphene.List(graphene.String)

    def mutate(self, info, medicine_id, **kwargs):
        user = info.context.user
        if user.is_anonymous or user.role != 'ADMIN':
            raise PermissionDenied("Admin access required")

        medicine = Medicine.objects.filter(id=medicine_id).first()
        if not medicine:
            return UpdateMedicineStock(success=False, errors=["Medicine not found"], medicine=None)

        for field, value in kwargs.items():
            if value is not None:
                setattr(medicine, field, value)
        medicine.save()

        return UpdateMedicineStock(medicine=medicine, success=True, errors=None)


class DispenseMedicine(graphene.Mutation):
    class Arguments:
        medicine_id = graphene.ID(required=True)
        quantity = graphene.Int(required=True)
        health_record_id = graphene.ID(required=False)

    dispensing_record = graphene.Field(DispensingRecordType)
    success = graphene.Boolean()
    errors = graphene.List(graphene.String)

    def mutate(self, info, medicine_id, quantity, health_record_id=None):
        user = info.context.user
        if user.is_anonymous or user.role != 'ADMIN':
            raise PermissionDenied("Admin access required")

        medicine = Medicine.objects.filter(id=medicine_id).first()
        if not medicine:
            return DispenseMedicine(success=False, errors=["Medicine not found"], dispensing_record=None)

        if quantity <= 0:
            return DispenseMedicine(success=False, errors=["Quantity must be greater than zero"], dispensing_record=None)

        if medicine.quantity_in_stock < quantity:
            return DispenseMedicine(success=False, errors=["Insufficient stock"], dispensing_record=None)

        health_record = None
        if health_record_id:
            health_record = HealthRecord.objects.filter(id=health_record_id).first()
            if not health_record:
                return DispenseMedicine(success=False, errors=["Health record not found"], dispensing_record=None)

        with transaction.atomic():
            medicine.quantity_in_stock -= quantity
            medicine.save()

            record = DispensingRecord.objects.create(
                medicine=medicine,
                health_record=health_record,
                dispensed_by=user,
                quantity_dispensed=quantity,
            )

        return DispenseMedicine(dispensing_record=record, success=True, errors=None)


class Query(graphene.ObjectType):
    inventory_status = graphene.String(default_value="inventory app ready")
    all_medicines = graphene.List(MedicineType)
    low_stock_medicines = graphene.List(MedicineType)
    all_dispensing_records = graphene.List(DispensingRecordType)
    dispensing_records_by_medicine = graphene.List(DispensingRecordType, medicine_id=graphene.ID(required=True))

    def resolve_all_medicines(self, info):
        user = info.context.user
        if user.is_anonymous or user.role != 'ADMIN':
            raise PermissionDenied("Admin access required")
        return Medicine.objects.all()

    def resolve_low_stock_medicines(self, info):
        user = info.context.user
        if user.is_anonymous or user.role != 'ADMIN':
            raise PermissionDenied("Admin access required")
        return [m for m in Medicine.objects.all() if m.is_low_stock]

    def resolve_all_dispensing_records(self, info):
        user = info.context.user
        if user.is_anonymous or user.role != 'ADMIN':
            raise PermissionDenied("Admin access required")
        return DispensingRecord.objects.all()

    def resolve_dispensing_records_by_medicine(self, info, medicine_id):
        user = info.context.user
        if user.is_anonymous or user.role != 'ADMIN':
            raise PermissionDenied("Admin access required")
        return DispensingRecord.objects.filter(medicine_id=medicine_id)


class Mutation(graphene.ObjectType):
    create_medicine = CreateMedicine.Field()
    update_medicine_stock = UpdateMedicineStock.Field()
    dispense_medicine = DispenseMedicine.Field()