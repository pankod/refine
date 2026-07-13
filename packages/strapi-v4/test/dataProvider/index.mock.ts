import nock from "nock";

// create
nock("http://localhost:1337", { encodedQueryParams: true })
  .post("/api/posts", {
    data: { title: "foo", content: "bar", cover: ["32"] },
  })
  .reply(
    200,
    {
      data: {
        id: 20,
        attributes: {
          title: "foo",
          content: "bar",
          createdAt: "2021-12-14T11:45:49.631Z",
          updatedAt: "2021-12-14T11:45:49.631Z",
          publishedAt: "2021-12-14T11:45:49.621Z",
          locale: "en",
        },
      },
      meta: {},
    },
    [
      "Content-Security-Policy",
      "connect-src 'self' https:;img-src 'self' data: blob:;media-src 'self' data: blob:;default-src 'self';base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline'",
      "X-DNS-Prefetch-Control",
      "off",
      "Expect-CT",
      "max-age=0",
      "X-Frame-Options",
      "SAMEORIGIN",
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
      "X-Download-Options",
      "noopen",
      "X-Content-Type-Options",
      "nosniff",
      "X-Permitted-Cross-Domain-Policies",
      "none",
      "Referrer-Policy",
      "no-referrer",
      "Vary",
      "Origin",
      "Content-Type",
      "application/json; charset=utf-8",
      "X-Powered-By",
      "Strapi <strapi.io>",
      "Content-Length",
      "206",
      "Date",
      "Tue, 14 Dec 2021 11:45:49 GMT",
      "Connection",
      "close",
    ],
  );

// deleteMany
nock("http://localhost:1337", { encodedQueryParams: true })
  .delete("/api/posts/20")
  .reply(
    200,
    {
      data: {
        id: 20,
        attributes: {
          title: "foo",
          content: "bar",
          createdAt: "2021-12-14T11:45:49.631Z",
          updatedAt: "2021-12-14T11:45:49.631Z",
          publishedAt: "2021-12-14T11:45:49.621Z",
          locale: "en",
        },
      },
      meta: {},
    },
    [
      "Content-Security-Policy",
      "connect-src 'self' https:;img-src 'self' data: blob:;media-src 'self' data: blob:;default-src 'self';base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline'",
      "X-DNS-Prefetch-Control",
      "off",
      "Expect-CT",
      "max-age=0",
      "X-Frame-Options",
      "SAMEORIGIN",
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
      "X-Download-Options",
      "noopen",
      "X-Content-Type-Options",
      "nosniff",
      "X-Permitted-Cross-Domain-Policies",
      "none",
      "Referrer-Policy",
      "no-referrer",
      "Vary",
      "Origin",
      "Content-Type",
      "application/json; charset=utf-8",
      "X-Powered-By",
      "Strapi <strapi.io>",
      "Content-Length",
      "206",
      "Date",
      "Tue, 14 Dec 2021 11:52:45 GMT",
      "Connection",
      "close",
    ],
  );

// deleteOne
nock("http://localhost:1337", { encodedQueryParams: true })
  .delete("/api/posts/18")
  .reply(
    200,
    {
      data: {
        id: 18,
        attributes: {
          title: "foo",
          content: "bar",
          createdAt: "2021-12-14T11:43:40.712Z",
          updatedAt: "2021-12-14T11:43:40.712Z",
          publishedAt: "2021-12-14T11:43:40.704Z",
          locale: "en",
        },
      },
      meta: {},
    },
    [
      "Content-Security-Policy",
      "connect-src 'self' https:;img-src 'self' data: blob:;media-src 'self' data: blob:;default-src 'self';base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline'",
      "X-DNS-Prefetch-Control",
      "off",
      "Expect-CT",
      "max-age=0",
      "X-Frame-Options",
      "SAMEORIGIN",
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
      "X-Download-Options",
      "noopen",
      "X-Content-Type-Options",
      "nosniff",
      "X-Permitted-Cross-Domain-Policies",
      "none",
      "Referrer-Policy",
      "no-referrer",
      "Vary",
      "Origin",
      "Content-Type",
      "application/json; charset=utf-8",
      "X-Powered-By",
      "Strapi <strapi.io>",
      "Content-Length",
      "206",
      "Date",
      "Tue, 14 Dec 2021 11:58:06 GMT",
      "Connection",
      "close",
    ],
  );

// getList
nock("http://localhost:1337", { encodedQueryParams: true })
  .get("/api/posts")
  .query({ "pagination%5Bpage%5D": "1", "pagination%5BpageSize%5D": "10" })
  .reply(
    200,
    {
      data: [
        {
          id: 5,
          attributes: {
            title: "Lorem ipsum began as scrambled",
            content:
              "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:\n\n\n_**“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.”**_\n\n\nThe purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesn't distract from the layout. A practice not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on design, not content.\n\nThe passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their software. Today it's seen all around the web; on templates, websites, and stock designs. Use our generator to get your own, or read on for the authoritative history of lorem ipsum.",
            createdAt: "2021-12-09T08:53:47.226Z",
            updatedAt: "2021-12-13T11:51:43.224Z",
            publishedAt: "2021-12-09T13:45:40.088Z",
            locale: "en",
          },
        },
        {
          id: 3,
          attributes: {
            title: "Cras iaculis ultricies nulla",
            content:
              "**Morbi in sem quis dui placerat ornare**. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat.\n\nPraesent dapibus, neque id cursus faucibus, tortor neque egestas auguae, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.",
            createdAt: "2021-12-08T14:36:57.102Z",
            updatedAt: "2021-12-08T14:37:47.584Z",
            publishedAt: "2021-12-08T14:37:02.174Z",
            locale: "en",
          },
        },
        {
          id: 17,
          attributes: {
            title: "foo",
            content: "bar",
            createdAt: "2021-12-14T11:42:37.945Z",
            updatedAt: "2021-12-14T11:42:37.945Z",
            publishedAt: "2021-12-14T11:42:37.914Z",
            locale: "en",
          },
        },
        {
          id: 19,
          attributes: {
            title: "foo",
            content: "bar",
            createdAt: "2021-12-14T11:45:30.710Z",
            updatedAt: "2021-12-14T11:45:30.710Z",
            publishedAt: "2021-12-14T11:45:30.700Z",
            locale: "en",
          },
        },
        {
          id: 21,
          attributes: {
            title: "foo",
            content: "bar",
            createdAt: "2021-12-14T11:47:01.493Z",
            updatedAt: "2021-12-14T11:47:01.493Z",
            publishedAt: "2021-12-14T11:47:01.482Z",
            locale: "en",
          },
        },
        {
          id: 8,
          attributes: {
            title: "Hello",
            content: "New post content",
            createdAt: "2021-12-10T13:10:58.478Z",
            updatedAt: "2021-12-13T13:56:11.613Z",
            publishedAt: "2021-12-10T13:10:58.328Z",
            locale: "en",
          },
        },
      ],
      meta: {
        pagination: { page: 1, pageSize: 10, pageCount: 1, total: 6 },
      },
    },
    [
      "Content-Security-Policy",
      "connect-src 'self' https:;img-src 'self' data: blob:;media-src 'self' data: blob:;default-src 'self';base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline'",
      "X-DNS-Prefetch-Control",
      "off",
      "Expect-CT",
      "max-age=0",
      "X-Frame-Options",
      "SAMEORIGIN",
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
      "X-Download-Options",
      "noopen",
      "X-Content-Type-Options",
      "nosniff",
      "X-Permitted-Cross-Domain-Policies",
      "none",
      "Referrer-Policy",
      "no-referrer",
      "Vary",
      "Origin",
      "Content-Type",
      "application/json; charset=utf-8",
      "X-Powered-By",
      "Strapi <strapi.io>",
      "Content-Length",
      "2749",
      "Date",
      "Tue, 14 Dec 2021 12:00:07 GMT",
      "Connection",
      "close",
    ],
  );

