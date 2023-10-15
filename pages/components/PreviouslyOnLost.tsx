import { useState } from 'react';

import React from 'react';

type Props = {
  urls: string[];
};

const ReducedUrl: React.FC<Props> = ({ urls }) => (
  <div>
    <p>History</p>
    {urls.map(url => (
      <a href={url}>{url}</a>
    ))}
  </div>
);

export default ReducedUrl;

