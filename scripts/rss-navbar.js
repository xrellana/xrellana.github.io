'use strict';

const desktopRssIcon = '<svg class="rss-icon" viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" focusable="false" style="display:inline-block;font-size:.875rem;line-height:inherit;vertical-align:-.125em;fill:currentColor"><path d="M6.18 17.82a2.18 2.18 0 1 1 0 4.36a2.18 2.18 0 0 1 0-4.36ZM4 10.74c5.11 0 9.26 4.15 9.26 9.26h-3.1A6.16 6.16 0 0 0 4 13.84v-3.1ZM4 3c9.39 0 17 7.61 17 17h-3.1C17.9 12.33 11.67 6.1 4 6.1V3Z"/></svg>';
const mobileRssIcon = '<svg class="rss-icon" viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" focusable="false" style="display:inline-block;font-size:1.6rem;line-height:1;margin-bottom:.4rem;fill:currentColor"><path d="M6.18 17.82a2.18 2.18 0 1 1 0 4.36a2.18 2.18 0 0 1 0-4.36ZM4 10.74c5.11 0 9.26 4.15 9.26 9.26h-3.1A6.16 6.16 0 0 0 4 13.84v-3.1ZM4 3c9.39 0 17 7.61 17 17h-3.1C17.9 12.33 11.67 6.1 4 6.1V3Z"/></svg>';
const iconPattern = '(?:<i class="[^"]+"></i>|<svg[\\s\\S]*?</svg>)';

hexo.extend.filter.register('after_render:html', html => {
  if (!html.includes('/atom.xml') || !html.includes('RSS')) {
    return html;
  }

  return replaceRssIcons(moveRssAfterSearch(html));
});

function moveRssAfterSearch(html) {
  const desktopPattern = new RegExp(
    `(\\s*<li class="nav-item">\\s*<a class="nav-link" href="/atom\\.xml" target="_self">\\s*${iconPattern}\\s*<span>RSS</span>\\s*</a>\\s*</li>)([\\s\\S]*?)(\\s*<li class="nav-item" id="search-btn">[\\s\\S]*?</li>)`
  );
  const mobilePattern = new RegExp(
    `(\\s*<div class="col-4 mobile-grid-cell">\\s*<a href="/atom\\.xml" target="_self">\\s*<div class="mobile-grid-item">\\s*${iconPattern}\\s*<span>RSS</span>\\s*</div>\\s*</a>\\s*</div>)([\\s\\S]*?)(\\s*<div class="col-4 mobile-grid-cell" id="mobile-search-btn">[\\s\\S]*?</div>\\s*</a>\\s*</div>)`
  );

  return html
    .replace(desktopPattern, '$2$3$1')
    .replace(mobilePattern, '$2$3$1');
}

function replaceRssIcons(html) {
  return html
    .replace(
      new RegExp(`(<a class="nav-link" href="/atom\\.xml" target="_self")>(\\s*)${iconPattern}\\s*<span>RSS</span>`, 'g'),
      `$1 aria-label="RSS">$2${desktopRssIcon}`
    )
    .replace(
      new RegExp(`(<a href="/atom\\.xml" target="_self")>(\\s*<div class="mobile-grid-item">\\s*)${iconPattern}\\s*<span>RSS</span>`, 'g'),
      `$1 aria-label="RSS">$2${mobileRssIcon}`
    );
}
