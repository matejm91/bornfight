import React from 'react';
import 'assets/style/_artistAlbumListHeader.css';
import { withRouter } from 'react-router';

function ArtistAlbumListHeader(props) {
  const { artistTitle, history } = props;

  return (
    <div className="bornfight-artistAlbumListHeader__header">
      <div
        onClick={() => history.goBack()}
        role="link"
        tabIndex="0"
        aria-hidden="true"
      >
        <i className="material-icons">arrow_back</i>
        <p>{artistTitle}</p>
      </div>
    </div>
  );
}

export default withRouter(ArtistAlbumListHeader);
