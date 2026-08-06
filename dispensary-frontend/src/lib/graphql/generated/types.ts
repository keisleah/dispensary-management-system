export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: unknown; output: unknown; }
  DateTime: { input: unknown; output: unknown; }
  GenericScalar: { input: unknown; output: unknown; }
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
