const PROFILES = {
  "www.nytimes.com": {
    selectors: ['article', 'a', '.story', '.ledeStory', '.videoContainer'],
    label: 'nytimes'
  },
  "www.cnn.com": {
    selectors: ['article', 'a', '.breaking-news', '.cn'],
    label: 'cnn'
  },
  default: {
    selectors: ['article', 'p', 'span', 'em', 'strong', 'h1', 'h2', 'h2', 'h3', 'h4', 'h5'],
    label: 'default'
  }
};

export default PROFILES;