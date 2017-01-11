const PROFILES = {
  "www.nytimes.com": {
    selectors: ['article', 'a', '.story', '.ledeStory', '.videoContainer'],
    label: 'nytimes'
  },
  "www.cnn.com": {
    selectors: ['article', 'a', '.breaking-news', '.cn'],
    label: 'cnn'
  },
  "www.yahoo.com": {
    selectors: ['.js-stream-content'],
    label: 'yahoo'
  },
  "news.google.com": {
    selectors: ['.story', '.topic', '.nav-item'],
    label: 'google'
  },
  "www.dailymail.co.uk": {
    selectors: ['.article', '.puff li', '.tabbed-headlines li', 'a'],
    label: 'dailymail'
  },
  "www.huffingtonpost.com": {
    selectors: ['.card', '.splash'],
    label: 'huffingtonpost'
  },
  "news.ycombinator.com": {
    selectors: ['.athing'],
    label: 'hn'
  },
  "twitter.com": {
    selectors: ['.stream-item', '.tweet'],
    label: 'twitter'
  },
  "www.facebook.com": {
    selectors: ['.userContentWrapper'],
    label: 'facebook'
  },
  "www.metafilter.com": {
    selectors: ['.copy.post', 'a', '.posttitle', '.copy'],
    label: 'metafilter'
  },
  default: {
    selectors: ['article', 'p', 'span', 'em', 'strong', 'h1', 'h2', 'h2', 'h3', 'h4', 'h5'],
    label: 'default'
  }
};

export default PROFILES;