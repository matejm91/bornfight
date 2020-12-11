import React from 'react';
import '../../assets/style/_artistAlbumListHeader.css';
import {withRouter} from'react-router';

function ArtistAlbumListHeader(props) {
  return (
    <div className='bornfight-artistAlbumListHeader__header'>
      <div onClick={() => props.history.goBack()}>
        <i className="material-icons">arrow_back</i><p>{props.artistTitle}</p>
      </div>
    </div>
  )
}

export default withRouter(ArtistAlbumListHeader);