nock("http://localhost:1337", { encodedQueryParams: true })
  .get("/api/posts")
  .query({
    "pagination%5Bpage%5D": "1",
    "pagination%5BpageSize%5D": "10",
    sort: "id%3Adesc",
  })
  .reply(
    200,
    {
      data: [
        {
          id: 21,
          attributes: {
            title: "foo",
            content: "bar",
            createdAt: "2021-12-14T11:47:01.493Z",
            updatedAt: "2021-12-14T11:47:01.493Z",
            publishedAt: "2021-12-14T11:47:01.482Z",
            locale: "en",
          },
        },
        {
          id: 19,
          attributes: {
            title: "foo",
            content: "bar",
            createdAt: "2021-12-14T11:45:30.710Z",
            updatedAt: "2021-12-14T11:45:30.710Z",
            publishedAt: "2021-12-14T11:45:30.700Z",
            locale: "en",
          },
        },
        {
          id: 17,
          attributes: {
            title: "foo",
            content: "bar",
            createdAt: "2021-12-14T11:42:37.945Z",
            updatedAt: "2021-12-14T11:42:37.945Z",
            publishedAt: "2021-12-14T11:42:37.914Z",
            locale: "en",
          },
        },
        {
          id: 8,
          attributes: {
            title: "Hello",
            content: "New post content",
            createdAt: "2021-12-10T13:10:58.478Z",
            updatedAt: "2021-12-13T13:56:11.613Z",
            publishedAt: "2021-12-10T13:10:58.328Z",
            locale: "en",
          },
        },
        {
          id: 5,
          attributes: {
            title: "Lorem ipsum began as scrambled",
            content:
              "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:\n\n\n_**“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.”**_\n\n\nThe purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesn't distract from the layout. A practice not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on design, not content.\n\nThe passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their software. Today it's seen all around the web; on templates, websites, and stock designs. Use our generator to get your own, or read on for the authoritative history of lorem ipsum.",
            createdAt: "2021-12-09T08:53:47.226Z",
            updatedAt: "2021-12-13T11:51:43.224Z",
            publishedAt: "2021-12-09T13:45:40.088Z",
            locale: "en",
          },
        },
        {
          id: 3,
          attributes: {
            title: "Cras iaculis ultricies nulla",
            content:
              "**Morbi in sem quis dui placerat ornare**. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat.\n\nPraesent dapibus, neque id cursus faucibus, tortor neque egestas auguae, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.",
            createdAt: "2021-12-08T14:36:57.102Z",
            updatedAt: "2021-12-08T14:37:47.584Z",
            publishedAt: "2021-12-08T14:37:02.174Z",
            locale: "en",
          },
        },
      ],
      meta: {
        pagination: { page: 1, pageSize: 10, pageCount: 1, total: 6 },
      },
    },
    [
      "Content-Security-Policy",
      "connect-src 'self' https:;img-src 'self' data: blob:;media-src 'self' data: blob:;default-src 'self';base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline'",
      "X-DNS-Prefetch-Control",
      "off",
      "Expect-CT",
      "max-age=0",
      "X-Frame-Options",
      "SAMEORIGIN",
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
      "X-Download-Options",
      "noopen",
      "X-Content-Type-Options",
      "nosniff",
      "X-Permitted-Cross-Domain-Policies",
      "none",
      "Referrer-Policy",
      "no-referrer",
      "Vary",
      "Origin",
      "Content-Type",
      "application/json; charset=utf-8",
      "X-Powered-By",
      "Strapi <strapi.io>",
      "Content-Length",
      "2749",
      "Date",
      "Tue, 14 Dec 2021 12:22:42 GMT",
      "Connection",
      "close",
    ],
  );

nock("http://localhost:1337", { encodedQueryParams: true })
  .get("/api/posts")
  .query({
    "pagination%5Bpage%5D": "1",
    "pagination%5BpageSize%5D": "10",
    "filters%5Btitle%5D%5B%24eq%5D": "foo",
  })
  .reply(
    200,
    {
      data: [
        {
          id: 17,
          attributes: {
            title: "foo",
            content: "bar",
            createdAt: "2021-12-14T11:42:37.945Z",
            updatedAt: "2021-12-14T11:42:37.945Z",
            publishedAt: "2021-12-14T11:42:37.914Z",
            locale: "en",
          },
        },
        {
          id: 19,
          attributes: {
            title: "foo",
            content: "bar",
            createdAt: "2021-12-14T11:45:30.710Z",
            updatedAt: "2021-12-14T11:45:30.710Z",
            publishedAt: "2021-12-14T11:45:30.700Z",
            locale: "en",
          },
        },
        {
          id: 21,
          attributes: {
            title: "foo",
            content: "bar",
            createdAt: "2021-12-14T11:47:01.493Z",
            updatedAt: "2021-12-14T11:47:01.493Z",
            publishedAt: "2021-12-14T11:47:01.482Z",
            locale: "en",
          },
        },
      ],
      meta: {
        pagination: { page: 1, pageSize: 10, pageCount: 1, total: 3 },
      },
    },
    [
      "Content-Security-Policy",
      "connect-src 'self' https:;img-src 'self' data: blob:;media-src 'self' data: blob:;default-src 'self';base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline'",
      "X-DNS-Prefetch-Control",
      "off",
      "Expect-CT",
      "max-age=0",
      "X-Frame-Options",
      "SAMEORIGIN",
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
      "X-Download-Options",
      "noopen",
      "X-Content-Type-Options",
      "nosniff",
      "X-Permitted-Cross-Domain-Policies",
      "none",
      "Referrer-Policy",
      "no-referrer",
      "Vary",
      "Origin",
      "Content-Type",
      "application/json; charset=utf-8",
      "X-Powered-By",
      "Strapi <strapi.io>",
      "Content-Length",
      "645",
      "Date",
      "Tue, 14 Dec 2021 12:39:33 GMT",
      "Connection",
      "close",
    ],
  );

