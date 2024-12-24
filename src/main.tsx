import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRoutes from './routers/index.tsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { ConfigProvider } from 'antd'
import { PostProvider } from './contexts/PostContext.tsx'
import { UserProvider } from './contexts/UserContext.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient()
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <ConfigProvider>
            <PostProvider>
              <UserProvider>
                <AppRoutes />
              </UserProvider>
            </PostProvider>
          </ConfigProvider>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  </StrictMode>
)
