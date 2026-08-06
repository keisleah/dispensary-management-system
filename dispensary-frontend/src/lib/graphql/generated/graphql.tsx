import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  DateTime: { input: any; output: any; }
  GenericScalar: { input: any; output: any; }
};

/** An enumeration. */
export enum AccountsUserRoleChoices {
  /** Admin */
  Admin = 'ADMIN',
  /** Student */
  Student = 'STUDENT'
}

export type AttendSymptom = {
  __typename?: 'AttendSymptom';
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  success?: Maybe<Scalars['Boolean']['output']>;
  symptom?: Maybe<SymptomType>;
};

export type CreateHealthRecord = {
  __typename?: 'CreateHealthRecord';
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  healthRecord?: Maybe<HealthRecordType>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type CreateMedicine = {
  __typename?: 'CreateMedicine';
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  medicine?: Maybe<MedicineType>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type CreateStudentProfile = {
  __typename?: 'CreateStudentProfile';
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  student?: Maybe<StudentType>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type DispenseMedicine = {
  __typename?: 'DispenseMedicine';
  dispensingRecord?: Maybe<DispensingRecordType>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type DispensingRecordType = {
  __typename?: 'DispensingRecordType';
  dispensedAt: Scalars['DateTime']['output'];
  dispensedBy?: Maybe<UserType>;
  healthRecord?: Maybe<HealthRecordType>;
  id: Scalars['ID']['output'];
  medicine: MedicineType;
  quantityDispensed: Scalars['Int']['output'];
};

export type HealthRecordType = {
  __typename?: 'HealthRecordType';
  createdAt: Scalars['DateTime']['output'];
  diagnosis: Scalars['String']['output'];
  dispensingRecords: Array<DispensingRecordType>;
  followUpDate?: Maybe<Scalars['Date']['output']>;
  followUpRequired: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  recordedBy?: Maybe<UserType>;
  student: StudentType;
  symptoms: Array<SymptomType>;
  treatmentNotes: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  visitDate: Scalars['DateTime']['output'];
};

export type MedicineType = {
  __typename?: 'MedicineType';
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  dispensingRecords: Array<DispensingRecordType>;
  expiryDate?: Maybe<Scalars['Date']['output']>;
  id: Scalars['ID']['output'];
  isLowStock?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  quantityInStock: Scalars['Int']['output'];
  reorderLevel: Scalars['Int']['output'];
  unit: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  attendSymptom?: Maybe<AttendSymptom>;
  createHealthRecord?: Maybe<CreateHealthRecord>;
  createMedicine?: Maybe<CreateMedicine>;
  createStudentProfile?: Maybe<CreateStudentProfile>;
  dispenseMedicine?: Maybe<DispenseMedicine>;
  refreshToken?: Maybe<Refresh>;
  registerStudent?: Maybe<RegisterStudent>;
  reportSymptom?: Maybe<ReportSymptom>;
  /** Obtain JSON Web Token mutation */
  tokenAuth?: Maybe<ObtainJsonWebToken>;
  updateHealthRecord?: Maybe<UpdateHealthRecord>;
  updateMedicineStock?: Maybe<UpdateMedicineStock>;
  updateStudentProfile?: Maybe<UpdateStudentProfile>;
  verifyToken?: Maybe<Verify>;
};


export type MutationAttendSymptomArgs = {
  healthRecordId?: InputMaybe<Scalars['ID']['input']>;
  symptomId: Scalars['ID']['input'];
};


export type MutationCreateHealthRecordArgs = {
  diagnosis?: InputMaybe<Scalars['String']['input']>;
  followUpDate?: InputMaybe<Scalars['Date']['input']>;
  followUpRequired?: InputMaybe<Scalars['Boolean']['input']>;
  studentId: Scalars['ID']['input'];
  treatmentNotes?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateMedicineArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  expiryDate?: InputMaybe<Scalars['Date']['input']>;
  name: Scalars['String']['input'];
  quantityInStock?: InputMaybe<Scalars['Int']['input']>;
  reorderLevel?: InputMaybe<Scalars['Int']['input']>;
  unit?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateStudentProfileArgs = {
  admissionNumber: Scalars['String']['input'];
  dateOfBirth?: InputMaybe<Scalars['Date']['input']>;
  gender?: InputMaybe<Scalars['String']['input']>;
  guardianName?: InputMaybe<Scalars['String']['input']>;
  guardianPhone?: InputMaybe<Scalars['String']['input']>;
  knownAllergies?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDispenseMedicineArgs = {
  healthRecordId?: InputMaybe<Scalars['ID']['input']>;
  medicineId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
};


export type MutationRefreshTokenArgs = {
  token?: InputMaybe<Scalars['String']['input']>;
};


export type MutationRegisterStudentArgs = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};


export type MutationReportSymptomArgs = {
  description: Scalars['String']['input'];
  severity?: InputMaybe<Scalars['String']['input']>;
};


export type MutationTokenAuthArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationUpdateHealthRecordArgs = {
  diagnosis?: InputMaybe<Scalars['String']['input']>;
  followUpDate?: InputMaybe<Scalars['Date']['input']>;
  followUpRequired?: InputMaybe<Scalars['Boolean']['input']>;
  recordId: Scalars['ID']['input'];
  treatmentNotes?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateMedicineStockArgs = {
  expiryDate?: InputMaybe<Scalars['Date']['input']>;
  medicineId: Scalars['ID']['input'];
  quantityInStock?: InputMaybe<Scalars['Int']['input']>;
  reorderLevel?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationUpdateStudentProfileArgs = {
  dateOfBirth?: InputMaybe<Scalars['Date']['input']>;
  gender?: InputMaybe<Scalars['String']['input']>;
  guardianName?: InputMaybe<Scalars['String']['input']>;
  guardianPhone?: InputMaybe<Scalars['String']['input']>;
  knownAllergies?: InputMaybe<Scalars['String']['input']>;
};


export type MutationVerifyTokenArgs = {
  token?: InputMaybe<Scalars['String']['input']>;
};

/** Obtain JSON Web Token mutation */
export type ObtainJsonWebToken = {
  __typename?: 'ObtainJSONWebToken';
  payload: Scalars['GenericScalar']['output'];
  refreshExpiresIn: Scalars['Int']['output'];
  token: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  accountsStatus?: Maybe<Scalars['String']['output']>;
  allDispensingRecords?: Maybe<Array<Maybe<DispensingRecordType>>>;
  allHealthRecords?: Maybe<Array<Maybe<HealthRecordType>>>;
  allMedicines?: Maybe<Array<Maybe<MedicineType>>>;
  allStudents?: Maybe<Array<Maybe<StudentType>>>;
  allSymptoms?: Maybe<Array<Maybe<SymptomType>>>;
  dispensingRecordsByMedicine?: Maybe<Array<Maybe<DispensingRecordType>>>;
  healthRecordsByStudent?: Maybe<Array<Maybe<HealthRecordType>>>;
  healthRecordsStatus?: Maybe<Scalars['String']['output']>;
  inventoryStatus?: Maybe<Scalars['String']['output']>;
  lowStockMedicines?: Maybe<Array<Maybe<MedicineType>>>;
  me?: Maybe<UserType>;
  myHealthRecords?: Maybe<Array<Maybe<HealthRecordType>>>;
  myProfile?: Maybe<StudentType>;
  mySymptoms?: Maybe<Array<Maybe<SymptomType>>>;
  pendingSymptoms?: Maybe<Array<Maybe<SymptomType>>>;
  studentByAdmissionNumber?: Maybe<StudentType>;
  studentsStatus?: Maybe<Scalars['String']['output']>;
  symptomsByStudent?: Maybe<Array<Maybe<SymptomType>>>;
  symptomsStatus?: Maybe<Scalars['String']['output']>;
};


export type QueryDispensingRecordsByMedicineArgs = {
  medicineId: Scalars['ID']['input'];
};


export type QueryHealthRecordsByStudentArgs = {
  studentId: Scalars['ID']['input'];
};


export type QueryStudentByAdmissionNumberArgs = {
  admissionNumber: Scalars['String']['input'];
};


export type QuerySymptomsByStudentArgs = {
  studentId: Scalars['ID']['input'];
};

export type Refresh = {
  __typename?: 'Refresh';
  payload: Scalars['GenericScalar']['output'];
  refreshExpiresIn: Scalars['Int']['output'];
  token: Scalars['String']['output'];
};

export type RegisterStudent = {
  __typename?: 'RegisterStudent';
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  success?: Maybe<Scalars['Boolean']['output']>;
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<UserType>;
};

export type ReportSymptom = {
  __typename?: 'ReportSymptom';
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  success?: Maybe<Scalars['Boolean']['output']>;
  symptom?: Maybe<SymptomType>;
};

export type StudentType = {
  __typename?: 'StudentType';
  admissionNumber: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  dateOfBirth?: Maybe<Scalars['Date']['output']>;
  gender?: Maybe<StudentsStudentGenderChoices>;
  guardianName: Scalars['String']['output'];
  guardianPhone: Scalars['String']['output'];
  healthRecords: Array<HealthRecordType>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  knownAllergies: Scalars['String']['output'];
  symptoms: Array<SymptomType>;
  updatedAt: Scalars['DateTime']['output'];
  user: UserType;
};

/** An enumeration. */
export enum StudentsStudentGenderChoices {
  /** Female */
  Female = 'FEMALE',
  /** Male */
  Male = 'MALE'
}

export type SymptomType = {
  __typename?: 'SymptomType';
  attendedAt?: Maybe<Scalars['DateTime']['output']>;
  description: Scalars['String']['output'];
  healthRecord?: Maybe<HealthRecordType>;
  id: Scalars['ID']['output'];
  reportedAt: Scalars['DateTime']['output'];
  severity: SymptomsSymptomSeverityChoices;
  status: SymptomsSymptomStatusChoices;
  student: StudentType;
};

/** An enumeration. */
export enum SymptomsSymptomSeverityChoices {
  /** Mild */
  Mild = 'MILD',
  /** Moderate */
  Moderate = 'MODERATE',
  /** Severe */
  Severe = 'SEVERE'
}

/** An enumeration. */
export enum SymptomsSymptomStatusChoices {
  /** Attended */
  Attended = 'ATTENDED',
  /** Pending */
  Pending = 'PENDING'
}

export type UpdateHealthRecord = {
  __typename?: 'UpdateHealthRecord';
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  healthRecord?: Maybe<HealthRecordType>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type UpdateMedicineStock = {
  __typename?: 'UpdateMedicineStock';
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  medicine?: Maybe<MedicineType>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type UpdateStudentProfile = {
  __typename?: 'UpdateStudentProfile';
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  student?: Maybe<StudentType>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type UserType = {
  __typename?: 'UserType';
  dateJoined: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  fullName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  phoneNumber: Scalars['String']['output'];
  role: AccountsUserRoleChoices;
};

export type Verify = {
  __typename?: 'Verify';
  payload: Scalars['GenericScalar']['output'];
};

export type AttendSymptomMutationVariables = Exact<{
  symptomId: Scalars['ID']['input'];
  healthRecordId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type AttendSymptomMutation = { __typename?: 'Mutation', attendSymptom?: { __typename?: 'AttendSymptom', success?: boolean | null, errors?: Array<string | null> | null, symptom?: { __typename?: 'SymptomType', id: string, status: SymptomsSymptomStatusChoices } | null } | null };

export type CreateHealthRecordMutationVariables = Exact<{
  studentId: Scalars['ID']['input'];
  diagnosis?: InputMaybe<Scalars['String']['input']>;
  treatmentNotes?: InputMaybe<Scalars['String']['input']>;
  followUpRequired?: InputMaybe<Scalars['Boolean']['input']>;
  followUpDate?: InputMaybe<Scalars['Date']['input']>;
}>;


export type CreateHealthRecordMutation = { __typename?: 'Mutation', createHealthRecord?: { __typename?: 'CreateHealthRecord', success?: boolean | null, errors?: Array<string | null> | null, healthRecord?: { __typename?: 'HealthRecordType', id: string, diagnosis: string } | null } | null };

export type CreateMedicineMutationVariables = Exact<{
  name: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  quantityInStock?: InputMaybe<Scalars['Int']['input']>;
  unit?: InputMaybe<Scalars['String']['input']>;
  reorderLevel?: InputMaybe<Scalars['Int']['input']>;
  expiryDate?: InputMaybe<Scalars['Date']['input']>;
}>;


export type CreateMedicineMutation = { __typename?: 'Mutation', createMedicine?: { __typename?: 'CreateMedicine', success?: boolean | null, errors?: Array<string | null> | null, medicine?: { __typename?: 'MedicineType', id: string } | null } | null };

export type CreateStudentProfileMutationVariables = Exact<{
  admissionNumber: Scalars['String']['input'];
  dateOfBirth?: InputMaybe<Scalars['Date']['input']>;
  gender?: InputMaybe<Scalars['String']['input']>;
  guardianName?: InputMaybe<Scalars['String']['input']>;
  guardianPhone?: InputMaybe<Scalars['String']['input']>;
  knownAllergies?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateStudentProfileMutation = { __typename?: 'Mutation', createStudentProfile?: { __typename?: 'CreateStudentProfile', success?: boolean | null, errors?: Array<string | null> | null, student?: { __typename?: 'StudentType', id: string, admissionNumber: string } | null } | null };

export type DispenseMedicineMutationVariables = Exact<{
  medicineId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
  healthRecordId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type DispenseMedicineMutation = { __typename?: 'Mutation', dispenseMedicine?: { __typename?: 'DispenseMedicine', success?: boolean | null, errors?: Array<string | null> | null, dispensingRecord?: { __typename?: 'DispensingRecordType', id: string, quantityDispensed: number } | null } | null };

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', tokenAuth?: { __typename?: 'ObtainJSONWebToken', token: string, payload: any } | null };

export type RegisterStudentMutationVariables = Exact<{
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
}>;


export type RegisterStudentMutation = { __typename?: 'Mutation', registerStudent?: { __typename?: 'RegisterStudent', success?: boolean | null, errors?: Array<string | null> | null, token?: string | null, user?: { __typename?: 'UserType', id: string, email: string, fullName?: string | null, role: AccountsUserRoleChoices } | null } | null };

export type ReportSymptomMutationVariables = Exact<{
  description: Scalars['String']['input'];
  severity?: InputMaybe<Scalars['String']['input']>;
}>;


export type ReportSymptomMutation = { __typename?: 'Mutation', reportSymptom?: { __typename?: 'ReportSymptom', success?: boolean | null, errors?: Array<string | null> | null, symptom?: { __typename?: 'SymptomType', id: string, description: string, severity: SymptomsSymptomSeverityChoices, status: SymptomsSymptomStatusChoices, reportedAt: any } | null } | null };

export type UpdateStudentProfileMutationVariables = Exact<{
  dateOfBirth?: InputMaybe<Scalars['Date']['input']>;
  gender?: InputMaybe<Scalars['String']['input']>;
  guardianName?: InputMaybe<Scalars['String']['input']>;
  guardianPhone?: InputMaybe<Scalars['String']['input']>;
  knownAllergies?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateStudentProfileMutation = { __typename?: 'Mutation', updateStudentProfile?: { __typename?: 'UpdateStudentProfile', success?: boolean | null, errors?: Array<string | null> | null, student?: { __typename?: 'StudentType', id: string, admissionNumber: string, dateOfBirth?: any | null, gender?: StudentsStudentGenderChoices | null, guardianName: string, guardianPhone: string, knownAllergies: string } | null } | null };

export type AccountsStatusQueryVariables = Exact<{ [key: string]: never; }>;


export type AccountsStatusQuery = { __typename?: 'Query', accountsStatus?: string | null };

export type AllMedicinesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllMedicinesQuery = { __typename?: 'Query', allMedicines?: Array<{ __typename?: 'MedicineType', id: string, name: string, description: string, quantityInStock: number, unit: string, reorderLevel: number, expiryDate?: any | null, isLowStock?: boolean | null } | null> | null };

export type AllStudentsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllStudentsQuery = { __typename?: 'Query', allStudents?: Array<{ __typename?: 'StudentType', id: string, admissionNumber: string, dateOfBirth?: any | null, gender?: StudentsStudentGenderChoices | null, guardianName: string, guardianPhone: string, knownAllergies: string, user: { __typename?: 'UserType', email: string, fullName?: string | null } } | null> | null };

export type HealthRecordsByStudentQueryVariables = Exact<{
  studentId: Scalars['ID']['input'];
}>;


export type HealthRecordsByStudentQuery = { __typename?: 'Query', healthRecordsByStudent?: Array<{ __typename?: 'HealthRecordType', id: string, diagnosis: string, treatmentNotes: string, visitDate: any, followUpRequired: boolean, followUpDate?: any | null } | null> | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'UserType', id: string, email: string, fullName?: string | null, role: AccountsUserRoleChoices } | null };

export type MyHealthRecordsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyHealthRecordsQuery = { __typename?: 'Query', myHealthRecords?: Array<{ __typename?: 'HealthRecordType', id: string, diagnosis: string, treatmentNotes: string, visitDate: any, followUpRequired: boolean, followUpDate?: any | null, dispensingRecords: Array<{ __typename?: 'DispensingRecordType', id: string, quantityDispensed: number, dispensedAt: any, medicine: { __typename?: 'MedicineType', name: string, unit: string } }> } | null> | null };

export type MyProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type MyProfileQuery = { __typename?: 'Query', myProfile?: { __typename?: 'StudentType', id: string, admissionNumber: string, dateOfBirth?: any | null, gender?: StudentsStudentGenderChoices | null, guardianName: string, guardianPhone: string, knownAllergies: string, isActive: boolean } | null };

export type MySymptomsQueryVariables = Exact<{ [key: string]: never; }>;


export type MySymptomsQuery = { __typename?: 'Query', mySymptoms?: Array<{ __typename?: 'SymptomType', id: string, description: string, severity: SymptomsSymptomSeverityChoices, status: SymptomsSymptomStatusChoices, reportedAt: any, attendedAt?: any | null, healthRecord?: { __typename?: 'HealthRecordType', diagnosis: string, treatmentNotes: string } | null } | null> | null };

export type PendingSymptomsQueryVariables = Exact<{ [key: string]: never; }>;


export type PendingSymptomsQuery = { __typename?: 'Query', pendingSymptoms?: Array<{ __typename?: 'SymptomType', id: string, description: string, severity: SymptomsSymptomSeverityChoices, reportedAt: any, student: { __typename?: 'StudentType', id: string, admissionNumber: string, user: { __typename?: 'UserType', fullName?: string | null } } } | null> | null };


export const AttendSymptomDocument = gql`
    mutation AttendSymptom($symptomId: ID!, $healthRecordId: ID) {
  attendSymptom(symptomId: $symptomId, healthRecordId: $healthRecordId) {
    success
    errors
    symptom {
      id
      status
    }
  }
}
    `;
export type AttendSymptomMutationFn = Apollo.MutationFunction<AttendSymptomMutation, AttendSymptomMutationVariables>;

/**
 * __useAttendSymptomMutation__
 *
 * To run a mutation, you first call `useAttendSymptomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAttendSymptomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [attendSymptomMutation, { data, loading, error }] = useAttendSymptomMutation({
 *   variables: {
 *      symptomId: // value for 'symptomId'
 *      healthRecordId: // value for 'healthRecordId'
 *   },
 * });
 */
export function useAttendSymptomMutation(baseOptions?: Apollo.MutationHookOptions<AttendSymptomMutation, AttendSymptomMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AttendSymptomMutation, AttendSymptomMutationVariables>(AttendSymptomDocument, options);
      }
export type AttendSymptomMutationHookResult = ReturnType<typeof useAttendSymptomMutation>;
export type AttendSymptomMutationResult = Apollo.MutationResult<AttendSymptomMutation>;
export type AttendSymptomMutationOptions = Apollo.BaseMutationOptions<AttendSymptomMutation, AttendSymptomMutationVariables>;
export const CreateHealthRecordDocument = gql`
    mutation CreateHealthRecord($studentId: ID!, $diagnosis: String, $treatmentNotes: String, $followUpRequired: Boolean, $followUpDate: Date) {
  createHealthRecord(
    studentId: $studentId
    diagnosis: $diagnosis
    treatmentNotes: $treatmentNotes
    followUpRequired: $followUpRequired
    followUpDate: $followUpDate
  ) {
    success
    errors
    healthRecord {
      id
      diagnosis
    }
  }
}
    `;
export type CreateHealthRecordMutationFn = Apollo.MutationFunction<CreateHealthRecordMutation, CreateHealthRecordMutationVariables>;

/**
 * __useCreateHealthRecordMutation__
 *
 * To run a mutation, you first call `useCreateHealthRecordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateHealthRecordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createHealthRecordMutation, { data, loading, error }] = useCreateHealthRecordMutation({
 *   variables: {
 *      studentId: // value for 'studentId'
 *      diagnosis: // value for 'diagnosis'
 *      treatmentNotes: // value for 'treatmentNotes'
 *      followUpRequired: // value for 'followUpRequired'
 *      followUpDate: // value for 'followUpDate'
 *   },
 * });
 */
export function useCreateHealthRecordMutation(baseOptions?: Apollo.MutationHookOptions<CreateHealthRecordMutation, CreateHealthRecordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateHealthRecordMutation, CreateHealthRecordMutationVariables>(CreateHealthRecordDocument, options);
      }
export type CreateHealthRecordMutationHookResult = ReturnType<typeof useCreateHealthRecordMutation>;
export type CreateHealthRecordMutationResult = Apollo.MutationResult<CreateHealthRecordMutation>;
export type CreateHealthRecordMutationOptions = Apollo.BaseMutationOptions<CreateHealthRecordMutation, CreateHealthRecordMutationVariables>;
export const CreateMedicineDocument = gql`
    mutation CreateMedicine($name: String!, $description: String, $quantityInStock: Int, $unit: String, $reorderLevel: Int, $expiryDate: Date) {
  createMedicine(
    name: $name
    description: $description
    quantityInStock: $quantityInStock
    unit: $unit
    reorderLevel: $reorderLevel
    expiryDate: $expiryDate
  ) {
    success
    errors
    medicine {
      id
    }
  }
}
    `;
export type CreateMedicineMutationFn = Apollo.MutationFunction<CreateMedicineMutation, CreateMedicineMutationVariables>;

/**
 * __useCreateMedicineMutation__
 *
 * To run a mutation, you first call `useCreateMedicineMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMedicineMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMedicineMutation, { data, loading, error }] = useCreateMedicineMutation({
 *   variables: {
 *      name: // value for 'name'
 *      description: // value for 'description'
 *      quantityInStock: // value for 'quantityInStock'
 *      unit: // value for 'unit'
 *      reorderLevel: // value for 'reorderLevel'
 *      expiryDate: // value for 'expiryDate'
 *   },
 * });
 */
export function useCreateMedicineMutation(baseOptions?: Apollo.MutationHookOptions<CreateMedicineMutation, CreateMedicineMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMedicineMutation, CreateMedicineMutationVariables>(CreateMedicineDocument, options);
      }
export type CreateMedicineMutationHookResult = ReturnType<typeof useCreateMedicineMutation>;
export type CreateMedicineMutationResult = Apollo.MutationResult<CreateMedicineMutation>;
export type CreateMedicineMutationOptions = Apollo.BaseMutationOptions<CreateMedicineMutation, CreateMedicineMutationVariables>;
export const CreateStudentProfileDocument = gql`
    mutation CreateStudentProfile($admissionNumber: String!, $dateOfBirth: Date, $gender: String, $guardianName: String, $guardianPhone: String, $knownAllergies: String) {
  createStudentProfile(
    admissionNumber: $admissionNumber
    dateOfBirth: $dateOfBirth
    gender: $gender
    guardianName: $guardianName
    guardianPhone: $guardianPhone
    knownAllergies: $knownAllergies
  ) {
    success
    errors
    student {
      id
      admissionNumber
    }
  }
}
    `;
export type CreateStudentProfileMutationFn = Apollo.MutationFunction<CreateStudentProfileMutation, CreateStudentProfileMutationVariables>;

/**
 * __useCreateStudentProfileMutation__
 *
 * To run a mutation, you first call `useCreateStudentProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateStudentProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createStudentProfileMutation, { data, loading, error }] = useCreateStudentProfileMutation({
 *   variables: {
 *      admissionNumber: // value for 'admissionNumber'
 *      dateOfBirth: // value for 'dateOfBirth'
 *      gender: // value for 'gender'
 *      guardianName: // value for 'guardianName'
 *      guardianPhone: // value for 'guardianPhone'
 *      knownAllergies: // value for 'knownAllergies'
 *   },
 * });
 */
export function useCreateStudentProfileMutation(baseOptions?: Apollo.MutationHookOptions<CreateStudentProfileMutation, CreateStudentProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateStudentProfileMutation, CreateStudentProfileMutationVariables>(CreateStudentProfileDocument, options);
      }
export type CreateStudentProfileMutationHookResult = ReturnType<typeof useCreateStudentProfileMutation>;
export type CreateStudentProfileMutationResult = Apollo.MutationResult<CreateStudentProfileMutation>;
export type CreateStudentProfileMutationOptions = Apollo.BaseMutationOptions<CreateStudentProfileMutation, CreateStudentProfileMutationVariables>;
export const DispenseMedicineDocument = gql`
    mutation DispenseMedicine($medicineId: ID!, $quantity: Int!, $healthRecordId: ID) {
  dispenseMedicine(
    medicineId: $medicineId
    quantity: $quantity
    healthRecordId: $healthRecordId
  ) {
    success
    errors
    dispensingRecord {
      id
      quantityDispensed
    }
  }
}
    `;
export type DispenseMedicineMutationFn = Apollo.MutationFunction<DispenseMedicineMutation, DispenseMedicineMutationVariables>;

/**
 * __useDispenseMedicineMutation__
 *
 * To run a mutation, you first call `useDispenseMedicineMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDispenseMedicineMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dispenseMedicineMutation, { data, loading, error }] = useDispenseMedicineMutation({
 *   variables: {
 *      medicineId: // value for 'medicineId'
 *      quantity: // value for 'quantity'
 *      healthRecordId: // value for 'healthRecordId'
 *   },
 * });
 */
export function useDispenseMedicineMutation(baseOptions?: Apollo.MutationHookOptions<DispenseMedicineMutation, DispenseMedicineMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DispenseMedicineMutation, DispenseMedicineMutationVariables>(DispenseMedicineDocument, options);
      }
export type DispenseMedicineMutationHookResult = ReturnType<typeof useDispenseMedicineMutation>;
export type DispenseMedicineMutationResult = Apollo.MutationResult<DispenseMedicineMutation>;
export type DispenseMedicineMutationOptions = Apollo.BaseMutationOptions<DispenseMedicineMutation, DispenseMedicineMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  tokenAuth(email: $email, password: $password) {
    token
    payload
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterStudentDocument = gql`
    mutation RegisterStudent($email: String!, $firstName: String!, $lastName: String!, $phoneNumber: String, $password: String!) {
  registerStudent(
    email: $email
    firstName: $firstName
    lastName: $lastName
    phoneNumber: $phoneNumber
    password: $password
  ) {
    success
    errors
    token
    user {
      id
      email
      fullName
      role
    }
  }
}
    `;
export type RegisterStudentMutationFn = Apollo.MutationFunction<RegisterStudentMutation, RegisterStudentMutationVariables>;

/**
 * __useRegisterStudentMutation__
 *
 * To run a mutation, you first call `useRegisterStudentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterStudentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerStudentMutation, { data, loading, error }] = useRegisterStudentMutation({
 *   variables: {
 *      email: // value for 'email'
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      phoneNumber: // value for 'phoneNumber'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterStudentMutation(baseOptions?: Apollo.MutationHookOptions<RegisterStudentMutation, RegisterStudentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterStudentMutation, RegisterStudentMutationVariables>(RegisterStudentDocument, options);
      }
export type RegisterStudentMutationHookResult = ReturnType<typeof useRegisterStudentMutation>;
export type RegisterStudentMutationResult = Apollo.MutationResult<RegisterStudentMutation>;
export type RegisterStudentMutationOptions = Apollo.BaseMutationOptions<RegisterStudentMutation, RegisterStudentMutationVariables>;
export const ReportSymptomDocument = gql`
    mutation ReportSymptom($description: String!, $severity: String) {
  reportSymptom(description: $description, severity: $severity) {
    success
    errors
    symptom {
      id
      description
      severity
      status
      reportedAt
    }
  }
}
    `;
export type ReportSymptomMutationFn = Apollo.MutationFunction<ReportSymptomMutation, ReportSymptomMutationVariables>;

/**
 * __useReportSymptomMutation__
 *
 * To run a mutation, you first call `useReportSymptomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReportSymptomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reportSymptomMutation, { data, loading, error }] = useReportSymptomMutation({
 *   variables: {
 *      description: // value for 'description'
 *      severity: // value for 'severity'
 *   },
 * });
 */
export function useReportSymptomMutation(baseOptions?: Apollo.MutationHookOptions<ReportSymptomMutation, ReportSymptomMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReportSymptomMutation, ReportSymptomMutationVariables>(ReportSymptomDocument, options);
      }
export type ReportSymptomMutationHookResult = ReturnType<typeof useReportSymptomMutation>;
export type ReportSymptomMutationResult = Apollo.MutationResult<ReportSymptomMutation>;
export type ReportSymptomMutationOptions = Apollo.BaseMutationOptions<ReportSymptomMutation, ReportSymptomMutationVariables>;
export const UpdateStudentProfileDocument = gql`
    mutation UpdateStudentProfile($dateOfBirth: Date, $gender: String, $guardianName: String, $guardianPhone: String, $knownAllergies: String) {
  updateStudentProfile(
    dateOfBirth: $dateOfBirth
    gender: $gender
    guardianName: $guardianName
    guardianPhone: $guardianPhone
    knownAllergies: $knownAllergies
  ) {
    success
    errors
    student {
      id
      admissionNumber
      dateOfBirth
      gender
      guardianName
      guardianPhone
      knownAllergies
    }
  }
}
    `;
export type UpdateStudentProfileMutationFn = Apollo.MutationFunction<UpdateStudentProfileMutation, UpdateStudentProfileMutationVariables>;

/**
 * __useUpdateStudentProfileMutation__
 *
 * To run a mutation, you first call `useUpdateStudentProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateStudentProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateStudentProfileMutation, { data, loading, error }] = useUpdateStudentProfileMutation({
 *   variables: {
 *      dateOfBirth: // value for 'dateOfBirth'
 *      gender: // value for 'gender'
 *      guardianName: // value for 'guardianName'
 *      guardianPhone: // value for 'guardianPhone'
 *      knownAllergies: // value for 'knownAllergies'
 *   },
 * });
 */
export function useUpdateStudentProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateStudentProfileMutation, UpdateStudentProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateStudentProfileMutation, UpdateStudentProfileMutationVariables>(UpdateStudentProfileDocument, options);
      }
export type UpdateStudentProfileMutationHookResult = ReturnType<typeof useUpdateStudentProfileMutation>;
export type UpdateStudentProfileMutationResult = Apollo.MutationResult<UpdateStudentProfileMutation>;
export type UpdateStudentProfileMutationOptions = Apollo.BaseMutationOptions<UpdateStudentProfileMutation, UpdateStudentProfileMutationVariables>;
export const AccountsStatusDocument = gql`
    query AccountsStatus {
  accountsStatus
}
    `;

/**
 * __useAccountsStatusQuery__
 *
 * To run a query within a React component, call `useAccountsStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccountsStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccountsStatusQuery({
 *   variables: {
 *   },
 * });
 */
export function useAccountsStatusQuery(baseOptions?: Apollo.QueryHookOptions<AccountsStatusQuery, AccountsStatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AccountsStatusQuery, AccountsStatusQueryVariables>(AccountsStatusDocument, options);
      }
export function useAccountsStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AccountsStatusQuery, AccountsStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AccountsStatusQuery, AccountsStatusQueryVariables>(AccountsStatusDocument, options);
        }
// @ts-ignore
export function useAccountsStatusSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<AccountsStatusQuery, AccountsStatusQueryVariables>): Apollo.UseSuspenseQueryResult<AccountsStatusQuery, AccountsStatusQueryVariables>;
export function useAccountsStatusSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AccountsStatusQuery, AccountsStatusQueryVariables>): Apollo.UseSuspenseQueryResult<AccountsStatusQuery | undefined, AccountsStatusQueryVariables>;
export function useAccountsStatusSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AccountsStatusQuery, AccountsStatusQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AccountsStatusQuery, AccountsStatusQueryVariables>(AccountsStatusDocument, options);
        }
export type AccountsStatusQueryHookResult = ReturnType<typeof useAccountsStatusQuery>;
export type AccountsStatusLazyQueryHookResult = ReturnType<typeof useAccountsStatusLazyQuery>;
export type AccountsStatusSuspenseQueryHookResult = ReturnType<typeof useAccountsStatusSuspenseQuery>;
export type AccountsStatusQueryResult = Apollo.QueryResult<AccountsStatusQuery, AccountsStatusQueryVariables>;
export const AllMedicinesDocument = gql`
    query AllMedicines {
  allMedicines {
    id
    name
    description
    quantityInStock
    unit
    reorderLevel
    expiryDate
    isLowStock
  }
}
    `;

/**
 * __useAllMedicinesQuery__
 *
 * To run a query within a React component, call `useAllMedicinesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllMedicinesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllMedicinesQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllMedicinesQuery(baseOptions?: Apollo.QueryHookOptions<AllMedicinesQuery, AllMedicinesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllMedicinesQuery, AllMedicinesQueryVariables>(AllMedicinesDocument, options);
      }
export function useAllMedicinesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllMedicinesQuery, AllMedicinesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllMedicinesQuery, AllMedicinesQueryVariables>(AllMedicinesDocument, options);
        }
// @ts-ignore
export function useAllMedicinesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<AllMedicinesQuery, AllMedicinesQueryVariables>): Apollo.UseSuspenseQueryResult<AllMedicinesQuery, AllMedicinesQueryVariables>;
export function useAllMedicinesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AllMedicinesQuery, AllMedicinesQueryVariables>): Apollo.UseSuspenseQueryResult<AllMedicinesQuery | undefined, AllMedicinesQueryVariables>;
export function useAllMedicinesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AllMedicinesQuery, AllMedicinesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AllMedicinesQuery, AllMedicinesQueryVariables>(AllMedicinesDocument, options);
        }
export type AllMedicinesQueryHookResult = ReturnType<typeof useAllMedicinesQuery>;
export type AllMedicinesLazyQueryHookResult = ReturnType<typeof useAllMedicinesLazyQuery>;
export type AllMedicinesSuspenseQueryHookResult = ReturnType<typeof useAllMedicinesSuspenseQuery>;
export type AllMedicinesQueryResult = Apollo.QueryResult<AllMedicinesQuery, AllMedicinesQueryVariables>;
export const AllStudentsDocument = gql`
    query AllStudents {
  allStudents {
    id
    admissionNumber
    dateOfBirth
    gender
    guardianName
    guardianPhone
    knownAllergies
    user {
      email
      fullName
    }
  }
}
    `;

/**
 * __useAllStudentsQuery__
 *
 * To run a query within a React component, call `useAllStudentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllStudentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllStudentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllStudentsQuery(baseOptions?: Apollo.QueryHookOptions<AllStudentsQuery, AllStudentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllStudentsQuery, AllStudentsQueryVariables>(AllStudentsDocument, options);
      }
export function useAllStudentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllStudentsQuery, AllStudentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllStudentsQuery, AllStudentsQueryVariables>(AllStudentsDocument, options);
        }
// @ts-ignore
export function useAllStudentsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<AllStudentsQuery, AllStudentsQueryVariables>): Apollo.UseSuspenseQueryResult<AllStudentsQuery, AllStudentsQueryVariables>;
export function useAllStudentsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AllStudentsQuery, AllStudentsQueryVariables>): Apollo.UseSuspenseQueryResult<AllStudentsQuery | undefined, AllStudentsQueryVariables>;
export function useAllStudentsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AllStudentsQuery, AllStudentsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AllStudentsQuery, AllStudentsQueryVariables>(AllStudentsDocument, options);
        }
export type AllStudentsQueryHookResult = ReturnType<typeof useAllStudentsQuery>;
export type AllStudentsLazyQueryHookResult = ReturnType<typeof useAllStudentsLazyQuery>;
export type AllStudentsSuspenseQueryHookResult = ReturnType<typeof useAllStudentsSuspenseQuery>;
export type AllStudentsQueryResult = Apollo.QueryResult<AllStudentsQuery, AllStudentsQueryVariables>;
export const HealthRecordsByStudentDocument = gql`
    query HealthRecordsByStudent($studentId: ID!) {
  healthRecordsByStudent(studentId: $studentId) {
    id
    diagnosis
    treatmentNotes
    visitDate
    followUpRequired
    followUpDate
  }
}
    `;

/**
 * __useHealthRecordsByStudentQuery__
 *
 * To run a query within a React component, call `useHealthRecordsByStudentQuery` and pass it any options that fit your needs.
 * When your component renders, `useHealthRecordsByStudentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHealthRecordsByStudentQuery({
 *   variables: {
 *      studentId: // value for 'studentId'
 *   },
 * });
 */
export function useHealthRecordsByStudentQuery(baseOptions: Apollo.QueryHookOptions<HealthRecordsByStudentQuery, HealthRecordsByStudentQueryVariables> & ({ variables: HealthRecordsByStudentQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HealthRecordsByStudentQuery, HealthRecordsByStudentQueryVariables>(HealthRecordsByStudentDocument, options);
      }
export function useHealthRecordsByStudentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HealthRecordsByStudentQuery, HealthRecordsByStudentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HealthRecordsByStudentQuery, HealthRecordsByStudentQueryVariables>(HealthRecordsByStudentDocument, options);
        }
// @ts-ignore
export function useHealthRecordsByStudentSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<HealthRecordsByStudentQuery, HealthRecordsByStudentQueryVariables>): Apollo.UseSuspenseQueryResult<HealthRecordsByStudentQuery, HealthRecordsByStudentQueryVariables>;
export function useHealthRecordsByStudentSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<HealthRecordsByStudentQuery, HealthRecordsByStudentQueryVariables>): Apollo.UseSuspenseQueryResult<HealthRecordsByStudentQuery | undefined, HealthRecordsByStudentQueryVariables>;
export function useHealthRecordsByStudentSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<HealthRecordsByStudentQuery, HealthRecordsByStudentQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<HealthRecordsByStudentQuery, HealthRecordsByStudentQueryVariables>(HealthRecordsByStudentDocument, options);
        }
export type HealthRecordsByStudentQueryHookResult = ReturnType<typeof useHealthRecordsByStudentQuery>;
export type HealthRecordsByStudentLazyQueryHookResult = ReturnType<typeof useHealthRecordsByStudentLazyQuery>;
export type HealthRecordsByStudentSuspenseQueryHookResult = ReturnType<typeof useHealthRecordsByStudentSuspenseQuery>;
export type HealthRecordsByStudentQueryResult = Apollo.QueryResult<HealthRecordsByStudentQuery, HealthRecordsByStudentQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    email
    fullName
    role
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
// @ts-ignore
export function useMeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>): Apollo.UseSuspenseQueryResult<MeQuery, MeQueryVariables>;
export function useMeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>): Apollo.UseSuspenseQueryResult<MeQuery | undefined, MeQueryVariables>;
export function useMeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeSuspenseQueryHookResult = ReturnType<typeof useMeSuspenseQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const MyHealthRecordsDocument = gql`
    query MyHealthRecords {
  myHealthRecords {
    id
    diagnosis
    treatmentNotes
    visitDate
    followUpRequired
    followUpDate
    dispensingRecords {
      id
      quantityDispensed
      dispensedAt
      medicine {
        name
        unit
      }
    }
  }
}
    `;

/**
 * __useMyHealthRecordsQuery__
 *
 * To run a query within a React component, call `useMyHealthRecordsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyHealthRecordsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyHealthRecordsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyHealthRecordsQuery(baseOptions?: Apollo.QueryHookOptions<MyHealthRecordsQuery, MyHealthRecordsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyHealthRecordsQuery, MyHealthRecordsQueryVariables>(MyHealthRecordsDocument, options);
      }
export function useMyHealthRecordsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyHealthRecordsQuery, MyHealthRecordsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyHealthRecordsQuery, MyHealthRecordsQueryVariables>(MyHealthRecordsDocument, options);
        }
// @ts-ignore
export function useMyHealthRecordsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MyHealthRecordsQuery, MyHealthRecordsQueryVariables>): Apollo.UseSuspenseQueryResult<MyHealthRecordsQuery, MyHealthRecordsQueryVariables>;
export function useMyHealthRecordsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MyHealthRecordsQuery, MyHealthRecordsQueryVariables>): Apollo.UseSuspenseQueryResult<MyHealthRecordsQuery | undefined, MyHealthRecordsQueryVariables>;
export function useMyHealthRecordsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MyHealthRecordsQuery, MyHealthRecordsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MyHealthRecordsQuery, MyHealthRecordsQueryVariables>(MyHealthRecordsDocument, options);
        }
export type MyHealthRecordsQueryHookResult = ReturnType<typeof useMyHealthRecordsQuery>;
export type MyHealthRecordsLazyQueryHookResult = ReturnType<typeof useMyHealthRecordsLazyQuery>;
export type MyHealthRecordsSuspenseQueryHookResult = ReturnType<typeof useMyHealthRecordsSuspenseQuery>;
export type MyHealthRecordsQueryResult = Apollo.QueryResult<MyHealthRecordsQuery, MyHealthRecordsQueryVariables>;
export const MyProfileDocument = gql`
    query MyProfile {
  myProfile {
    id
    admissionNumber
    dateOfBirth
    gender
    guardianName
    guardianPhone
    knownAllergies
    isActive
  }
}
    `;

/**
 * __useMyProfileQuery__
 *
 * To run a query within a React component, call `useMyProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyProfileQuery(baseOptions?: Apollo.QueryHookOptions<MyProfileQuery, MyProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyProfileQuery, MyProfileQueryVariables>(MyProfileDocument, options);
      }
export function useMyProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyProfileQuery, MyProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyProfileQuery, MyProfileQueryVariables>(MyProfileDocument, options);
        }
// @ts-ignore
export function useMyProfileSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MyProfileQuery, MyProfileQueryVariables>): Apollo.UseSuspenseQueryResult<MyProfileQuery, MyProfileQueryVariables>;
export function useMyProfileSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MyProfileQuery, MyProfileQueryVariables>): Apollo.UseSuspenseQueryResult<MyProfileQuery | undefined, MyProfileQueryVariables>;
export function useMyProfileSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MyProfileQuery, MyProfileQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MyProfileQuery, MyProfileQueryVariables>(MyProfileDocument, options);
        }
export type MyProfileQueryHookResult = ReturnType<typeof useMyProfileQuery>;
export type MyProfileLazyQueryHookResult = ReturnType<typeof useMyProfileLazyQuery>;
export type MyProfileSuspenseQueryHookResult = ReturnType<typeof useMyProfileSuspenseQuery>;
export type MyProfileQueryResult = Apollo.QueryResult<MyProfileQuery, MyProfileQueryVariables>;
export const MySymptomsDocument = gql`
    query MySymptoms {
  mySymptoms {
    id
    description
    severity
    status
    reportedAt
    attendedAt
    healthRecord {
      diagnosis
      treatmentNotes
    }
  }
}
    `;

/**
 * __useMySymptomsQuery__
 *
 * To run a query within a React component, call `useMySymptomsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMySymptomsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMySymptomsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMySymptomsQuery(baseOptions?: Apollo.QueryHookOptions<MySymptomsQuery, MySymptomsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MySymptomsQuery, MySymptomsQueryVariables>(MySymptomsDocument, options);
      }
export function useMySymptomsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MySymptomsQuery, MySymptomsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MySymptomsQuery, MySymptomsQueryVariables>(MySymptomsDocument, options);
        }
// @ts-ignore
export function useMySymptomsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MySymptomsQuery, MySymptomsQueryVariables>): Apollo.UseSuspenseQueryResult<MySymptomsQuery, MySymptomsQueryVariables>;
export function useMySymptomsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MySymptomsQuery, MySymptomsQueryVariables>): Apollo.UseSuspenseQueryResult<MySymptomsQuery | undefined, MySymptomsQueryVariables>;
export function useMySymptomsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MySymptomsQuery, MySymptomsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MySymptomsQuery, MySymptomsQueryVariables>(MySymptomsDocument, options);
        }
export type MySymptomsQueryHookResult = ReturnType<typeof useMySymptomsQuery>;
export type MySymptomsLazyQueryHookResult = ReturnType<typeof useMySymptomsLazyQuery>;
export type MySymptomsSuspenseQueryHookResult = ReturnType<typeof useMySymptomsSuspenseQuery>;
export type MySymptomsQueryResult = Apollo.QueryResult<MySymptomsQuery, MySymptomsQueryVariables>;
export const PendingSymptomsDocument = gql`
    query PendingSymptoms {
  pendingSymptoms {
    id
    description
    severity
    reportedAt
    student {
      id
      admissionNumber
      user {
        fullName
      }
    }
  }
}
    `;

/**
 * __usePendingSymptomsQuery__
 *
 * To run a query within a React component, call `usePendingSymptomsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePendingSymptomsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePendingSymptomsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePendingSymptomsQuery(baseOptions?: Apollo.QueryHookOptions<PendingSymptomsQuery, PendingSymptomsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PendingSymptomsQuery, PendingSymptomsQueryVariables>(PendingSymptomsDocument, options);
      }
export function usePendingSymptomsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PendingSymptomsQuery, PendingSymptomsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PendingSymptomsQuery, PendingSymptomsQueryVariables>(PendingSymptomsDocument, options);
        }
// @ts-ignore
export function usePendingSymptomsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<PendingSymptomsQuery, PendingSymptomsQueryVariables>): Apollo.UseSuspenseQueryResult<PendingSymptomsQuery, PendingSymptomsQueryVariables>;
export function usePendingSymptomsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<PendingSymptomsQuery, PendingSymptomsQueryVariables>): Apollo.UseSuspenseQueryResult<PendingSymptomsQuery | undefined, PendingSymptomsQueryVariables>;
export function usePendingSymptomsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<PendingSymptomsQuery, PendingSymptomsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PendingSymptomsQuery, PendingSymptomsQueryVariables>(PendingSymptomsDocument, options);
        }
export type PendingSymptomsQueryHookResult = ReturnType<typeof usePendingSymptomsQuery>;
export type PendingSymptomsLazyQueryHookResult = ReturnType<typeof usePendingSymptomsLazyQuery>;
export type PendingSymptomsSuspenseQueryHookResult = ReturnType<typeof usePendingSymptomsSuspenseQuery>;
export type PendingSymptomsQueryResult = Apollo.QueryResult<PendingSymptomsQuery, PendingSymptomsQueryVariables>;