nock("http://localhost:1337", { encodedQueryParams: true })
  .get("/api/posts")
  .query({
    "pagination%5Bpage%5D": "1",
    "pagination%5BpageSize%5D": "10",
    sort: "id%3Adesc",
    "filters%5Btitle%5D%5B%24eq%5D": "foo",
  })
  .reply(
    200,
    {
      data: [
        {
          id: 21,
          attributes: {
            title: "foo",
            content: "bar",
            createdAt: "2021-12-14T11:47:01.493Z",
            updatedAt: "2021-12-14T11:47:01.493Z",
            publishedAt: "2021-12-14T11:47:01.482Z",
            locale: "en",
          },
        },
        {
          id: 19,
          attributes: {
            title: "foo",
            content: "bar",
            createdAt: "2021-12-14T11:45:30.710Z",
            updatedAt: "2021-12-14T11:45:30.710Z",
            publishedAt: "2021-12-14T11:45:30.700Z",
            locale: "en",
          },
        },
        {
          id: 17,
          attributes: {
            title: "foo",
            content: "bar",
            createdAt: "2021-12-14T11:42:37.945Z",
            updatedAt: "2021-12-14T11:42:37.945Z",
            publishedAt: "2021-12-14T11:42:37.914Z",
            locale: "en",
          },
        },
      ],
      meta: {
        pagination: { page: 1, pageSize: 10, pageCount: 1, total: 3 },
      },
    },
    [
      "Content-Security-Policy",
      "connect-src 'self' https:;img-src 'self' data: blob:;media-src 'self' data: blob:;default-src 'self';base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline'",
      "X-DNS-Prefetch-Control",
      "off",
      "Expect-CT",
      "max-age=0",
      "X-Frame-Options",
      "SAMEORIGIN",
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
      "X-Download-Options",
      "noopen",
      "X-Content-Type-Options",
      "nosniff",
      "X-Permitted-Cross-Domain-Policies",
      "none",
      "Referrer-Policy",
      "no-referrer",
      "Vary",
      "Origin",
      "Content-Type",
      "application/json; charset=utf-8",
      "X-Powered-By",
      "Strapi <strapi.io>",
      "Content-Length",
      "645",
      "Date",
      "Tue, 14 Dec 2021 12:40:28 GMT",
      "Connection",
      "close",
    ],
  );

nock("http://localhost:1337", { encodedQueryParams: true })
  .get("/api/posts")
  .query({
    "pagination%5Bpage%5D": "1",
    "pagination%5BpageSize%5D": "10",
    locale: "de",
  })
  .reply(
    200,
    {
      data: [
        {
          id: 15,
          attributes: {
            title: "Hello",
            content: "Hello",
            createdAt: "2021-12-13T13:43:37.061Z",
            updatedAt: "2021-12-13T13:43:37.061Z",
            publishedAt: "2021-12-13T13:43:37.044Z",
            locale: "de",
          },
        },
        {
          id: 4,
          attributes: {
            title: "Exerci Hockenheim eu per",
            content:
              "**Fernweh sadipscing per at**, Faust mei ullum gloriatur. Fußballweltmeisterschaft inermis recteque accommodare Frau Professor Id nec assum Welt te melius erroribus Polizei Nec ut amet Ritter Sport iriure, prodesset gloriatur Bahnhof ut. Dicunt virtute schnell per no. At Fußball scaevola eum. An Gesundheit malorum efficiendi ius\n\nmeliore Lebkuchen et mel. Te Mertesacker utamur vix. Exerci Hockenheim eu per. Principes Bratwurst eos no. His Rubin auf Schienen moderatius ut, at Frohsinn omnis minim epicurei, was machst du feugait mel ei. Bier purto singulis te",
            createdAt: "2021-12-08T14:37:47.408Z",
            updatedAt: "2021-12-08T14:37:48.604Z",
            publishedAt: "2021-12-08T14:37:48.599Z",
            locale: "de",
          },
        },
        {
          id: 2,
          attributes: {
            title: "Te oratio Schneewittchen vix.",
            content:
              "**Sit amet**, Zauberer adipiscing elit, sed Joachim Löw eiusmod tempor incididunt Mertesacker labore et dolore Frau Professor aliqua. Ut enim Siebentausendzweihundertvierundfünfzig minim veniam, quis Currywurst exercitation ullamco laboris Honigkuchenpferd ut aliquip ex Reise commodo consequat. Duis Nackenheim irure dolor in Heisenberg in voluptate velit Schmetterling cillum dolore eu Frohsinn nulla pariatur. Excepteur Projektplanung occaecat cupidatat non Milchreis sunt in culpa Schwarzwälder Kirschtorte officia deserunt mollit Schwarzwälder Kirschtorte id est laborum",
            createdAt: "2021-12-08T14:35:24.455Z",
            updatedAt: "2021-12-13T12:18:13.439Z",
            publishedAt: "2021-12-08T14:35:26.233Z",
            locale: "de",
          },
        },
      ],
      meta: {
        pagination: { page: 1, pageSize: 10, pageCount: 1, total: 3 },
      },
    },
    [
      "Content-Security-Policy",
      "connect-src 'self' https:;img-src 'self' data: blob:;media-src 'self' data: blob:;default-src 'self';base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline'",
      "X-DNS-Prefetch-Control",
      "off",
      "Expect-CT",
      "max-age=0",
      "X-Frame-Options",
      "SAMEORIGIN",
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
      "X-Download-Options",
      "noopen",
      "X-Content-Type-Options",
      "nosniff",
      "X-Permitted-Cross-Domain-Policies",
      "none",
      "Referrer-Policy",
      "no-referrer",
      "Vary",
      "Origin",
      "Content-Type",
      "application/json; charset=utf-8",
      "X-Powered-By",
      "Strapi <strapi.io>",
      "Content-Length",
      "1834",
      "Date",
      "Wed, 15 Dec 2021 08:53:01 GMT",
      "Connection",
      "close",
    ],
  );

