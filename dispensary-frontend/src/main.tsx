import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ApolloProvider } from '@apollo/client'
import { Toaster } from '@/components/ui/sonner'
import { apolloClient } from '@/lib/graphql/apollo-client'
import App from './App.tsx'
import '@fontsource-variable/geist'
import '@fontsource-variable/space-grotesk'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={apolloClient}>
      <App />
      <Toaster position="top-right" richColors />
    </ApolloProvider>
  </StrictMode>,
)