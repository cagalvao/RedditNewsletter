import snoowrap from 'snoowrap';

const redditAPI = new snoowrap({
  userAgent: 'cgalvao',
  clientId: 'yCI1I5FfRN0o8g',
  clientSecret: 'crOsdx4y4WfK_sx3yC1a-nWQRUg',
  username: 'cagalvao_',
  password: '123456'
});

export async function getPosts(channel) {
  let posts = await redditAPI.getSubreddit(channel).getTop({ time: 'day', limit: 3 });
  posts = posts.map(post => {
    return {
      channel: `https://www.reddit.com/${post.subreddit_name_prefixed}/top`,
      title: post.title,
      content: post.media_embed.content,
      preview: post.preview && post.preview.images && post.preview.images[0] && post.preview.images[0].source ? post.preview.images[0].source.url: undefined,
      thumbnail: post.thumbnail,
      ups: post.ups > 1000 ? (post.ups/1000).toFixed(1) + 'k' : post.ups.toString()
    }
  });

  return posts;
}