nock("http://localhost:1337", { encodedQueryParams: true })
  .get("/api/posts")
  .query({
    "pagination%5Bpage%5D": "1",
    "pagination%5BpageSize%5D": "10",
    "fields%5B0%5D": "title",
    "fields%5B1%5D": "content",
  })
  .reply(
    200,
    {
      data: [
        {
          id: 5,
          attributes: {
            title: "Lorem ipsum began as scrambled",
            content:
              "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:\n\n\n_**“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.”**_\n\n\nThe purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesn't distract from the layout. A practice not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on design, not content.\n\nThe passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their software. Today it's seen all around the web; on templates, websites, and stock designs. Use our generator to get your own, or read on for the authoritative history of lorem ipsum.",
          },
        },
        {
          id: 3,
          attributes: {
            title: "Cras iaculis ultricies nulla",
            content:
              "**Morbi in sem quis dui placerat ornare**. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat.\n\nPraesent dapibus, neque id cursus faucibus, tortor neque egestas auguae, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.",
          },
        },
        {
          id: 37,
          attributes: {
            title: "New Post Two",
            content: "New Content Two",
          },
        },
        { id: 39, attributes: { title: "test", content: "test" } },
      ],
      meta: {
        pagination: { page: 1, pageSize: 10, pageCount: 1, total: 4 },
      },
    },
    [
      "Content-Security-Policy",
      "connect-src 'self' https:;img-src 'self' data: blob:;media-src 'self' data: blob:;default-src 'self';base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline'",
      "X-DNS-Prefetch-Control",
      "off",
      "Expect-CT",
      "max-age=0",
      "X-Frame-Options",
      "SAMEORIGIN",
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
      "X-Download-Options",
      "noopen",
      "X-Content-Type-Options",
      "nosniff",
      "X-Permitted-Cross-Domain-Policies",
      "none",
      "Referrer-Policy",
      "no-referrer",
      "Vary",
      "Origin",
      "Content-Type",
      "application/json; charset=utf-8",
      "X-Powered-By",
      "Strapi <strapi.io>",
      "Content-Length",
      "1850",
      "Date",
      "Wed, 15 Dec 2021 09:07:17 GMT",
      "Connection",
      "close",
    ],
  );

nock("http://localhost:1337", { encodedQueryParams: true })
  .get("/api/posts")
  .query({
    "pagination%5Bpage%5D": "1",
    "pagination%5BpageSize%5D": "10",
    "populate%5B0%5D": "category",
  })
  .reply(
    200,
    {
      data: [
        {
          id: 5,
          attributes: {
            title: "Lorem ipsum began as scrambled",
            content:
              "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:\n\n\n_**“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.”**_\n\n\nThe purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesn't distract from the layout. A practice not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on design, not content.\n\nThe passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their software. Today it's seen all around the web; on templates, websites, and stock designs. Use our generator to get your own, or read on for the authoritative history of lorem ipsum.",
            createdAt: "2021-12-09T08:53:47.226Z",
            updatedAt: "2021-12-13T11:51:43.224Z",
            publishedAt: "2021-12-09T13:45:40.088Z",
            locale: "en",
            category: {
              data: {
                id: 1,
                attributes: {
                  title: "Vestibulum auctor",
                  createdAt: "2021-12-08T14:32:02.871Z",
                  updatedAt: "2021-12-08T14:34:14.289Z",
                  publishedAt: "2021-12-08T14:32:04.465Z",
                  locale: "en",
                },
              },
            },
          },
        },
        {
          id: 3,
          attributes: {
            title: "Cras iaculis ultricies nulla",
            content:
              "**Morbi in sem quis dui placerat ornare**. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat.\n\nPraesent dapibus, neque id cursus faucibus, tortor neque egestas auguae, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.",
            createdAt: "2021-12-08T14:36:57.102Z",
            updatedAt: "2021-12-08T14:37:47.584Z",
            publishedAt: "2021-12-08T14:37:02.174Z",
            locale: "en",
            category: {
              data: {
                id: 1,
                attributes: {
                  title: "Vestibulum auctor",
                  createdAt: "2021-12-08T14:32:02.871Z",
                  updatedAt: "2021-12-08T14:34:14.289Z",
                  publishedAt: "2021-12-08T14:32:04.465Z",
                  locale: "en",
                },
              },
            },
          },
        },
        {
          id: 37,
          attributes: {
            title: "New Post Two",
            content: "New Content Two",
            createdAt: "2021-12-14T13:35:35.095Z",
            updatedAt: "2021-12-15T08:07:42.272Z",
            publishedAt: "2021-12-14T13:35:35.082Z",
            locale: "en",
            category: {
              data: {
                id: 1,
                attributes: {
                  title: "Vestibulum auctor",
                  createdAt: "2021-12-08T14:32:02.871Z",
                  updatedAt: "2021-12-08T14:34:14.289Z",
                  publishedAt: "2021-12-08T14:32:04.465Z",
                  locale: "en",
                },
              },
            },
          },
        },
        {
          id: 39,
          attributes: {
            title: "test",
            content: "test",
            createdAt: "2021-12-15T08:28:20.103Z",
            updatedAt: "2021-12-15T08:28:20.103Z",
            publishedAt: "2021-12-15T08:28:20.085Z",
            locale: "en",
            category: { data: null },
          },
        },
      ],
      meta: {
        pagination: { page: 1, pageSize: 10, pageCount: 1, total: 4 },
      },
    },
    [
      "Content-Security-Policy",
      "connect-src 'self' https:;img-src 'self' data: blob:;media-src 'self' data: blob:;default-src 'self';base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline'",
      "X-DNS-Prefetch-Control",
      "off",
      "Expect-CT",
      "max-age=0",
      "X-Frame-Options",
      "SAMEORIGIN",
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
      "X-Download-Options",
      "noopen",
      "X-Content-Type-Options",
      "nosniff",
      "X-Permitted-Cross-Domain-Policies",
      "none",
      "Referrer-Policy",
      "no-referrer",
      "Vary",
      "Origin",
      "Content-Type",
      "application/json; charset=utf-8",
      "X-Powered-By",
      "Strapi <strapi.io>",
      "Content-Length",
      "3022",
      "Date",
      "Wed, 15 Dec 2021 09:15:48 GMT",
      "Connection",
      "close",
    ],
  );

