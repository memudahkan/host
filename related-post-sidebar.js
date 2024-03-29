var randomRelatedIndex, showRelatedPost;
(function(n, m, k) {
  var d = {
    widgetTitle: "<h4>Related Posts:</h4>",
    widgetStyle: 1,
    homePage: "http://www.dte.web.id",
    numPosts: 7,
    summaryLength: 125,
    titleLength: "auto",
    thumbnailSize: 200,
    thumbnailWidth: 125,
    thumbnailHeight: 70,
    noImage: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAA3NCSVQICAjb4U/gAAAADElEQVQImWOor68HAAL+AX7vOF2TAAAAAElFTkSuQmCC",
    containerId: "related-post",
    newTabLink: false,
    moreText: "Baca Selengkapnya",
    callBack: function() {}
  };
  for (var f in relatedPostConfig) {
    d[f] = (relatedPostConfig[f] == "undefined") ? d[f] : relatedPostConfig[f]
  }
  var j = function(a) {
      var b = m.createElement("script");
      b.type = "text/javascript";
      b.src = a;
      k.appendChild(b)
    },
    o = function(b, a) {
      return Math.floor(Math.random() * (a - b + 1)) + b
    },
    l = function(a) {
      var p = a.length,
        c, b;
      if (p === 0) {
        return false
      }
      while (--p) {
        c = Math.floor(Math.random() * (p + 1));
        b = a[p];
        a[p] = a[c];
        a[c] = b
      }
      return a
    },
    e = (typeof labelArray == "object" && labelArray.length > 0) ? "/-/" + l(labelArray)[0] : "",
    h = function(b) {
      var c = b.feed.openSearch$totalResults.$t - d.numPosts,
        a = o(1, (c > 0 ? c : 1));
      j(d.homePage.replace(/\/?\?m=\d+(\&|$)|\/+$/, "") + "/feeds/posts/summary" + e + "?alt=json-in-script&orderby=updated&start-index=" + a + "&max-results=" + d.numPosts + "&callback=showRelatedPost")
    },
    g = function(z) {
      var s = document.getElementById(d.containerId),
        x = l(z.feed.entry),
        A = d.widgetStyle,
        c = d.widgetTitle + '<ul class="related-post-style-' + A + '">',
        b = d.newTabLink ? ' target="_blank"' : "",
        y = '<span class="bg_overlay"></span>',
        v, t, w, r, u;
      if (!s) {
        return
      }
      for (var q = 0; q < d.numPosts; q++) {
        if (q == x.length) {
          break
        }
        t = x[q].title.$t;
        w = (d.titleLength !== "auto" && d.titleLength < t.length) ? t.substring(0, d.titleLength) + "&hellip;" : t;
        r = ("media$thumbnail" in x[q] && d.thumbnailSize !== false) ? x[q].media$thumbnail.url.replace(/.*?:\/\//g, "//").replace(/\/s[0-9]+(\-c)?/, "/w" + d.thumbnailWidth + "-h" + d.thumbnailHeight + "-p" + "-rw") : d.noImage;
        u = ("summary" in x[q] && d.summaryLength > 0) ? x[q].summary.$t.replace(/<br ?\/?>/g, " ").replace(/<.*?>/g, "").replace(/[<>]/g, "").substring(0, d.summaryLength) + "&hellip;" : "";
        for (var p = 0, a = x[q].link.length; p < a; p++) {
          v = (x[q].link[p].rel == "alternate") ? x[q].link[p].href : "#"
        }
        if (A == 2) {
          c += '<li><div class="related-post-item-thumbnail"><img class="lazyload" alt="' + t + '" src="' + r + '" width="' + d.thumbnailWidth + '" height="' + d.thumbnailHeight + '"></div><div class="related-post-item-text"><a class="related-post-item-title" title="' + t + '" href="' + v + '"' + b + ">" + w + '</a><span class="related-post-item-summary"><span class="related-post-item-summary-text">' + u + '</span> <a href="' + v + '" class="related-post-item-more"' + b + ">" + d.moreText + "</a></span></div>" + y + "</li>"
        } else {
          if (A == 3 || A == 4) {
            c += '<li class="related-post-item" tabindex="0"><a class="related-post-item-title-thumb" href="' + v + '"' + b + '><div class="related-post-item-thumbnail"><img class="lazyload" alt="' + t + '" src="' + r + '" width="' + d.thumbnailWidth + '" height="' + d.thumbnailHeight + '"></a></div><div class="related-post-item-tooltip"><a class="related-post-item-title" title="' + t + '" href="' + v + '"' + b + ">" + w + "</a><span>" + u + "</span></div>" + y + "</li>"
          } else {
            if (A == 5) {
              c += '<li class="related-post-item" tabindex="0"><a class="related-post-item-wrapper" href="' + v + '" title="' + t + '"' + b + '><div class="related-post-item-thumbnail"><img class="lazyload" alt="' + t + '" src="' + r + '" width="' + d.thumbnailWidth + '" height="' + d.thumbnailHeight + '"><span class="related-post-item-tooltip">' + w + "</span></a>" + y + "</li>"
            } else {
              if (A == 6) {
                c += '<li><div class="related-post-item-tooltip"><div class="related-post-item-thumbnail"><img class="lazyload" alt="' + t + '" src="' + r + '" width="' + d.thumbnailWidth + '" height="' + d.thumbnailHeight + '"></div><a class="related-post-item-title" title="' + t + '" href="' + v + '"' + b + ">" + w + '</a><span class="related-post-item-summary"><span class="related-post-item-summary-text">' + u + "</span></span>" + y + "</div></li>"
              } else {
                c += '<li><a title="' + t + '" href="' + v + '"' + b + ">" + w + "</a></li>"
              }
            }
          }
        }
      }
      s.innerHTML = c += "</ul>" + y;
      d.callBack()
    };
  randomRelatedIndex = h;
  showRelatedPost = g;
  j(d.homePage.replace(/\/?\?m=\d+(\&|$)|\/+$/, "") + "/feeds/posts/summary" + e + "?alt=json-in-script&orderby=updated&max-results=0&callback=randomRelatedIndex")
})(window, document, document.getElementsByTagName("head")[0]);
