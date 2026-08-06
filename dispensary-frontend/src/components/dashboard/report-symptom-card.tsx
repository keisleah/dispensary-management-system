import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  useReportSymptomMutation,
  MySymptomsDocument,
} from '@/lib/graphql/generated/graphql'
import { toastSuccess, toastError } from '@/lib/toast'

const severities = ['MILD', 'MODERATE', 'SEVERE'] as const

export function ReportSymptomCard() {
  const [description, setDescription] = useState('')
  const [severity, setSeverity] = useState<(typeof severities)[number]>('MILD')

  const [reportSymptom, { loading }] = useReportSymptomMutation({
    refetchQueries: [{ query: MySymptomsDocument }],
  })

  async function handleSubmit() {
    if (!description.trim()) {
      toastError('Describe what you\'re feeling first')
      return
    }

    try {
      const { data } = await reportSymptom({ variables: { description, severity } })
      const result = data?.reportSymptom
      if (result?.success) {
        setDescription('')
        setSeverity('MILD')
        toastSuccess('Reported — the dispensary will follow up')
      } else {
        toastError(result?.errors?.[0] ?? 'Could not report symptom')
      }
    } catch (err) {
      console.error('Report symptom error:', err)
      const message = err instanceof Error ? err.message : 'Could not report symptom'
      toastError(message)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-display text-xl">Report a symptom</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe what you're feeling..."
          rows={3}
        />

        <div className="flex gap-2">
          {severities.map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => setSeverity(level)}
              className={cn(
                'px-3 py-1.5 rounded-md text-xs font-medium border transition-colors',
                severity === level
                  ? 'bg-brand text-white border-brand'
                  : 'bg-white text-ink/60 border-sage hover:border-brand',
              )}
            >
              {level.charAt(0) + level.slice(1).toLowerCase()}
            </button>
          ))}
        </div>

        <Button
          onClick={handleSubmit}
          disabled={loading || !description.trim()}
          className="w-full bg-brand hover:bg-brand-deep"
        >
          {loading ? 'Reporting...' : 'Report symptom'}
        </Button>
      </CardContent>
    </Card>
  )
}