//getMany
nock("http://localhost:1337", { encodedQueryParams: true })
  .get("/api/posts")
  .query({
    "populate%5B0%5D": "category",
    "filters%5Bid%5D%5B%24in%5D%5B0%5D": "30",
    "filters%5Bid%5D%5B%24in%5D%5B1%5D": "29",
    "pagination%5BpageSize%5D": "2",
  })
  .reply(
    200,
    {
      data: [
        {
          id: 29,
          attributes: {
            title: "Hello",
            content: "Testtt ",
            createdAt: "2022-05-31T09:26:26.195Z",
            updatedAt: "2022-05-31T15:51:02.594Z",
            publishedAt: "2022-05-31T09:26:26.179Z",
            locale: "en",
            category: {
              data: {
                id: 11,
                attributes: {
                  title: "Test1ree",
                  createdAt: "2022-02-21T04:32:23.688Z",
                  updatedAt: "2022-03-29T15:12:29.279Z",
                  publishedAt: "2022-02-21T04:32:23.679Z",
                  locale: "en",
                },
              },
            },
          },
        },
        {
          id: 30,
          attributes: {
            title: "test",
            content: "test",
            createdAt: "2022-06-01T09:07:37.786Z",
            updatedAt: "2022-06-01T09:07:37.786Z",
            publishedAt: "2022-06-01T09:07:37.776Z",
            locale: "en",
            category: {
              data: {
                id: 12,
                attributes: {
                  title: "sdasd",
                  createdAt: "2022-03-08T06:50:11.851Z",
                  updatedAt: "2022-03-08T06:50:11.851Z",
                  publishedAt: "2022-03-08T06:50:11.834Z",
                  locale: "en",
                },
              },
            },
          },
        },
      ],
      meta: {
        pagination: { page: 1, pageSize: 25, pageCount: 1, total: 2 },
      },
    },
    [
      "Date",
      "Wed, 15 Jun 2022 07:09:12 GMT",
      "Content-Type",
      "application/json; charset=utf-8",
      "Content-Length",
      "856",
      "Connection",
      "close",
      "Content-Security-Policy",
      "connect-src 'self' https:;img-src 'self' data: blob:;media-src 'self' data: blob:;default-src 'self';base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline'",
      "X-DNS-Prefetch-Control",
      "off",
      "Expect-CT",
      "max-age=0",
      "X-Frame-Options",
      "SAMEORIGIN",
      "Strict-Transport-Security",
      "max-age=15724800; includeSubDomains",
      "X-Download-Options",
      "noopen",
      "X-Content-Type-Options",
      "nosniff",
      "X-Permitted-Cross-Domain-Policies",
      "none",
      "Referrer-Policy",
      "no-referrer",
      "Vary",
      "Origin",
      "X-Powered-By",
      "Strapi <strapi.io>",
    ],
  );
//getOne
nock("http://localhost:1337", { encodedQueryParams: true })
  .get("/api/posts/8")
  .query({})
  .reply(
    200,
    {
      data: {
        id: 8,
        attributes: {
          title: "Hello",
          content: "New post content",
          createdAt: "2021-12-10T13:10:58.478Z",
          updatedAt: "2021-12-13T13:56:11.613Z",
          publishedAt: "2021-12-10T13:10:58.328Z",
          locale: "en",
        },
      },
      meta: {},
    },
    [
      "Content-Security-Policy",
      "connect-src 'self' https:;img-src 'self' data: blob:;media-src 'self' data: blob:;default-src 'self';base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline'",
      "X-DNS-Prefetch-Control",
      "off",
      "Expect-CT",
      "max-age=0",
      "X-Frame-Options",
      "SAMEORIGIN",
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
      "X-Download-Options",
      "noopen",
      "X-Content-Type-Options",
      "nosniff",
      "X-Permitted-Cross-Domain-Policies",
      "none",
      "Referrer-Policy",
      "no-referrer",
      "Vary",
      "Origin",
      "Content-Type",
      "application/json; charset=utf-8",
      "X-Powered-By",
      "Strapi <strapi.io>",
      "Content-Length",
      "220",
      "Date",
      "Tue, 14 Dec 2021 12:43:33 GMT",
      "Connection",
      "close",
    ],
  );

// updateOne
nock("http://localhost:1337", { encodedQueryParams: true })
  .put("/api/posts/8", { data: { title: "Updated Title" } })
  .reply(
    200,
    {
      data: {
        id: 8,
        attributes: {
          title: "Updated Title",
          content: "New post content",
          createdAt: "2021-12-10T13:10:58.478Z",
          updatedAt: "2021-12-14T13:21:10.916Z",
          publishedAt: "2021-12-10T13:10:58.328Z",
          locale: "en",
        },
      },
      meta: {},
    },
    [
      "Content-Security-Policy",
      "connect-src 'self' https:;img-src 'self' data: blob:;media-src 'self' data: blob:;default-src 'self';base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline'",
      "X-DNS-Prefetch-Control",
      "off",
      "Expect-CT",
      "max-age=0",
      "X-Frame-Options",
      "SAMEORIGIN",
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
      "X-Download-Options",
      "noopen",
      "X-Content-Type-Options",
      "nosniff",
      "X-Permitted-Cross-Domain-Policies",
      "none",
      "Referrer-Policy",
      "no-referrer",
      "Vary",
      "Origin",
      "Content-Type",
      "application/json; charset=utf-8",
      "X-Powered-By",
      "Strapi <strapi.io>",
      "Content-Length",
      "228",
      "Date",
      "Tue, 14 Dec 2021 13:21:10 GMT",
      "Connection",
      "close",
    ],
  );

// updateMany
nock("http://localhost:1337", { encodedQueryParams: true })
  .put("/api/posts/8", { data: { title: "Updated titles" } })
  .reply(
    200,
    {
      data: {
        id: 8,
        attributes: {
          title: "Updated titles",
          content: "New post content",
          createdAt: "2021-12-10T13:10:58.478Z",
          updatedAt: "2021-12-14T13:28:07.188Z",
          publishedAt: "2021-12-10T13:10:58.328Z",
          locale: "en",
        },
      },
      meta: {},
    },
    [
      "Content-Security-Policy",
      "connect-src 'self' https:;img-src 'self' data: blob:;media-src 'self' data: blob:;default-src 'self';base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline'",
      "X-DNS-Prefetch-Control",
      "off",
      "Expect-CT",
      "max-age=0",
      "X-Frame-Options",
      "SAMEORIGIN",
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
      "X-Download-Options",
      "noopen",
      "X-Content-Type-Options",
      "nosniff",
      "X-Permitted-Cross-Domain-Policies",
      "none",
      "Referrer-Policy",
      "no-referrer",
      "Vary",
      "Origin",
      "Content-Type",
      "application/json; charset=utf-8",
      "X-Powered-By",
      "Strapi <strapi.io>",
      "Content-Length",
      "229",
      "Date",
      "Tue, 14 Dec 2021 13:28:07 GMT",
      "Connection",
      "close",
    ],
  );

