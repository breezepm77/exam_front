import React from 'react';
import loadingLogo from '../../image/loading.svg';
import './Loading.scss';

function Loading() {
  return (
    <div className='loading_div'>
      <img src={loadingLogo} alt="loading" />
    </div>
  );
}

export default Loading;
