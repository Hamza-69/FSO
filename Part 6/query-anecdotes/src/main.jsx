import ReactDOM from 'react-dom/client'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import NotificationProvider from './NotificationContext'

const client = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <NotificationProvider>
  <QueryClientProvider client={client}>
    <App />
  </QueryClientProvider>
  </NotificationProvider>
)