nock("http://localhost:1337", { encodedQueryParams: true })
  .put("/api/posts/17", { data: { title: "Updated titles" } })
  .reply(
    200,
    {
      data: {
        id: 17,
        attributes: {
          title: "Updated titles",
          content: "bar",
          createdAt: "2021-12-14T11:42:37.945Z",
          updatedAt: "2021-12-14T13:27:30.270Z",
          publishedAt: "2021-12-14T11:42:37.914Z",
          locale: "en",
        },
      },
      meta: {},
    },
    [
      "Content-Security-Policy",
      "connect-src 'self' https:;img-src 'self' data: blob:;media-src 'self' data: blob:;default-src 'self';base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline'",
      "X-DNS-Prefetch-Control",
      "off",
      "Expect-CT",
      "max-age=0",
      "X-Frame-Options",
      "SAMEORIGIN",
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
      "X-Download-Options",
      "noopen",
      "X-Content-Type-Options",
      "nosniff",
      "X-Permitted-Cross-Domain-Policies",
      "none",
      "Referrer-Policy",
      "no-referrer",
      "Vary",
      "Origin",
      "Content-Type",
      "application/json; charset=utf-8",
      "X-Powered-By",
      "Strapi <strapi.io>",
      "Content-Length",
      "217",
      "Date",
      "Tue, 14 Dec 2021 13:27:30 GMT",
      "Connection",
      "close",
    ],
  );

// createMany

nock("http://localhost:1337", { encodedQueryParams: true })
  .post("/api/posts", {
    data: { title: "New Post One", content: "New Content One" },
  })
  .reply(
    200,
    {
      data: {
        id: 29,
        attributes: {
          title: "New Post One",
          content: "New Content One",
          createdAt: "2021-12-14T13:35:03.957Z",
          updatedAt: "2021-12-14T13:35:03.957Z",
          publishedAt: "2021-12-14T13:35:03.945Z",
          locale: "en",
        },
      },
      meta: {},
    },
    [
      "Content-Security-Policy",
      "connect-src 'self' https:;img-src 'self' data: blob:;media-src 'self' data: blob:;default-src 'self';base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline'",
      "X-DNS-Prefetch-Control",
      "off",
      "Expect-CT",
      "max-age=0",
      "X-Frame-Options",
      "SAMEORIGIN",
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
      "X-Download-Options",
      "noopen",
      "X-Content-Type-Options",
      "nosniff",
      "X-Permitted-Cross-Domain-Policies",
      "none",
      "Referrer-Policy",
      "no-referrer",
      "Vary",
      "Origin",
      "Content-Type",
      "application/json; charset=utf-8",
      "X-Powered-By",
      "Strapi <strapi.io>",
      "Content-Length",
      "227",
      "Date",
      "Tue, 14 Dec 2021 13:35:03 GMT",
      "Connection",
      "close",
    ],
  );

nock("http://localhost:1337", { encodedQueryParams: true })
  .post("/api/posts", {
    data: { title: "New Post Two", content: "New Content Two" },
  })
  .reply(
    200,
    {
      data: {
        id: 30,
        attributes: {
          title: "New Post Two",
          content: "New Content Two",
          createdAt: "2021-12-14T13:35:16.771Z",
          updatedAt: "2021-12-14T13:35:16.771Z",
          publishedAt: "2021-12-14T13:35:16.693Z",
          locale: "en",
        },
      },
      meta: {},
    },
    [
      "Content-Security-Policy",
      "connect-src 'self' https:;img-src 'self' data: blob:;media-src 'self' data: blob:;default-src 'self';base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline'",
      "X-DNS-Prefetch-Control",
      "off",
      "Expect-CT",
      "max-age=0",
      "X-Frame-Options",
      "SAMEORIGIN",
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
      "X-Download-Options",
      "noopen",
      "X-Content-Type-Options",
      "nosniff",
      "X-Permitted-Cross-Domain-Policies",
      "none",
      "Referrer-Policy",
      "no-referrer",
      "Vary",
      "Origin",
      "Content-Type",
      "application/json; charset=utf-8",
      "X-Powered-By",
      "Strapi <strapi.io>",
      "Content-Length",
      "227",
      "Date",
      "Tue, 14 Dec 2021 13:35:16 GMT",
      "Connection",
      "close",
    ],
  );

