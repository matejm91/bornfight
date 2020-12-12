import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NotFoundPage from 'components/common/NotFoundPage';
import AlbumListContainer from 'components/album/list/AlbumListContainer';

const router = (
  <Router>
    <Switch>
      <Route exact path="/" component={AlbumListContainer} />
      <Route exact path="/artist/:artistId" component={AlbumListContainer} />
      <Route component={NotFoundPage} />
    </Switch>
  </Router>
);

export default router;
