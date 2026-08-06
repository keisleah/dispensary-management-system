import { Link } from 'react-router-dom'
import { useAllStudentsQuery } from '@/lib/graphql/generated/graphql'
import { Card, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export function AdminStudentsPage() {
  const { data, loading } = useAllStudentsQuery()
  const students = data?.allStudents ?? []

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink">Students</h1>
        <p className="text-sm text-ink/60">All registered student profiles</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          {loading && <p className="text-sm text-ink/50">Loading...</p>}

          {!loading && students.length === 0 && (
            <p className="text-sm text-ink/50">No student profiles yet.</p>
          )}

          {students.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Admission #</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Guardian</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student?.id}>
                    <TableCell className="font-medium">{student?.admissionNumber}</TableCell>
                    <TableCell>{student?.user.fullName}</TableCell>
                    <TableCell>{student?.user.email}</TableCell>
                    <TableCell>{student?.guardianName || '—'}</TableCell>
                    <TableCell>
                      <Link
                        to={`/admin/students/${student?.id}`}
                        className="text-brand text-sm font-medium hover:underline"
                      >
                        View
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}