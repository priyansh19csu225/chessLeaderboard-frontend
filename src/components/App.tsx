import React from 'react'
import SnackbarProvider from 'react-simple-snackbar'
import HomePage from './HomePage/HomePage'

const App: React.FC = () => {
  return (
    <SnackbarProvider>
      <HomePage />
    </SnackbarProvider>
  )
}

export default App
