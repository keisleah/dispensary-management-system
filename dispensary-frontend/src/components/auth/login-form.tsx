import { useState, type KeyboardEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useLoginMutation, MeDocument, type MeQuery } from '@/lib/graphql/generated/graphql'
import { useAuth } from '@/hooks/use-auth'
import { apolloClient } from '@/lib/graphql/apollo-client'
import { toastSuccess, toastError } from '@/lib/toast'

export function LoginForm() {
  const navigate = useNavigate()
  const { saveSession } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [login, { loading }] = useLoginMutation()

  async function handleLogin() {
    if (!email.trim() || !password.trim()) {
      toastError('Enter your email and password')
      return
    }

    try {
      const { data } = await login({ variables: { email, password } })
      const token = data?.tokenAuth?.token
      if (!token) {
        toastError('Login did not return a token')
        return
      }

      saveSession(token)

      const { data: meData } = await apolloClient.query<MeQuery>({
        query: MeDocument,
        fetchPolicy: 'network-only',
      })

      toastSuccess('Signed in')
      navigate(meData?.me?.role === 'ADMIN' ? '/admin' : '/dashboard')
    } catch (err) {
      console.error('Login error:', err)
      const message = err instanceof Error ? err.message : 'Login failed'
      toastError(message)
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      handleLogin()
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-3xl font-semibold text-ink mb-2">Welcome back</h2>
        <p className="text-sm text-ink/60">Sign in to view your health records</p>
      </div>

      <div className="space-y-4">
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
          label="Password"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="••••••••"
          securePassword
        />
      </div>

      <Button onClick={handleLogin} className="w-full bg-brand hover:bg-brand-deep" disabled={loading}>
        {loading ? 'Signing in...' : 'Sign in'}
      </Button>

      <p className="text-sm text-center text-ink/60">
        Don't have an account?{' '}
        <Link to="/register" className="text-brand font-medium hover:underline">
          Register
        </Link>
      </p>
    </div>
  )
}