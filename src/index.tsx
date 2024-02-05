import {createRoot} from 'react-dom/client'
import {Chart, registerables} from 'chart.js'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// Apps
import './_cloner/assets/sass/style.react.scss'
import './_cloner/assets/css/style.rtl.css'
import './_cloner/assets/css/tailwindcss.css'
import 'react-toastify/dist/ReactToastify.css';
import {AppRoutes} from './app/routing/AppRoutes'
import { ToastContainer } from 'react-toastify'
Chart.register(...registerables)

const queryClient = new QueryClient()
const container = document.getElementById('root')
if (container) {
  createRoot(container).render(
    <QueryClientProvider client={queryClient}>
          <AppRoutes />
      <ReactQueryDevtools initialIsOpen={false} />
      <ToastContainer />
    </QueryClientProvider>
  )
}
