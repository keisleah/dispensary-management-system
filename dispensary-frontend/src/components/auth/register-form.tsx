import { useState, type KeyboardEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRegisterStudentMutation } from '@/lib/graphql/generated/graphql'
import { useAuth } from '@/hooks/use-auth'
import { toastSuccess, toastError } from '@/lib/toast'

export function RegisterForm() {
  const navigate = useNavigate()
  const { saveSession } = useAuth()
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [registerStudent, { loading }] = useRegisterStudentMutation()

  async function handleRegister() {
    if (!email.trim() || !firstName.trim() || !lastName.trim() || !password) {
      toastError('Fill in all required fields')
      return
    }

    if (password !== confirmPassword) {
      toastError('Passwords do not match')
      return
    }

    try {
      const { data } = await registerStudent({
        variables: { email, firstName, lastName, phoneNumber, password },
      })

      const result = data?.registerStudent
      if (result?.success && result.token) {
        saveSession(result.token)
        toastSuccess('Account created')
        navigate('/dashboard')
      } else {
        toastError(result?.errors?.[0] ?? 'Registration failed')
      }
    } catch (err) {
      console.error('Register error:', err)
      const message = err instanceof Error ? err.message : 'Registration failed'
      toastError(message)
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      handleRegister()
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-3xl font-semibold text-ink mb-2">Create your account</h2>
        <p className="text-sm text-ink/60">Register to log symptoms and view your health history</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="First name"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Input
          label="Last name"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      <Input
        label="Email"
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="jane@student.com"
      />

      <Input
        label="Phone number"
        id="phoneNumber"
        type="tel"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="0712345678"
      />

      <Input
        label="Password"
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="••••••••"
        securePassword
      />

      <Input
        label="Confirm password"
        id="confirmPassword"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="••••••••"
        securePassword
      />

      <Button onClick={handleRegister} className="w-full bg-brand hover:bg-brand-deep" disabled={loading}>
        {loading ? 'Creating account...' : 'Create account'}
      </Button>

      <p className="text-sm text-center text-ink/60">
        Already have an account?{' '}
        <Link to="/login" className="text-brand font-medium hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  )
}