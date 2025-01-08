import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRoutes from './routers/index.tsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { ConfigProvider } from 'antd'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SelectedAuthorsProvider } from './contexts/SelectedAuthorsContext.tsx'
import { AuthorsProvider } from './contexts/AuthorsContext.tsx'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { EvenEditProvider } from './contexts/EventContext.tsx'
const queryClient = new QueryClient()
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <ConfigProvider>
            {/* <PostProvider> */}
            <SelectedAuthorsProvider>
              <AuthorsProvider>
                <EvenEditProvider>
                  <AppRoutes />
                </EvenEditProvider>
                <ReactQueryDevtools initialIsOpen={false} />
              </AuthorsProvider>
            </SelectedAuthorsProvider>
            {/* </PostProvider> */}
          </ConfigProvider>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  </StrictMode>
)
