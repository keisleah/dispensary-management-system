import { useMyHealthRecordsQuery } from '@/lib/graphql/generated/graphql'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function HealthRecordsList() {
  const { data, loading } = useMyHealthRecordsQuery()
  const records = data?.myHealthRecords ?? []

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-display text-xl">Visit history</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {loading && <p className="text-sm text-ink/50">Loading...</p>}

        {!loading && records.length === 0 && (
          <p className="text-sm text-ink/50">No dispensary visits recorded yet.</p>
        )}

        {records.map((record) => (
          <div key={record?.id} className="border border-sage rounded-lg p-4 space-y-2">
            <div>
              <p className="text-sm font-medium text-ink">
                {record?.diagnosis || 'No diagnosis recorded'}
              </p>
              <p className="text-xs text-ink/60">{record?.treatmentNotes}</p>
            </div>

            {record?.followUpRequired && (
              <p className="text-xs text-accent font-medium">
                Follow-up required{record.followUpDate ? ` — ${record.followUpDate}` : ''}
              </p>
            )}

            {record?.dispensingRecords && record.dispensingRecords.length > 0 && (
              <div className="pt-2 border-t border-sage space-y-1.5">
                <p className="text-xs font-medium text-ink/50 uppercase tracking-wide">
                  Medicine dispensed
                </p>
                {record.dispensingRecords.map((dispensing) => (
                  <div key={dispensing?.id} className="flex items-center justify-between">
                    <span className="text-sm text-ink">{dispensing?.medicine.name}</span>
                    <Badge variant="secondary">
                      {dispensing?.quantityDispensed} {dispensing?.medicine.unit}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}