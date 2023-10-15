import { useEffect } from 'react';

export default () => {
  useEffect(() => {
    const slug = window.location.href.split('/').pop();
    window.location.href = `${window.location.origin}/api/${slug}`
  }, [])
};
