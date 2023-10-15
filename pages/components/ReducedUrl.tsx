import { useState } from 'react';

import React from 'react';

type Props = {
  url: string;
};

const ReducedUrl: React.FC<Props> = ({ url }) => {
  return <a href={url}>{url}</a>;
};

export default ReducedUrl;
