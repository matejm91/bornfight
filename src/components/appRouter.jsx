import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import NotFoundPage from "src/components/common/NotFoundPage";
import AlbumListContainer from "src/components/album/list/AlbumListContainer";

const router = (
    <Router>
      <Switch>
        <Route exact path='/' component={AlbumListContainer}/>
        <Route exact path='/artist/:artistId' component={AlbumListContainer}/>
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
)

export default router;