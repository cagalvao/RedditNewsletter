export function buildHTML(user, newsletter) {
  let html = '<html><head><style>body {font-family: Arial Narrow;padding: 10px;width: 900px;}div {display: inline-block;}.header {color: gray;letter-spacing: 2px;font-weight: 600;font-size: 100px;}h1 {color: gray;letter-spacing: 2px;font-weight: 100;}.post {width: 900px;margin-bottom: 30px;}.channel > h1 {display: inline-block;}.channel {border: 3px solid #000;padding: 0 10px;}.img {padding: 5px;display: block}.upvotes {width: 100px;height: 100px;border-radius: 50%;font-size: 50px;font-weight: 600;color: #fff;line-height: 97px;text-align: center;background: orange;}.title {color: #000;font-weight: 500;font-size: 25px;width: 80%;margin-left: 10px;}</style></head><body>';
  html += `<span class="header">Reddit Newsletter</span><h1>Hello ${user.name},</h1><h1>See yesterday's top voted posts from your favorite channel</h1>`;
  Object.keys(newsletter).forEach(channel => {
    newsletter[channel].forEach(post => {
      html += '<div class="post">';
      html += `<div class="channel"><h1>${channel}:</h1><h1><a href="${post.channel}">${post.channel}</a></h1></div>`;
      if (post.content) {
        html += `<div class="img">${post.content}</div>`;
      } else if (post.preview) {
        html += `<div class="img"><img style="max-width: 850px;" src="${post.preview}"></img></div>`;
      } else if (post.thumbnail) {
        html += `<div class="img"><img style="height: 30px;" src="${post.thumbnail}"></img></div>`;
      } else {
        html += `<div class="img">NO IMAGE</div>`;
      }        
      html += `<div class="description"><div class="upvotes">${post.ups}</div><div class="title">${post.title}</div></div>`
      html += '</div>';
    });    
  })
  html += '</body></html>';
  return html;
}