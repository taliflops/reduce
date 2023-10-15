import { useState } from 'react';
import Next from '../assets/Next';
import Union from '../assets/Union';
import Check from '../assets/Check';
import ReducedUrl from './ReducedUrl';
import PreviouslyOnLost from './PreviouslyOnLost';

export default ({error}: {error: string}) => {
  const [original, setOriginal] = useState('');
  const [url, setUrl] = useState('');
  const [showURL, setShowURL] = useState(false);
  const [showError, setError] = useState(error || '');
  const [button, setButton] = useState(<Next />);
  const [lastUrls, setlastUrls] = useState<string[]>([]);

  const updateUrls = (url: string) => {
    setUrl(url)
    const urlList = [...lastUrls]
    if (lastUrls.includes(url)) {
      urlList.splice(lastUrls.indexOf(url), 1)
    }
    urlList.unshift(url)
    if (urlList.length > 3) urlList.pop()
    setlastUrls(urlList)
    setButton(<Check />)
    setShowURL(true)
    setError('')
  }
  
  const cleanInput = () => {
    setButton(<Next />)
    setShowURL(false)
    setError('')
    setUrl('')
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!original) {
      setError('Please enter a valid URL');
      return;
    }
    const { localStorage } = window
    const hasCache = localStorage.getItem(`__reduce__${original}`)
    if (hasCache) {
      updateUrls(`${window.location.origin}/${hasCache}`)
      return
    }
    const response = await fetch('/api/shorten', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ original }),
    });
    const { slug } = await response.json()
    localStorage.setItem(`__reduce__${original}`, slug)
    updateUrls(`${window.location.origin}/${slug}`)
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={{ marginTop: !!lastUrls.length ? '10vh' : '30vh' }}>
        <input
          type='url'
          placeholder='https://www.abc.com/'
          value={original}
          onChange={({ target }) => setOriginal(target.value)}
          onKeyDown={() => cleanInput()}
        />
        <Union />
        <button type='submit'>{button}</button>
      </form>
      {showError && <p>{showError}</p>}
      {showURL && <ReducedUrl url={url}/>}
      {!!lastUrls.length ? <PreviouslyOnLost urls={lastUrls} /> : null}
    </>
  );
};