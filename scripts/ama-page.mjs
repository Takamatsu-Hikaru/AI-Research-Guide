export function amaPage(lang) {
 const zh=lang==='zh',board='https://github.com/Takamatsu-Hikaru/Takamatsu-Hikaru.github.io/discussions';
 return `<section id="ama-app">
 <div class="ama-toolbar"><span id="ama-count" role="status">${zh?'加载帖子…':'Loading posts…'}</span><a class="ama-primary" href="${board}/new?category=general" target="_blank" rel="noopener">${zh?'发帖':'New post'}</a></div>
 <div class="ama-filters"><label><span class="sr-only">${zh?'搜索帖子':'Search posts'}</span><input type="search" id="ama-query" placeholder="${zh?'搜索帖子':'Search posts'}"></label><button id="ama-refresh" type="button">${zh?'刷新':'Refresh'}</button></div>
 <div id="ama-list" aria-live="polite"></div><p id="ama-notice" role="status"></p>
 <div class="ama-footer"><span>${zh?'使用 GitHub 账号发帖、回复':'Post and reply with your GitHub account'}</span><a href="${board}/categories/general" target="_blank" rel="noopener">${zh?'进入讨论区':'Open discussions'}</a></div>
 <noscript><a href="${board}/categories/general">${zh?'打开讨论区':'Open discussions'}</a></noscript></section>`;
}
