import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import NotFoundPage from "./common/NotFoundPage";
import AlbumList from "./album/list/AlbumList";

const router = (
    <Router>
      <Switch>
        <Route exact path='/' component={AlbumList}/>
        <Route exact path='/artist/:artistId' component={AlbumList}/>
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
)

export default router;