// custom
nock("http://localhost:1337", { encodedQueryParams: true })
  .get("/api/posts")
  .query({})
  .reply(
    200,
    {
      data: [
        {
          id: 5,
          attributes: {
            title: "Lorem ipsum began as scrambled",
            content:
              "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:\n\n\n_**“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.”**_\n\n\nThe purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesn't distract from the layout. A practice not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on design, not content.\n\nThe passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their software. Today it's seen all around the web; on templates, websites, and stock designs. Use our generator to get your own, or read on for the authoritative history of lorem ipsum.",
            createdAt: "2021-12-09T08:53:47.226Z",
            updatedAt: "2021-12-13T11:51:43.224Z",
            publishedAt: "2021-12-09T13:45:40.088Z",
            locale: "en",
          },
        },
        {
          id: 3,
          attributes: {
            title: "Cras iaculis ultricies nulla",
            content:
              "**Morbi in sem quis dui placerat ornare**. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat.\n\nPraesent dapibus, neque id cursus faucibus, tortor neque egestas auguae, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.",
            createdAt: "2021-12-08T14:36:57.102Z",
            updatedAt: "2021-12-08T14:37:47.584Z",
            publishedAt: "2021-12-08T14:37:02.174Z",
            locale: "en",
          },
        },
        {
          id: 34,
          attributes: {
            title: "New Post One",
            content: "New Content One",
            createdAt: "2021-12-14T13:35:32.659Z",
            updatedAt: "2021-12-14T13:35:32.659Z",
            publishedAt: "2021-12-14T13:35:32.644Z",
            locale: "en",
          },
        },
        {
          id: 35,
          attributes: {
            title: "New Post Two",
            content: "New Content Two",
            createdAt: "2021-12-14T13:35:32.666Z",
            updatedAt: "2021-12-14T13:35:32.666Z",
            publishedAt: "2021-12-14T13:35:32.650Z",
            locale: "en",
          },
        },
        {
          id: 19,
          attributes: {
            title: "foo",
            content: "bar",
            createdAt: "2021-12-14T11:45:30.710Z",
            updatedAt: "2021-12-14T11:45:30.710Z",
            publishedAt: "2021-12-14T11:45:30.700Z",
            locale: "en",
          },
        },
        {
          id: 21,
          attributes: {
            title: "foo",
            content: "bar",
            createdAt: "2021-12-14T11:47:01.493Z",
            updatedAt: "2021-12-14T11:47:01.493Z",
            publishedAt: "2021-12-14T11:47:01.482Z",
            locale: "en",
          },
        },
        {
          id: 36,
          attributes: {
            title: "New Post One",
            content: "New Content One",
            createdAt: "2021-12-14T13:35:35.091Z",
            updatedAt: "2021-12-14T13:35:35.091Z",
            publishedAt: "2021-12-14T13:35:35.080Z",
            locale: "en",
          },
        },
        {
          id: 37,
          attributes: {
            title: "New Post Two",
            content: "New Content Two",
            createdAt: "2021-12-14T13:35:35.095Z",
            updatedAt: "2021-12-14T13:35:35.095Z",
            publishedAt: "2021-12-14T13:35:35.082Z",
            locale: "en",
          },
        },
        {
          id: 17,
          attributes: {
            title: "Updated titles",
            content: "bar",
            createdAt: "2021-12-14T11:42:37.945Z",
            updatedAt: "2021-12-14T13:28:23.705Z",
            publishedAt: "2021-12-14T11:42:37.914Z",
            locale: "en",
          },
        },
        {
          id: 8,
          attributes: {
            title: "Updated titles",
            content: "New post content",
            createdAt: "2021-12-10T13:10:58.478Z",
            updatedAt: "2021-12-14T13:28:23.706Z",
            publishedAt: "2021-12-10T13:10:58.328Z",
            locale: "en",
          },
        },
        {
          id: 22,
          attributes: {
            title: "New Post Two",
            content: "New Content Two",
            createdAt: "2021-12-14T13:34:51.436Z",
            updatedAt: "2021-12-14T13:34:51.436Z",
            publishedAt: "2021-12-14T13:34:51.428Z",
            locale: "en",
          },
        },
        {
          id: 23,
          attributes: {
            title: "New Post One",
            content: "New Content One",
            createdAt: "2021-12-14T13:34:51.444Z",
            updatedAt: "2021-12-14T13:34:51.444Z",
            publishedAt: "2021-12-14T13:34:51.430Z",
            locale: "en",
          },
        },
        {
          id: 24,
          attributes: {
            title: "New Post Two",
            content: "New Content Two",
            createdAt: "2021-12-14T13:34:56.024Z",
            updatedAt: "2021-12-14T13:34:56.024Z",
            publishedAt: "2021-12-14T13:34:56.003Z",
            locale: "en",
          },
        },
        {
          id: 25,
          attributes: {
            title: "New Post One",
            content: "New Content One",
            createdAt: "2021-12-14T13:34:56.026Z",
            updatedAt: "2021-12-14T13:34:56.026Z",
            publishedAt: "2021-12-14T13:34:56.013Z",
            locale: "en",
          },
        },
        {
          id: 26,
          attributes: {
            title: "New Post Two",
            content: "New Content Two",
            createdAt: "2021-12-14T13:35:01.373Z",
            updatedAt: "2021-12-14T13:35:01.373Z",
            publishedAt: "2021-12-14T13:35:01.330Z",
            locale: "en",
          },
        },
        {
          id: 27,
          attributes: {
            title: "New Post One",
            content: "New Content One",
            createdAt: "2021-12-14T13:35:01.382Z",
            updatedAt: "2021-12-14T13:35:01.382Z",
            publishedAt: "2021-12-14T13:35:01.332Z",
            locale: "en",
          },
        },
        {
          id: 28,
          attributes: {
            title: "New Post One",
            content: "New Content One",
            createdAt: "2021-12-14T13:35:03.957Z",
            updatedAt: "2021-12-14T13:35:03.957Z",
            publishedAt: "2021-12-14T13:35:03.945Z",
            locale: "en",
          },
        },
        {
          id: 29,
          attributes: {
            title: "New Post Two",
            content: "New Content Two",
            createdAt: "2021-12-14T13:35:03.963Z",
            updatedAt: "2021-12-14T13:35:03.963Z",
            publishedAt: "2021-12-14T13:35:03.941Z",
            locale: "en",
          },
        },
        {
          id: 30,
          attributes: {
            title: "New Post Two",
            content: "New Content Two",
            createdAt: "2021-12-14T13:35:16.771Z",
            updatedAt: "2021-12-14T13:35:16.771Z",
            publishedAt: "2021-12-14T13:35:16.693Z",
            locale: "en",
          },
        },
        {
          id: 31,
          attributes: {
            title: "New Post One",
            content: "New Content One",
            createdAt: "2021-12-14T13:35:16.800Z",
            updatedAt: "2021-12-14T13:35:16.800Z",
            publishedAt: "2021-12-14T13:35:16.697Z",
            locale: "en",
          },
        },
        {
          id: 32,
          attributes: {
            title: "New Post One",
            content: "New Content One",
            createdAt: "2021-12-14T13:35:25.884Z",
            updatedAt: "2021-12-14T13:35:25.884Z",
            publishedAt: "2021-12-14T13:35:25.875Z",
            locale: "en",
          },
        },
        {
          id: 33,
          attributes: {
            title: "New Post Two",
            content: "New Content Two",
            createdAt: "2021-12-14T13:35:25.886Z",
            updatedAt: "2021-12-14T13:35:25.886Z",
            publishedAt: "2021-12-14T13:35:25.880Z",
            locale: "en",
          },
        },
      ],
      meta: {
        pagination: { page: 1, pageSize: 25, pageCount: 1, total: 22 },
      },
    },
    [
      "Content-Security-Policy",
      "connect-src 'self' https:;img-src 'self' data: blob:;media-src 'self' data: blob:;default-src 'self';base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline'",
      "X-DNS-Prefetch-Control",
      "off",
      "Expect-CT",
      "max-age=0",
      "X-Frame-Options",
      "SAMEORIGIN",
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
      "X-Download-Options",
      "noopen",
      "X-Content-Type-Options",
      "nosniff",
      "X-Permitted-Cross-Domain-Policies",
      "none",
      "Referrer-Policy",
      "no-referrer",
      "Vary",
      "Origin",
      "Content-Type",
      "application/json; charset=utf-8",
      "X-Powered-By",
      "Strapi <strapi.io>",
      "Content-Length",
      "6114",
      "Date",
      "Tue, 14 Dec 2021 13:39:21 GMT",
      "Connection",
      "close",
    ],
  );

