import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useCreateStudentProfileMutation,
  MyProfileDocument,
} from "@/lib/graphql/generated/graphql";
import { toastSuccess, toastError } from "@/lib/toast";

export function CreateProfileCard() {
  const [admissionNumber, setAdmissionNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [guardianName, setGuardianName] = useState("");
  const [guardianPhone, setGuardianPhone] = useState("");
  const [knownAllergies, setKnownAllergies] = useState("");

  const [createProfile, { loading }] = useCreateStudentProfileMutation({
    refetchQueries: [{ query: MyProfileDocument }],
  });

  async function handleSubmit() {
    if (
      !admissionNumber.trim() ||
      !dateOfBirth ||
      !gender ||
      !guardianName.trim() ||
      !guardianPhone.trim() ||
      !knownAllergies.trim()
    ) {
      toastError("Fill in all fields");
      return;
    }

    try {
      const { data } = await createProfile({
        variables: {
          admissionNumber,
          dateOfBirth,
          gender,
          guardianName,
          guardianPhone,
          knownAllergies,
        },
      });
      const result = data?.createStudentProfile;
      if (result?.success) {
        toastSuccess("Profile created");
      } else {
        toastError(result?.errors?.[0] ?? "Could not create profile");
      }
    } catch (err) {
      console.error("Create profile error:", err);
      const message =
        err instanceof Error ? err.message : "Could not create profile";
      toastError(message);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-display text-xl">
          Set up your profile
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-ink/60">
          Add your details to start reporting symptoms and viewing your health
          history.
        </p>

        <Input
          label="Admission number"
          id="admissionNumber"
          value={admissionNumber}
          onChange={(e) => setAdmissionNumber(e.target.value)}
          placeholder="ADM2026-001"
        />

        <Input
          label="Date of birth"
          id="dateOfBirth"
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-ink" htmlFor="gender">
            Gender
          </label>
          <Select
            value={gender}
            onValueChange={(value) => setGender(value ?? "")}
          >
            <SelectTrigger id="gender" className="w-full">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MALE">Male</SelectItem>
              <SelectItem value="FEMALE">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Input
          label="Guardian name"
          id="guardianName"
          value={guardianName}
          onChange={(e) => setGuardianName(e.target.value)}
        />

        <Input
          label="Guardian phone"
          id="guardianPhone"
          value={guardianPhone}
          onChange={(e) => setGuardianPhone(e.target.value)}
          placeholder="0712345678"
        />

        <div className="space-y-1.5">
          <label
            className="text-sm font-medium text-ink"
            htmlFor="knownAllergies"
          >
            Known allergies
          </label>
          <Textarea
            id="knownAllergies"
            value={knownAllergies}
            onChange={(e) => setKnownAllergies(e.target.value)}
            placeholder="e.g. Peanuts, Penicillin — or 'None'"
            rows={2}
          />
        </div>

        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-brand hover:bg-brand-deep"
        >
          {loading ? "Saving..." : "Save profile"}
        </Button>
      </CardContent>
    </Card>
  );
}
