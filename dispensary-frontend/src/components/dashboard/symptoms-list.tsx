import { useMySymptomsQuery } from '@/lib/graphql/generated/graphql'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function SymptomsList() {
  const { data, loading } = useMySymptomsQuery()
  const symptoms = data?.mySymptoms ?? []

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-display text-xl">Your reported symptoms</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {loading && <p className="text-sm text-ink/50">Loading...</p>}

        {!loading && symptoms.length === 0 && (
          <p className="text-sm text-ink/50">No symptoms reported yet.</p>
        )}

        {symptoms.map((symptom) => (
          <div key={symptom?.id} className="border border-sage rounded-lg p-4 space-y-2">
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm text-ink">{symptom?.description}</p>
              <Badge
                variant={symptom?.status === 'ATTENDED' ? 'default' : 'secondary'}
                className={symptom?.status === 'ATTENDED' ? 'bg-brand' : ''}
              >
                {symptom?.status === 'ATTENDED' ? 'Attended' : 'Pending'}
              </Badge>
            </div>
            {symptom?.healthRecord?.diagnosis && (
              <p className="text-xs text-ink/60">
                Diagnosis: {symptom.healthRecord.diagnosis}
              </p>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}