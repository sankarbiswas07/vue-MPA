import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const PageHome = () => import(/* webpack-chunk-name: "PageHome" */ `./components/page/PageHome.vue`);
const PageArticle = () => import(/* webpack-chunk-name: "PageArticle" */ `./components/page/PageArticle.vue`);
const PageList = () => import(/* webpack-chunk-name: "PageList" */ `./components/page/PageList.vue`);

export default new VueRouter({
  routes: [
    {
      name: `home`,
      path: `/`,
      component: PageHome,
    },
    {
      name: `about`,
      path: `/about.html`,
      component: PageArticle,
      meta: {
        title: `Vue | About`,
        metaTags: [
          {
            name: `description`,
            content: `Vue Dynamic About meta`,
          },
        ],
      },
    },
    {
      name: `article`,
      path: `/article`,
      component: PageArticle,
      meta: {
        title: `Vue | Article`,
        metaTags: [
          {
            name: `description`,
            content: `Vue Dynamic Artical meta`,
          },
        ],
      },
    },
    {
      name: `list`,
      path: `/list`,
      component: PageList,
    },
  ],
  mode: `history`,

  // This callback runs before every route change, including on page load.
  beforeEach: (to, from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
    const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);

    // Find the nearest route element with meta tags.
    const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
    const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

    // If a route with a title was found, set the document (page) title to that value.
    if (nearestWithTitle) document.title = nearestWithTitle.meta.title;

    // Remove any stale meta tags from the document using the key attribute we set below.
    Array.from(document.querySelectorAll(`[data-vue-router-controlled]`)).map(el => el.parentNode.removeChild(el));

    // Skip rendering meta tags if there are none.
    if (!nearestWithMeta) return next();

    // Turn the meta tag definitions into actual elements in the head.
    nearestWithMeta.meta.metaTags.map((tagDef) => {
      const tag = document.createElement(`meta`);

      Object.keys(tagDef).forEach((key) => {
        tag.setAttribute(key, tagDef[key]);
      });

      // We use this to track which meta tags we create, so we don't interfere with other ones.
      tag.setAttribute(`data-vue-router-controlled`, ``);

      return tag;
    })
    // Add the meta tags to the document head.
      .forEach(tag => document.head.appendChild(tag));

    next();
  },
});
