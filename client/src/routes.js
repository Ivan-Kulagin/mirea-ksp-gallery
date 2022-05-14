import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {GalleryPage} from './pages/GalleryPage'
import {PhotosPage} from "./pages/PhotosPage";
import {CreatePage} from './pages/CreatePage'
import {AuthPage} from './pages/AuthPage'

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/gallery" exact>
          <GalleryPage />
        </Route>
        <Route path="/my-photos" exact>
          <PhotosPage />
        </Route>
        <Route path="/create" exact>
          <CreatePage />
        </Route>

        <Redirect to="/create" />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route path="/" exact>
        <AuthPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  )
}
