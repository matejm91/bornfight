import React from 'react';
import {Link} from "react-router-dom";
import '../../assets/style/_404.css'
import notFound from '../../assets/image/404.webp';

function NotFoundPage() {
  return(
    <div className='bornfight-404page__content'>
      <iframe src={notFound} title='Tom cant find it' width="480" height="370" frameBorder="0" className="giphy-embed" allowFullScreen></iframe>
      <p>sorry mate, can't seem to find the page you're looking for</p>
      <Link to="/">Go to home page</Link>
    </div>
  );
}

export default NotFoundPage;