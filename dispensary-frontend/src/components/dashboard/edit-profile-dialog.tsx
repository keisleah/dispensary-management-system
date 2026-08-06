import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  useUpdateStudentProfileMutation,
  MyProfileDocument,
  type MyProfileQuery,
} from '@/lib/graphql/generated/graphql'
import { toastSuccess, toastError } from '@/lib/toast'

interface EditProfileDialogProps {
  profile: NonNullable<MyProfileQuery['myProfile']>
}

export function EditProfileDialog({ profile }: EditProfileDialogProps) {
  const [open, setOpen] = useState(false)
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [gender, setGender] = useState('')
  const [guardianName, setGuardianName] = useState('')
  const [guardianPhone, setGuardianPhone] = useState('')
  const [knownAllergies, setKnownAllergies] = useState('')

  const [updateProfile, { loading }] = useUpdateStudentProfileMutation({
    refetchQueries: [{ query: MyProfileDocument }],
  })

  useEffect(() => {
    if (open) {
      setDateOfBirth(profile.dateOfBirth ?? '')
      setGender(profile.gender ?? '')
      setGuardianName(profile.guardianName ?? '')
      setGuardianPhone(profile.guardianPhone ?? '')
      setKnownAllergies(profile.knownAllergies ?? '')
    }
  }, [open, profile])

  async function handleSubmit() {
    if (!dateOfBirth || !gender || !guardianName.trim() || !guardianPhone.trim() || !knownAllergies.trim()) {
      toastError('Fill in all fields')
      return
    }

    try {
      const { data } = await updateProfile({
        variables: { dateOfBirth, gender, guardianName, guardianPhone, knownAllergies },
      })
      const result = data?.updateStudentProfile
      if (result?.success) {
        toastSuccess('Profile updated')
        setOpen(false)
      } else {
        toastError(result?.errors?.[0] ?? 'Could not update profile')
      }
    } catch (err) {
      console.error('Update profile error:', err)
      const message = err instanceof Error ? err.message : 'Could not update profile'
      toastError(message)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="outline" size="sm" />}>
        Edit profile
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display">Edit profile</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            label="Date of birth"
            id="editDateOfBirth"
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-ink" htmlFor="editGender">
              Gender
            </label>
            <Select value={gender} onValueChange={(value) => setGender(value ?? "")}>
              <SelectTrigger id="editGender" className="w-full">
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
            id="editGuardianName"
            value={guardianName}
            onChange={(e) => setGuardianName(e.target.value)}
          />

          <Input
            label="Guardian phone"
            id="editGuardianPhone"
            value={guardianPhone}
            onChange={(e) => setGuardianPhone(e.target.value)}
          />

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-ink" htmlFor="editKnownAllergies">
              Known allergies
            </label>
            <Textarea
              id="editKnownAllergies"
              value={knownAllergies}
              onChange={(e) => setKnownAllergies(e.target.value)}
              rows={2}
            />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit} disabled={loading} className="bg-brand hover:bg-brand-deep">
            {loading ? 'Saving...' : 'Save changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}