nock("http://localhost:1337", { encodedQueryParams: true })
  .get("/api/posts")
  .query({ "filters%5Btitle%5D%5B%24eq%5D": "foo" })
  .reply(
    200,
    {
      data: [
        {
          id: 19,
          attributes: {
            title: "foo",
            content: "bar",
            createdAt: "2021-12-14T11:45:30.710Z",
            updatedAt: "2021-12-14T11:45:30.710Z",
            publishedAt: "2021-12-14T11:45:30.700Z",
            locale: "en",
          },
        },
        {
          id: 21,
          attributes: {
            title: "foo",
            content: "bar",
            createdAt: "2021-12-14T11:47:01.493Z",
            updatedAt: "2021-12-14T11:47:01.493Z",
            publishedAt: "2021-12-14T11:47:01.482Z",
            locale: "en",
          },
        },
      ],
      meta: {
        pagination: { page: 1, pageSize: 25, pageCount: 1, total: 2 },
      },
    },
    [
      "Content-Security-Policy",
      "connect-src 'self' https:;img-src 'self' data: blob:;media-src 'self' data: blob:;default-src 'self';base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline'",
      "X-DNS-Prefetch-Control",
      "off",
      "Expect-CT",
      "max-age=0",
      "X-Frame-Options",
      "SAMEORIGIN",
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
      "X-Download-Options",
      "noopen",
      "X-Content-Type-Options",
      "nosniff",
      "X-Permitted-Cross-Domain-Policies",
      "none",
      "Referrer-Policy",
      "no-referrer",
      "Vary",
      "Origin",
      "Content-Type",
      "application/json; charset=utf-8",
      "X-Powered-By",
      "Strapi <strapi.io>",
      "Content-Length",
      "457",
      "Date",
      "Tue, 14 Dec 2021 13:46:41 GMT",
      "Connection",
      "close",
    ],
  );

nock("http://localhost:1337", { encodedQueryParams: true })
  .get("/api/posts")
  .query({ sort: "id%3Adesc" })
  .reply(
    200,
    {
      data: [
        {
          id: 37,
          attributes: {
            title: "New Post Two",
            content: "New Content Two",
            createdAt: "2021-12-14T13:35:35.095Z",
            updatedAt: "2021-12-15T08:07:42.272Z",
            publishedAt: "2021-12-14T13:35:35.082Z",
            locale: "en",
          },
        },
        {
          id: 5,
          attributes: {
            title: "Lorem ipsum began as scrambled",
            content:
              "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:\n\n\n_**“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.”**_\n\n\nThe purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesn't distract from the layout. A practice not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on design, not content.\n\nThe passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their software. Today it's seen all around the web; on templates, websites, and stock designs. Use our generator to get your own, or read on for the authoritative history of lorem ipsum.",
            createdAt: "2021-12-09T08:53:47.226Z",
            updatedAt: "2021-12-13T11:51:43.224Z",
            publishedAt: "2021-12-09T13:45:40.088Z",
            locale: "en",
          },
        },
        {
          id: 3,
          attributes: {
            title: "Cras iaculis ultricies nulla",
            content:
              "**Morbi in sem quis dui placerat ornare**. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat.\n\nPraesent dapibus, neque id cursus faucibus, tortor neque egestas auguae, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.",
            createdAt: "2021-12-08T14:36:57.102Z",
            updatedAt: "2021-12-08T14:37:47.584Z",
            publishedAt: "2021-12-08T14:37:02.174Z",
            locale: "en",
          },
        },
      ],
      meta: {
        pagination: { page: 1, pageSize: 25, pageCount: 1, total: 3 },
      },
    },
    [
      "Content-Security-Policy",
      "connect-src 'self' https:;img-src 'self' data: blob:;media-src 'self' data: blob:;default-src 'self';base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline'",
      "X-DNS-Prefetch-Control",
      "off",
      "Expect-CT",
      "max-age=0",
      "X-Frame-Options",
      "SAMEORIGIN",
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
      "X-Download-Options",
      "noopen",
      "X-Content-Type-Options",
      "nosniff",
      "X-Permitted-Cross-Domain-Policies",
      "none",
      "Referrer-Policy",
      "no-referrer",
      "Vary",
      "Origin",
      "Content-Type",
      "application/json; charset=utf-8",
      "X-Powered-By",
      "Strapi <strapi.io>",
      "Content-Length",
      "2192",
      "Date",
      "Wed, 15 Dec 2021 08:26:18 GMT",
      "Connection",
      "close",
    ],
  );

nock("http://localhost:1337", { encodedQueryParams: true })
  .post("/api/posts", { data: { title: "test", content: "test" } })
  .reply(
    200,
    {
      data: {
        id: 39,
        attributes: {
          title: "test",
          content: "test",
          createdAt: "2021-12-15T08:28:20.103Z",
          updatedAt: "2021-12-15T08:28:20.103Z",
          publishedAt: "2021-12-15T08:28:20.085Z",
          locale: "en",
        },
      },
      meta: {},
    },
    [
      "Content-Security-Policy",
      "connect-src 'self' https:;img-src 'self' data: blob:;media-src 'self' data: blob:;default-src 'self';base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline'",
      "X-DNS-Prefetch-Control",
      "off",
      "Expect-CT",
      "max-age=0",
      "X-Frame-Options",
      "SAMEORIGIN",
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
      "X-Download-Options",
      "noopen",
      "X-Content-Type-Options",
      "nosniff",
      "X-Permitted-Cross-Domain-Policies",
      "none",
      "Referrer-Policy",
      "no-referrer",
      "Vary",
      "Origin",
      "Content-Type",
      "application/json; charset=utf-8",
      "X-Powered-By",
      "Strapi <strapi.io>",
      "Content-Length",
      "208",
      "Date",
      "Wed, 15 Dec 2021 08:28:20 GMT",
      "Connection",
      "close",
    ],
  );
