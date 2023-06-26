import React from 'react'
import { publicRoutes } from './pages/Routes'
import { Route, Routes } from 'react-router-dom'


const AppRouter = () => {

  return (
              <Routes>
              {publicRoutes.map(route => 
                <Route 
                  exact={route.exact} 
                  path={route.path} 
                  element={route.component}
                  key={route.path}
                />
              )}
            </Routes>
  )
}

export default AppRouter