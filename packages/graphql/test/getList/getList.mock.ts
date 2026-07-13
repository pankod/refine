import nock from "nock";

console.log;

nock("https://api.nestjs-query.refine.dev:443", { encodedQueryParams: true })
  .post("/graphql", {
    operationName: "BlogPosts",
    query:
      "\n  query BlogPosts($paging: OffsetPaging!, $filter: BlogPostFilter!, $sorting: [BlogPostSort!]!) {\n    blogPosts(paging: $paging, filter: $filter, sorting: $sorting) {\n      nodes {\n        id\n        title\n        status\n      }\n      totalCount\n    }\n  }\n",
    variables: { filter: {}, paging: { limit: 10, offset: 0 }, sorting: [] },
  })
  .reply(
    200,
    {
      data: {
        blogPosts: {
          nodes: [
            {
              id: "3",
              title:
                "Laudantium ut atque quia quibusdam accusantium dolore architecto.",
              status: "DRAFT",
            },
            {
              id: "4",
              title:
                "Vero dolores quis reprehenderit eveniet libero ut reiciendis aspernatur.",
              status: "REJECTED",
            },
            { id: "5", title: "Nobis inventore ipsum.", status: "REJECTED" },
            {
              id: "6",
              title: "Adipisci voluptatem voluptatibus maiores illum.",
              status: "REJECTED",
            },
            {
              id: "7",
              title: "Suscipit omnis dignissimos.",
              status: "PUBLISHED",
            },
            {
              id: "8",
              title: "Non iure error magni rerum voluptatum repellat.",
              status: "PUBLISHED",
            },
            {
              id: "9",
              title: "Ipsa ipsam veritatis nobis temporibus eligendi deserunt.",
              status: "PUBLISHED",
            },
            { id: "10", title: "Animi veritatis sint.", status: "REJECTED" },
            { id: "11", title: "Est aspernatur assumenda.", status: "DRAFT" },
            { id: "13", title: "Commodi nostrum fugiat.", status: "DRAFT" },
          ],
          totalCount: 503,
        },
      },
    },
    {
      "access-control-allow-origin": "*",
      "cache-control": "no-store",
      connection: "keep-alive",
      "content-length": "874",
      "content-type": "application/graphql-response+json; charset=utf-8",
      date: "Tue, 03 Dec 2024 13:31:06 GMT",
      etag: 'W/"36a-lYljvtdjSjKrDMHiKT6WNjsEeFs"',
      "strict-transport-security": "max-age=15724800; includeSubDomains",
      "x-powered-by": "Express",
    },
  );

nock("https://api.nestjs-query.refine.dev:443", { encodedQueryParams: true })
  .post("/graphql", {
    operationName: "BlogPosts",
    query:
      "\n  query BlogPosts($paging: OffsetPaging!, $filter: BlogPostFilter!, $sorting: [BlogPostSort!]!) {\n    blogPosts(paging: $paging, filter: $filter, sorting: $sorting) {\n      nodes {\n        id\n        title\n        status\n      }\n      totalCount\n    }\n  }\n",
    variables: { filter: {}, paging: { limit: 10, offset: 10 }, sorting: [] },
  })
  .reply(
    200,
    {
      data: {
        blogPosts: {
          nodes: [
            { id: "14", title: "Neque sit iure.", status: "DRAFT" },
            {
              id: "15",
              title: "Enim repellendus ab amet ipsum perferendis.",
              status: "DRAFT",
            },
            { id: "12", title: "OK", status: "DRAFT" },
            {
              id: "2",
              title: "1st Delectus consequatur temporibus magnam voluptatibus.",
              status: "PUBLISHED",
            },
            {
              id: "16",
              title: "Eaque id distinctio iste placeat doloribus commodi.",
              status: "PUBLISHED",
            },
            {
              id: "17",
              title: "Suscipit libero dolore saepe ab numquam esse blanditiis.",
              status: "PUBLISHED",
            },
            {
              id: "18",
              title:
                "Ratione molestias velit nobis sequi quisquam nemo nobis iure ipsam.",
              status: "PUBLISHED",
            },
            {
              id: "19",
              title:
                "Fugit ab odio cupiditate debitis velit similique voluptatem quisquam.",
              status: "PUBLISHED",
            },
            { id: "20", title: "Incidunt sequi repellendus.", status: "DRAFT" },
            {
              id: "21",
              title: "Beatae quas enim voluptatem.",
              status: "PUBLISHED",
            },
          ],
          totalCount: 503,
        },
      },
    },
    {
      "access-control-allow-origin": "*",
      "cache-control": "no-store",
      connection: "keep-alive",
      "content-length": "889",
      "content-type": "application/graphql-response+json; charset=utf-8",
      date: "Tue, 03 Dec 2024 13:31:06 GMT",
      etag: 'W/"379-VyNRCFHFm5wHkFQfMy3QAXvoS+Q"',
      "strict-transport-security": "max-age=15724800; includeSubDomains",
      "x-powered-by": "Express",
    },
  );

nock("https://api.nestjs-query.refine.dev:443", { encodedQueryParams: true })
  .post("/graphql", {
    operationName: "BlogPosts",
    query:
      "\n  query BlogPosts($paging: OffsetPaging!, $filter: BlogPostFilter!, $sorting: [BlogPostSort!]!) {\n    blogPosts(paging: $paging, filter: $filter, sorting: $sorting) {\n      nodes {\n        id\n        title\n        status\n      }\n      totalCount\n    }\n  }\n",
    variables: { filter: {}, paging: { limit: 2, offset: 0 }, sorting: [] },
  })
  .reply(
    200,
    {
      data: {
        blogPosts: {
          nodes: [
            {
              id: "3",
              title:
                "Laudantium ut atque quia quibusdam accusantium dolore architecto.",
              status: "DRAFT",
            },
            {
              id: "4",
              title:
                "Vero dolores quis reprehenderit eveniet libero ut reiciendis aspernatur.",
              status: "REJECTED",
            },
          ],
          totalCount: 503,
        },
      },
    },
    {
      "access-control-allow-origin": "*",
      "cache-control": "no-store",
      connection: "keep-alive",
      "content-length": "270",
      "content-type": "application/graphql-response+json; charset=utf-8",
      date: "Tue, 03 Dec 2024 13:31:06 GMT",
      etag: 'W/"10e-wEBIcgwmUPxmLWjOoIHQ56tyxTk"',
      "strict-transport-security": "max-age=15724800; includeSubDomains",
      "x-powered-by": "Express",
    },
  );

nock("https://api.nestjs-query.refine.dev:443", { encodedQueryParams: true })
  .post("/graphql", {
    operationName: "BlogPosts",
    query:
      "\n  query BlogPosts($paging: OffsetPaging!, $filter: BlogPostFilter!, $sorting: [BlogPostSort!]!) {\n    blogPosts(paging: $paging, filter: $filter, sorting: $sorting) {\n      nodes {\n        id\n        title\n        status\n      }\n      totalCount\n    }\n  }\n",
    variables: { filter: {}, paging: { limit: 2147483647 }, sorting: [] },
  })
  .reply(
    200,
    {
      data: {
        blogPosts: {
          nodes: [
            {
              id: "3",
              title:
                "Laudantium ut atque quia quibusdam accusantium dolore architecto.",
              status: "DRAFT",
            },
            {
              id: "4",
              title:
                "Vero dolores quis reprehenderit eveniet libero ut reiciendis aspernatur.",
              status: "REJECTED",
            },
            { id: "5", title: "Nobis inventore ipsum.", status: "REJECTED" },
            {
              id: "6",
              title: "Adipisci voluptatem voluptatibus maiores illum.",
              status: "REJECTED",
            },
            {
              id: "7",
              title: "Suscipit omnis dignissimos.",
              status: "PUBLISHED",
            },
            {
              id: "8",
              title: "Non iure error magni rerum voluptatum repellat.",
              status: "PUBLISHED",
            },
            {
              id: "9",
              title: "Ipsa ipsam veritatis nobis temporibus eligendi deserunt.",
              status: "PUBLISHED",
            },
            { id: "10", title: "Animi veritatis sint.", status: "REJECTED" },
            { id: "11", title: "Est aspernatur assumenda.", status: "DRAFT" },
            { id: "13", title: "Commodi nostrum fugiat.", status: "DRAFT" },
            { id: "14", title: "Neque sit iure.", status: "DRAFT" },
            {
              id: "15",
              title: "Enim repellendus ab amet ipsum perferendis.",
              status: "DRAFT",
            },
            { id: "12", title: "OK", status: "DRAFT" },
            {
              id: "2",
              title: "1st Delectus consequatur temporibus magnam voluptatibus.",
              status: "PUBLISHED",
            },
            {
              id: "16",
              title: "Eaque id distinctio iste placeat doloribus commodi.",
              status: "PUBLISHED",
            },
            {
              id: "17",
              title: "Suscipit libero dolore saepe ab numquam esse blanditiis.",
              status: "PUBLISHED",
            },
            {
              id: "18",
              title:
                "Ratione molestias velit nobis sequi quisquam nemo nobis iure ipsam.",
              status: "PUBLISHED",
            },
            {
              id: "19",
              title:
                "Fugit ab odio cupiditate debitis velit similique voluptatem quisquam.",
              status: "PUBLISHED",
            },
            { id: "20", title: "Incidunt sequi repellendus.", status: "DRAFT" },
            {
              id: "21",
              title: "Beatae quas enim voluptatem.",
              status: "PUBLISHED",
            },
            {
              id: "22",
              title: "Minima expedita officia et dolorem possimus repellat.",
              status: "REJECTED",
            },
            {
              id: "23",
              title: "Tenetur ducimus nam odio quia facilis quasi.",
              status: "REJECTED",
            },
            {
              id: "24",
              title:
                "Corrupti ex fugit dolore soluta recusandae aperiam ad neque adipisci.",
              status: "DRAFT",
            },
            {
              id: "25",
              title:
                "Repellat nemo eum eum praesentium omnis quos necessitatibus accusantium ea.",
              status: "REJECTED",
            },
            {
              id: "26",
              title: "Cupiditate quo aspernatur.",
              status: "PUBLISHED",
            },
            { id: "27", title: "Illum quis vel eos quis.", status: "REJECTED" },
            {
              id: "28",
              title: "Aliquam distinctio sit sunt pariatur dolores.",
              status: "REJECTED",
            },
            {
              id: "29",
              title: "Consequatur maiores aspernatur porro.",
              status: "REJECTED",
            },
            {
              id: "30",
              title: "Provident earum velit optio enim delectus rerum.",
              status: "DRAFT",
            },
            {
              id: "31",
              title: "Magnam natus porro modi commodi dolor nesciunt iste.",
              status: "REJECTED",
            },
            {
              id: "32",
              title:
                "Quod cumque doloremque quo sunt totam placeat praesentium.",
              status: "REJECTED",
            },
            {
              id: "33",
              title: "Porro voluptatem non quaerat.",
              status: "DRAFT",
            },
            {
              id: "34",
              title:
                "Beatae repellendus tenetur fugiat tempore quo qui consequatur exercitationem dolorem.",
              status: "DRAFT",
            },
            {
              id: "35",
              title:
                "Modi sunt beatae voluptatibus necessitatibus possimus itaque.",
              status: "DRAFT",
            },
            {
              id: "36",
              title: "Repudiandae illum quaerat quasi voluptates minus.",
              status: "PUBLISHED",
            },
            {
              id: "37",
              title:
                "Illum quos quam non accusamus rem incidunt provident porro.",
              status: "REJECTED",
            },
            {
              id: "38",
              title: "Ea veniam nam distinctio hic.",
              status: "REJECTED",
            },
            { id: "39", title: "Corrupti earum nulla at.", status: "REJECTED" },
            {
              id: "40",
              title: "Pariatur voluptatem a animi magni aliquam aut.",
              status: "PUBLISHED",
            },
            {
              id: "41",
              title: "Itaque eius fuga itaque ducimus totam deleniti cum.",
              status: "PUBLISHED",
            },
            {
              id: "43",
              title: "Alias omnis sint fugit aut.",
              status: "REJECTED",
            },
            {
              id: "44",
              title: "Molestiae dolore magnam ipsa odit dolores.",
              status: "PUBLISHED",
            },
            {
              id: "45",
              title: "Impedit molestiae totam earum provident asperiores.",
              status: "REJECTED",
            },
            { id: "46", title: "Sit ratione minima.", status: "PUBLISHED" },
            {
              id: "47",
              title:
                "Ea quibusdam cupiditate adipisci repellendus deleniti impedit itaque est.",
              status: "REJECTED",
            },
            {
              id: "48",
              title:
                "Reprehenderit consectetur consequuntur exercitationem eaque laudantium error.",
              status: "REJECTED",
            },
            {
              id: "49",
              title:
                "Nemo qui molestias quos ipsum sequi voluptates non ipsa iure.",
              status: "PUBLISHED",
            },
            {
              id: "50",
              title:
                "In cupiditate temporibus maxime quas minus hic illo reiciendis iure.",
              status: "DRAFT",
            },
            {
              id: "51",
              title: "Ea sed nisi ratione magni modi quisquam sit amet minus.",
              status: "PUBLISHED",
            },
            {
              id: "52",
              title: "Maiores amet ducimus beatae temporibus.",
              status: "DRAFT",
            },
            { id: "53", title: "Asperiores quasi quod.", status: "REJECTED" },
            {
              id: "54",
              title: "Ab ipsa facilis laudantium placeat omnis.",
              status: "PUBLISHED",
            },
            {
              id: "55",
              title:
                "Quia laboriosam reprehenderit quasi possimus nemo praesentium assumenda.",
              status: "REJECTED",
            },
            {
              id: "56",
              title: "Accusamus cupiditate vero commodi dolores aut aut.",
              status: "DRAFT",
            },
            {
              id: "57",
              title: "Explicabo commodi tenetur eos eveniet vero esse enim.",
              status: "PUBLISHED",
            },
            {
              id: "58",
              title: "Labore delectus minus fuga aliquam similique.",
              status: "PUBLISHED",
            },
            {
              id: "59",
              title: "Nobis rerum corrupti porro sit.",
              status: "REJECTED",
            },
            { id: "60", title: "Tenetur culpa est esse.", status: "PUBLISHED" },
            {
              id: "61",
              title: "Sed nisi ducimus architecto.",
              status: "DRAFT",
            },
            {
              id: "62",
              title: "Cumque dolore eligendi praesentium numquam.",
              status: "DRAFT",
            },
            {
              id: "63",
              title: "Magnam quaerat dolores modi voluptatibus sapiente.",
              status: "REJECTED",
            },
            {
              id: "64",
              title:
                "Voluptatum unde ea suscipit at explicabo laboriosam hic tempora.",
              status: "DRAFT",
            },
            {
              id: "65",
              title: "Maxime dolor quae consequuntur.",
              status: "DRAFT",
            },
            {
              id: "66",
              title: "Magnam repudiandae provident iure sapiente error iure.",
              status: "DRAFT",
            },
            {
              id: "67",
              title:
                "Incidunt eos molestiae veniam excepturi eaque cupiditate.",
              status: "REJECTED",
            },
            { id: "68", title: "Eum nostrum eaque.", status: "DRAFT" },
            { id: "69", title: "Illo rem sint odio.", status: "PUBLISHED" },
            {
              id: "70",
              title: "Porro vero officiis beatae nulla voluptatum ea.",
              status: "PUBLISHED",
            },
            {
              id: "71",
              title:
                "Doloribus incidunt accusantium fugit corporis dolore neque facere quas.",
              status: "PUBLISHED",
            },
            {
              id: "72",
              title:
                "Reiciendis exercitationem pariatur dicta nam adipisci alias.",
              status: "DRAFT",
            },
            {
              id: "73",
              title: "Voluptas quo assumenda nemo maxime facere.",
              status: "DRAFT",
            },
            {
              id: "74",
              title:
                "Labore fuga deleniti hic odio provident fugit cumque repudiandae.",
              status: "REJECTED",
            },
            {
              id: "75",
              title: "Ipsam necessitatibus facere odit.",
              status: "REJECTED",
            },
            {
              id: "76",
              title:
                "Vel magnam quod assumenda dolor occaecati perspiciatis sunt laudantium.",
              status: "PUBLISHED",
            },
            {
              id: "77",
              title: "Animi neque ipsam esse nemo.",
              status: "PUBLISHED",
            },
            {
              id: "78",
              title:
                "Deleniti repellendus odit cupiditate libero qui omnis harum possimus hic.",
              status: "PUBLISHED",
            },
            {
              id: "79",
              title: "Sunt est voluptates quas quas est.",
              status: "REJECTED",
            },
            {
              id: "80",
              title: "Expedita molestiae hic modi a vel sapiente ut.",
              status: "PUBLISHED",
            },
            {
              id: "81",
              title: "Fugiat ut sed eveniet id facilis.",
              status: "REJECTED",
            },
            { id: "82", title: "Odio sint rerum deserunt.", status: "DRAFT" },
            {
              id: "83",
              title: "Magnam fuga repellat adipisci facilis.",
              status: "REJECTED",
            },
            {
              id: "84",
              title:
                "Saepe dolorem neque amet perferendis illo architecto quidem.",
              status: "DRAFT",
            },
            {
              id: "85",
              title: "A doloribus iusto illo eveniet voluptatem sunt dolores.",
              status: "PUBLISHED",
            },
            {
              id: "86",
              title:
                "Amet voluptatem natus rem mollitia magnam nihil aperiam occaecati.",
              status: "PUBLISHED",
            },
            {
              id: "87",
              title: "Ipsa expedita quae possimus ratione aut.",
              status: "PUBLISHED",
            },
            { id: "88", title: "Hic laborum ipsam.", status: "PUBLISHED" },
            {
              id: "89",
              title: "Eum dicta quisquam omnis asperiores ut mollitia.",
              status: "PUBLISHED",
            },
            {
              id: "90",
              title: "Repellat consequatur nam similique.",
              status: "PUBLISHED",
            },
            {
              id: "91",
              title: "Magnam est mollitia minus accusantium.",
              status: "REJECTED",
            },
            {
              id: "92",
              title:
                "Possimus ab assumenda quaerat inventore eius deleniti sapiente suscipit.",
              status: "DRAFT",
            },
            {
              id: "93",
              title:
                "Fuga aperiam quam aliquam nemo necessitatibus quae consequatur dolorum cumque.",
              status: "REJECTED",
            },
            { id: "94", title: "Magni asperiores eaque.", status: "DRAFT" },
            {
              id: "95",
              title:
                "Vero dolorem totam vitae aut totam blanditiis esse aliquam.",
              status: "REJECTED",
            },
            {
              id: "96",
              title: "Aut nostrum assumenda odit soluta.",
              status: "PUBLISHED",
            },
            {
              id: "97",
              title: "Hic quo quo delectus maxime doloremque provident.",
              status: "PUBLISHED",
            },
            {
              id: "98",
              title: "Dolorem mollitia unde harum expedita architecto.",
              status: "REJECTED",
            },
            {
              id: "99",
              title:
                "Distinctio natus ut voluptas sapiente eos molestiae ratione.",
              status: "REJECTED",
            },
            { id: "100", title: "Explicabo nemo velit.", status: "DRAFT" },
            {
              id: "101",
              title:
                "Libero temporibus doloribus incidunt necessitatibus molestias.",
              status: "PUBLISHED",
            },
            { id: "102", title: "Earum quo ipsum.", status: "DRAFT" },
            {
              id: "103",
              title:
                "Accusamus similique quidem facilis sunt inventore voluptate.",
              status: "PUBLISHED",
            },
            {
              id: "104",
              title: "Consectetur illo ab omnis quae animi libero vel.",
              status: "DRAFT",
            },
            {
              id: "105",
              title:
                "Aperiam nesciunt deserunt dolorum voluptatem officiis recusandae laborum.",
              status: "REJECTED",
            },
            {
              id: "106",
              title: "Perferendis ad id architecto iure adipisci.",
              status: "PUBLISHED",
            },
            {
              id: "107",
              title: "Ex deserunt maxime aliquam.",
              status: "REJECTED",
            },
            {
              id: "108",
              title:
                "Iste fuga suscipit ipsa error iure reiciendis quam similique exercitationem.",
              status: "REJECTED",
            },
            {
              id: "109",
              title: "Optio consectetur aperiam praesentium animi.",
              status: "DRAFT",
            },
            {
              id: "110",
              title: "Odio fuga aperiam quas at occaecati voluptate eius.",
              status: "PUBLISHED",
            },
            {
              id: "111",
              title:
                "Quisquam natus excepturi laboriosam aspernatur necessitatibus cupiditate cupiditate.",
              status: "PUBLISHED",
            },
            {
              id: "112",
              title: "Quasi maxime numquam eos eum iusto unde.",
              status: "REJECTED",
            },
            {
              id: "114",
              title: "Distinctio sunt recusandae rem nisi in corporis.",
              status: "DRAFT",
            },
            {
              id: "115",
              title: "Cupiditate rerum autem veniam veniam.",
              status: "DRAFT",
            },
            {
              id: "116",
              title: "Labore accusamus quo ullam hic.",
              status: "DRAFT",
            },
            {
              id: "117",
              title:
                "Culpa tempora voluptatum nemo perspiciatis possimus consequatur magni commodi officiis.",
              status: "DRAFT",
            },
            {
              id: "118",
              title: "Fugiat sed cum omnis officia.",
              status: "REJECTED",
            },
            {
              id: "119",
              title:
                "Repellat et est nulla ducimus distinctio impedit reprehenderit.",
              status: "REJECTED",
            },
            {
              id: "120",
              title: "Nulla consectetur culpa neque.",
              status: "PUBLISHED",
            },
            {
              id: "121",
              title:
                "Aliquam consequuntur eum sapiente impedit molestiae est corrupti id minus.",
              status: "PUBLISHED",
            },
            {
              id: "122",
              title:
                "Saepe pariatur labore nam aliquam pariatur explicabo ullam qui.",
              status: "DRAFT",
            },
            {
              id: "123",
              title: "Quidem rerum modi error molestiae quasi.",
              status: "REJECTED",
            },
            {
              id: "124",
              title: "Iusto quaerat ratione soluta.",
              status: "DRAFT",
            },
            {
              id: "125",
              title:
                "Nam quia quis impedit harum omnis veniam cupiditate inventore.",
              status: "REJECTED",
            },
            { id: "126", title: "Ab maxime consectetur.", status: "PUBLISHED" },
            {
              id: "127",
              title: "Explicabo sunt tempore illo culpa ea asperiores.",
              status: "DRAFT",
            },
            {
              id: "128",
              title: "Ab quod dignissimos maiores earum.",
              status: "DRAFT",
            },
            { id: "129", title: "Ea ea ipsam molestiae.", status: "REJECTED" },
            {
              id: "130",
              title:
                "Ut officia facilis inventore perferendis explicabo architecto accusamus explicabo illo.",
              status: "DRAFT",
            },
            { id: "131", title: "Quidem laboriosam soluta.", status: "DRAFT" },
            {
              id: "132",
              title:
                "Nobis ab commodi voluptas ducimus dolor consectetur similique temporibus asperiores.",
              status: "REJECTED",
            },
            {
              id: "133",
              title:
                "Sunt aperiam explicabo odit officiis excepturi sint architecto nihil.",
              status: "PUBLISHED",
            },
            {
              id: "134",
              title:
                "Quia optio debitis quaerat error officiis vitae accusamus voluptatem.",
              status: "DRAFT",
            },
            {
              id: "135",
              title: "Possimus ullam minima consectetur.",
              status: "PUBLISHED",
            },
            {
              id: "136",
              title: "Quam recusandae sit maxime.",
              status: "PUBLISHED",
            },
            {
              id: "137",
              title: "Nisi quidem in iure minima iure voluptas.",
              status: "PUBLISHED",
            },
            {
              id: "138",
              title:
                "Dolorum omnis sequi repellat minima consectetur assumenda.",
              status: "PUBLISHED",
            },
            {
              id: "139",
              title: "Eos quas odio nulla quia praesentium.",
              status: "DRAFT",
            },
            {
              id: "140",
              title: "Dignissimos culpa tenetur.",
              status: "PUBLISHED",
            },
            {
              id: "141",
              title: "Voluptate natus quas alias rem perferendis.",
              status: "PUBLISHED",
            },
            {
              id: "142",
              title:
                "Ducimus asperiores quaerat hic eius voluptates veniam velit.",
              status: "REJECTED",
            },
            {
              id: "143",
              title: "Corrupti adipisci sint ad praesentium fugiat.",
              status: "REJECTED",
            },
            {
              id: "144",
              title: "Iusto nam aspernatur quisquam optio.",
              status: "DRAFT",
            },
            { id: "145", title: "Quis a ut quae.", status: "PUBLISHED" },
            {
              id: "146",
              title: "Qui eius iste sint eius.",
              status: "REJECTED",
            },
            {
              id: "147",
              title:
                "Rerum blanditiis esse voluptas qui recusandae impedit placeat.",
              status: "DRAFT",
            },
            {
              id: "148",
              title: "Dignissimos quibusdam cum atque.",
              status: "PUBLISHED",
            },
            {
              id: "149",
              title:
                "Asperiores eos optio omnis consequuntur fugiat harum eligendi quidem eos.",
              status: "REJECTED",
            },
            {
              id: "150",
              title:
                "Suscipit consequuntur blanditiis quasi aut adipisci nulla odit debitis delectus.",
              status: "DRAFT",
            },
            {
              id: "151",
              title: "Aut non possimus ratione aperiam illum amet expedita.",
              status: "PUBLISHED",
            },
            {
              id: "152",
              title:
                "Suscipit deleniti occaecati in itaque magnam minima possimus.",
              status: "DRAFT",
            },
            { id: "153", title: "Odio voluptas eius.", status: "DRAFT" },
            {
              id: "154",
              title:
                "Laborum aut dignissimos ullam quasi sint rem magnam praesentium.",
              status: "REJECTED",
            },
            {
              id: "155",
              title: "Quisquam fuga beatae quo.",
              status: "REJECTED",
            },
            {
              id: "156",
              title:
                "Rerum voluptatibus magni quae quisquam veniam eveniet esse expedita.",
              status: "DRAFT",
            },
            {
              id: "157",
              title: "Suscipit eos veritatis repudiandae itaque eum.",
              status: "DRAFT",
            },
            {
              id: "158",
              title:
                "Quidem eligendi nesciunt voluptate aperiam deleniti natus nihil.",
              status: "PUBLISHED",
            },
            {
              id: "159",
              title: "Praesentium ab voluptatum debitis.",
              status: "DRAFT",
            },
            {
              id: "160",
              title: "Harum minus cumque harum excepturi.",
              status: "REJECTED",
            },
            {
              id: "161",
              title: "Quam odit quibusdam ad nihil quod eum eum deleniti.",
              status: "DRAFT",
            },
            {
              id: "162",
              title:
                "Quos soluta nisi dolor laudantium tempora occaecati dignissimos provident.",
              status: "PUBLISHED",
            },
            {
              id: "163",
              title:
                "Rem explicabo accusantium adipisci veritatis cum odit ea tenetur.",
              status: "DRAFT",
            },
            {
              id: "164",
              title:
                "Expedita natus porro sapiente nihil cupiditate quo doloremque expedita nemo.",
              status: "PUBLISHED",
            },
            {
              id: "165",
              title: "Quasi corrupti quis ipsam eveniet assumenda amet.",
              status: "REJECTED",
            },
            {
              id: "166",
              title:
                "Voluptates similique totam deleniti voluptatibus quas aliquam sit dolores unde.",
              status: "PUBLISHED",
            },
            {
              id: "167",
              title: "Rerum a corporis est placeat vitae nostrum.",
              status: "DRAFT",
            },
            {
              id: "168",
              title:
                "Unde cupiditate reiciendis rerum molestiae sunt corporis vitae perferendis.",
              status: "REJECTED",
            },
            {
              id: "169",
              title:
                "Blanditiis temporibus voluptatibus illum quaerat excepturi accusamus.",
              status: "DRAFT",
            },
            {
              id: "170",
              title: "Fugit asperiores sequi voluptate omnis.",
              status: "PUBLISHED",
            },
            {
              id: "171",
              title: "Sint saepe est totam blanditiis nostrum eaque magni.",
              status: "DRAFT",
            },
            {
              id: "172",
              title:
                "Recusandae assumenda magnam illo nobis quidem cupiditate iure omnis nulla.",
              status: "PUBLISHED",
            },
            {
              id: "173",
              title: "Explicabo magni suscipit pariatur vel doloremque.",
              status: "DRAFT",
            },
            {
              id: "174",
              title: "Nostrum quas quaerat accusantium.",
              status: "DRAFT",
            },
            {
              id: "175",
              title: "Blanditiis iure eligendi id natus vero deserunt porro.",
              status: "PUBLISHED",
            },
            {
              id: "176",
              title:
                "Ipsa laudantium ratione quo sint eius a recusandae minus maxime.",
              status: "DRAFT",
            },
            {
              id: "177",
              title: "Aliquid minus accusantium labore.",
              status: "PUBLISHED",
            },
            {
              id: "178",
              title: "Nostrum ducimus at et repudiandae veniam magnam modi.",
              status: "PUBLISHED",
            },
            { id: "179", title: "Sapiente ab tenetur.", status: "DRAFT" },
            {
              id: "180",
              title: "Dolor odio possimus repudiandae.",
              status: "PUBLISHED",
            },
            {
              id: "181",
              title:
                "Molestias beatae hic magni placeat sit esse exercitationem nobis magnam.",
              status: "DRAFT",
            },
            {
              id: "182",
              title: "Repellendus porro velit.",
              status: "PUBLISHED",
            },
            {
              id: "183",
              title:
                "Perferendis et quasi deleniti ab voluptate corporis necessitatibus.",
              status: "PUBLISHED",
            },
            { id: "184", title: "Ratione in nihil.", status: "PUBLISHED" },
            {
              id: "185",
              title: "Hic dolorem mollitia cum veritatis laborum eaque amet.",
              status: "PUBLISHED",
            },
            {
              id: "186",
              title:
                "Rerum impedit in laborum adipisci quisquam consectetur illo.",
              status: "PUBLISHED",
            },
            {
              id: "187",
              title:
                "Reiciendis animi velit voluptatem libero est impedit quod culpa aspernatur.",
              status: "REJECTED",
            },
            {
              id: "188",
              title:
                "Adipisci cumque necessitatibus occaecati facere non exercitationem.",
              status: "REJECTED",
            },
            {
              id: "189",
              title: "Minima occaecati voluptas incidunt nemo.",
              status: "DRAFT",
            },
            {
              id: "190",
              title:
                "Temporibus quia consectetur laboriosam aut quasi praesentium non ipsa doloribus.",
              status: "PUBLISHED",
            },
            {
              id: "191",
              title:
                "Sequi saepe blanditiis placeat animi repellat nemo cupiditate harum.",
              status: "PUBLISHED",
            },
            { id: "192", title: "Labore nam quo optio.", status: "DRAFT" },
            {
              id: "193",
              title: "Eos inventore delectus dolore expedita.",
              status: "DRAFT",
            },
            {
              id: "194",
              title: "Dolor nemo in quos laboriosam molestias incidunt.",
              status: "DRAFT",
            },
            {
              id: "195",
              title: "Distinctio commodi eos voluptas facilis autem.",
              status: "DRAFT",
            },
            {
              id: "196",
              title: "Quo dolores cumque quaerat quae debitis.",
              status: "REJECTED",
            },
            {
              id: "197",
              title:
                "Voluptates hic quis provident culpa sapiente soluta corrupti.",
              status: "PUBLISHED",
            },
            {
              id: "198",
              title: "Assumenda quibusdam in quasi aliquid.",
              status: "REJECTED",
            },
            {
              id: "199",
              title: "Veniam numquam ipsa enim unde quo sed.",
              status: "DRAFT",
            },
            {
              id: "200",
              title: "Distinctio ipsa alias excepturi a.",
              status: "REJECTED",
            },
            {
              id: "201",
              title:
                "Numquam pariatur voluptatum eius corporis dolorem eveniet necessitatibus recusandae.",
              status: "PUBLISHED",
            },
            {
              id: "202",
              title: "Quidem necessitatibus ducimus labore veritatis.",
              status: "PUBLISHED",
            },
            {
              id: "203",
              title: "Odit odit quibusdam molestiae qui delectus odio.",
              status: "REJECTED",
            },
            {
              id: "204",
              title: "Rem aperiam tempore quod et.",
              status: "REJECTED",
            },
            {
              id: "205",
              title: "Exercitationem expedita odit.",
              status: "REJECTED",
            },
            {
              id: "206",
              title:
                "Repellat fugit dolorem impedit quasi incidunt porro numquam architecto.",
              status: "PUBLISHED",
            },
            {
              id: "207",
              title:
                "Nisi quos necessitatibus officia dolore repellat pariatur.",
              status: "PUBLISHED",
            },
            {
              id: "208",
              title: "Minima quidem repellat placeat quos fuga dolore.",
              status: "PUBLISHED",
            },
            {
              id: "209",
              title: "Possimus minima dicta sit expedita tenetur praesentium.",
              status: "PUBLISHED",
            },
            {
              id: "210",
              title: "Ipsa odio eveniet nulla perferendis.",
              status: "PUBLISHED",
            },
            {
              id: "211",
              title: "Omnis eveniet animi amet earum.",
              status: "DRAFT",
            },
            {
              id: "212",
              title: "Maxime maxime sint soluta odio.",
              status: "REJECTED",
            },
            { id: "213", title: "Dolorum unde eligendi.", status: "DRAFT" },
            {
              id: "214",
              title:
                "Molestias magni temporibus laborum inventore ex sed reprehenderit est accusantium.",
              status: "PUBLISHED",
            },
            {
              id: "215",
              title:
                "Cum tempore perferendis dolore officiis temporibus voluptate excepturi sint.",
              status: "DRAFT",
            },
            {
              id: "216",
              title: "Consequatur rerum aspernatur repellendus mollitia eum.",
              status: "PUBLISHED",
            },
            {
              id: "217",
              title:
                "Repellendus repellendus laborum atque quas quas optio consequuntur aperiam fuga.",
              status: "PUBLISHED",
            },
            {
              id: "218",
              title: "Laborum officia corporis iure.",
              status: "PUBLISHED",
            },
            {
              id: "219",
              title: "Natus animi error molestiae.",
              status: "PUBLISHED",
            },
            { id: "220", title: "Vitae alias dolorem.", status: "REJECTED" },
            {
              id: "221",
              title: "Ducimus veniam labore ab nam a odio.",
              status: "REJECTED",
            },
            {
              id: "222",
              title: "Atque nesciunt sequi commodi eum.",
              status: "REJECTED",
            },
            { id: "223", title: "Ullam laborum recusandae.", status: "DRAFT" },
            {
              id: "224",
              title:
                "Ipsa omnis doloremque sunt odit incidunt illum cumque quam ratione.",
              status: "PUBLISHED",
            },
            { id: "225", title: "Unde officia aliquam.", status: "PUBLISHED" },
            { id: "226", title: "Corrupti at eos autem.", status: "DRAFT" },
            {
              id: "227",
              title: "Magni neque dignissimos aut.",
              status: "PUBLISHED",
            },
            {
              id: "228",
              title: "Perspiciatis at illum itaque ipsa.",
              status: "REJECTED",
            },
            { id: "229", title: "Nesciunt nostrum dolor.", status: "REJECTED" },
            {
              id: "230",
              title:
                "Cupiditate tempora voluptatibus suscipit quis suscipit molestias veniam in nostrum.",
              status: "DRAFT",
            },
            { id: "231", title: "Voluptatem dolorum dolor.", status: "DRAFT" },
            {
              id: "232",
              title: "Debitis quam aliquam aspernatur minima.",
              status: "REJECTED",
            },
            {
              id: "233",
              title: "Aperiam rerum consectetur molestiae.",
              status: "REJECTED",
            },
            {
              id: "234",
              title: "Sed vel voluptates laboriosam praesentium.",
              status: "PUBLISHED",
            },
            {
              id: "235",
              title: "Beatae ab nihil porro rem unde saepe.",
              status: "REJECTED",
            },
            {
              id: "236",
              title: "Libero suscipit expedita.",
              status: "PUBLISHED",
            },
            {
              id: "237",
              title: "Nobis natus voluptates dicta corporis.",
              status: "DRAFT",
            },
            {
              id: "238",
              title: "Quibusdam esse in doloribus occaecati repellat.",
              status: "DRAFT",
            },
            {
              id: "239",
              title:
                "Sint totam voluptatem officiis vero molestias perspiciatis reiciendis sed facere.",
              status: "DRAFT",
            },
            {
              id: "240",
              title:
                "Veritatis rerum rem blanditiis veritatis impedit corporis minima cum in.",
              status: "DRAFT",
            },
            {
              id: "241",
              title: "Quas debitis iste quod numquam ad sit beatae.",
              status: "REJECTED",
            },
            {
              id: "242",
              title: "Ex animi perspiciatis pariatur illo laudantium.",
              status: "PUBLISHED",
            },
            {
              id: "243",
              title:
                "Eum blanditiis in libero et hic inventore magni dignissimos id.",
              status: "REJECTED",
            },
            { id: "244", title: "Tempora a harum harum.", status: "PUBLISHED" },
            {
              id: "245",
              title: "Ipsa eum dolore molestias debitis fugiat commodi.",
              status: "PUBLISHED",
            },
            {
              id: "246",
              title: "Ab tempore ipsam commodi illum veniam illo voluptatibus.",
              status: "DRAFT",
            },
            {
              id: "247",
              title:
                "Itaque vero doloribus labore sit distinctio voluptatibus non impedit.",
              status: "REJECTED",
            },
            {
              id: "248",
              title:
                "Facere debitis quae hic nulla dolorum labore vero placeat.",
              status: "REJECTED",
            },
            {
              id: "249",
              title:
                "Adipisci incidunt saepe commodi voluptate dolor nisi mollitia magni.",
              status: "DRAFT",
            },
            {
              id: "250",
              title:
                "Omnis corrupti quod praesentium cum recusandae asperiores.",
              status: "PUBLISHED",
            },
            {
              id: "251",
              title:
                "Illum ab similique assumenda facilis dolor illum in saepe.",
              status: "PUBLISHED",
            },
            { id: "252", title: "Veniam inventore cum.", status: "PUBLISHED" },
            {
              id: "253",
              title: "Impedit ipsa eaque sit dolorem numquam itaque nulla.",
              status: "REJECTED",
            },
            {
              id: "254",
              title: "Sunt odit numquam vero sit vel dignissimos.",
              status: "PUBLISHED",
            },
            {
              id: "255",
              title: "Aut at enim nam totam eos fuga omnis minus sapiente.",
              status: "DRAFT",
            },
            {
              id: "256",
              title: "Quasi corrupti sequi nesciunt nostrum dolorem nemo.",
              status: "REJECTED",
            },
            {
              id: "257",
              title: "Exercitationem quia minima natus quam.",
              status: "REJECTED",
            },
            { id: "258", title: "Qui beatae quaerat.", status: "PUBLISHED" },
            { id: "259", title: "Et ex totam eius.", status: "REJECTED" },
            {
              id: "260",
              title:
                "Doloremque officia doloremque omnis ullam hic eveniet tenetur ullam labore.",
              status: "PUBLISHED",
            },
            { id: "261", title: "Impedit illo maiores vel.", status: "DRAFT" },
            {
              id: "262",
              title: "Quibusdam quam ad ex dicta quo perferendis.",
              status: "DRAFT",
            },
            {
              id: "263",
              title: "Optio minus veritatis incidunt amet praesentium ea.",
              status: "DRAFT",
            },
            { id: "264", title: "Minus cumque expedita.", status: "REJECTED" },
            {
              id: "265",
              title:
                "Voluptatem officia praesentium necessitatibus eius dignissimos dignissimos.",
              status: "PUBLISHED",
            },
            {
              id: "266",
              title: "Debitis alias quam sapiente.",
              status: "PUBLISHED",
            },
            {
              id: "267",
              title: "Ut perferendis quam in quidem id sunt.",
              status: "PUBLISHED",
            },
            {
              id: "268",
              title:
                "Molestias modi occaecati sed perspiciatis necessitatibus alias necessitatibus eaque.",
              status: "DRAFT",
            },
            {
              id: "269",
              title: "Non ut ducimus alias minus excepturi.",
              status: "REJECTED",
            },
            { id: "270", title: "Eum optio eius ab.", status: "PUBLISHED" },
            {
              id: "271",
              title: "Totam voluptate expedita dolor.",
              status: "REJECTED",
            },
            {
              id: "272",
              title: "Repellat deserunt laboriosam voluptatum omnis similique.",
              status: "PUBLISHED",
            },
            {
              id: "273",
              title:
                "Architecto illum voluptatem voluptatem iste aperiam facilis.",
              status: "REJECTED",
            },
            {
              id: "274",
              title:
                "Expedita dignissimos maxime consequuntur optio distinctio nobis.",
              status: "PUBLISHED",
            },
            {
              id: "275",
              title: "Debitis a adipisci laborum harum.",
              status: "REJECTED",
            },
            {
              id: "276",
              title: "Non odio voluptatibus laudantium.",
              status: "REJECTED",
            },
            {
              id: "277",
              title: "Suscipit laudantium facilis.",
              status: "REJECTED",
            },
            {
              id: "278",
              title:
                "Natus vel quis optio nihil doloribus reiciendis consequatur.",
              status: "REJECTED",
            },
            {
              id: "279",
              title:
                "Ducimus autem id amet tempore nam laboriosam enim a dolores.",
              status: "PUBLISHED",
            },
            { id: "280", title: "Amet earum recusandae.", status: "DRAFT" },
            {
              id: "281",
              title: "Cupiditate placeat ducimus ex commodi natus quia.",
              status: "DRAFT",
            },
            {
              id: "282",
              title:
                "Beatae accusamus cumque accusantium autem a asperiores at eveniet.",
              status: "REJECTED",
            },
            {
              id: "283",
              title: "Impedit molestias reprehenderit.",
              status: "REJECTED",
            },
            {
              id: "284",
              title: "Ex iste eligendi blanditiis.",
              status: "DRAFT",
            },
            {
              id: "285",
              title:
                "Labore atque iure aut ducimus quaerat numquam reiciendis officia debitis.",
              status: "REJECTED",
            },
            {
              id: "286",
              title: "Eaque similique veniam suscipit magnam consequatur.",
              status: "REJECTED",
            },
            {
              id: "287",
              title: "Nostrum animi aliquam numquam.",
              status: "REJECTED",
            },
            {
              id: "288",
              title: "Similique odio molestias nostrum.",
              status: "REJECTED",
            },
            {
              id: "289",
              title: "Dolore harum eum sunt sint expedita ipsum.",
              status: "PUBLISHED",
            },
            {
              id: "290",
              title: "Quas at numquam dolor quas tempore.",
              status: "REJECTED",
            },
            {
              id: "291",
              title:
                "Consequuntur iusto ullam itaque ullam molestiae nostrum ducimus corporis.",
              status: "DRAFT",
            },
            {
              id: "292",
              title: "Occaecati in deleniti quasi.",
              status: "REJECTED",
            },
            {
              id: "293",
              title: "Nam voluptate soluta eius iste.",
              status: "PUBLISHED",
            },
            {
              id: "294",
              title: "Ea corrupti dolorum necessitatibus.",
              status: "PUBLISHED",
            },
            {
              id: "295",
              title: "Quibusdam tempore harum nisi.",
              status: "DRAFT",
            },
            {
              id: "296",
              title:
                "Fugiat adipisci itaque architecto error animi fuga accusantium.",
              status: "PUBLISHED",
            },
            {
              id: "297",
              title:
                "Earum odio atque laboriosam beatae asperiores aspernatur et fugit.",
              status: "PUBLISHED",
            },
            {
              id: "298",
              title: "Cupiditate libero hic tempora eligendi.",
              status: "DRAFT",
            },
            {
              id: "299",
              title: "Recusandae deleniti illum culpa ipsum sequi.",
              status: "DRAFT",
            },
            {
              id: "300",
              title: "Eos hic illum cupiditate nesciunt molestias.",
              status: "DRAFT",
            },
            {
              id: "301",
              title: "Totam maxime neque quos ipsa temporibus assumenda quae.",
              status: "PUBLISHED",
            },
            {
              id: "302",
              title:
                "Necessitatibus aliquid voluptatum voluptatibus voluptates veniam veniam animi nostrum voluptatibus.",
              status: "PUBLISHED",
            },
            {
              id: "303",
              title:
                "Similique consequuntur praesentium blanditiis nam molestiae quidem repellat temporibus illum.",
              status: "DRAFT",
            },
            {
              id: "304",
              title: "Occaecati tempora voluptatum mollitia in.",
              status: "REJECTED",
            },
            {
              id: "305",
              title:
                "Ea eius eum molestiae cumque porro iure deserunt illum quas.",
              status: "REJECTED",
            },
            { id: "306", title: "In nulla beatae.", status: "DRAFT" },
            {
              id: "307",
              title: "Assumenda aperiam incidunt veniam.",
              status: "DRAFT",
            },
            {
              id: "308",
              title: "Debitis ab velit vero aut accusamus autem molestias.",
              status: "REJECTED",
            },
            { id: "309", title: "Pariatur ut hic adipisci.", status: "DRAFT" },
            {
              id: "310",
              title: "Repudiandae vero expedita in qui dolorum.",
              status: "PUBLISHED",
            },
            {
              id: "311",
              title: "Expedita perferendis esse recusandae rerum.",
              status: "REJECTED",
            },
            { id: "312", title: "Quae amet quas.", status: "DRAFT" },
            {
              id: "313",
              title: "Quis nesciunt consectetur aspernatur facere.",
              status: "PUBLISHED",
            },
            {
              id: "314",
              title:
                "Saepe numquam quis sunt explicabo commodi fugit rerum accusamus sunt.",
              status: "DRAFT",
            },
            {
              id: "315",
              title: "Eos laborum minima ratione.",
              status: "PUBLISHED",
            },
            {
              id: "316",
              title: "Odio aspernatur consequatur.",
              status: "DRAFT",
            },
            {
              id: "317",
              title: "Itaque id esse est aliquam numquam voluptas.",
              status: "PUBLISHED",
            },
            {
              id: "318",
              title: "Quod similique in a beatae.",
              status: "REJECTED",
            },
            {
              id: "319",
              title: "Temporibus aperiam ea illo itaque quam dolorem.",
              status: "REJECTED",
            },
            {
              id: "320",
              title: "Voluptas error laudantium deleniti cupiditate culpa ex.",
              status: "DRAFT",
            },
            {
              id: "321",
              title:
                "Doloremque animi blanditiis porro explicabo repellat repellendus cumque quos quasi.",
              status: "PUBLISHED",
            },
            { id: "322", title: "Aut saepe cumque.", status: "DRAFT" },
            { id: "323", title: "Ut qui sit veniam vero.", status: "REJECTED" },
            {
              id: "324",
              title: "Nesciunt voluptatibus nihil.",
              status: "DRAFT",
            },
            {
              id: "325",
              title:
                "Culpa quis animi non similique harum libero asperiores perspiciatis.",
              status: "DRAFT",
            },
            {
              id: "326",
              title: "Saepe temporibus dolore dolores.",
              status: "DRAFT",
            },
            {
              id: "327",
              title: "Voluptatum maxime recusandae.",
              status: "DRAFT",
            },
            {
              id: "328",
              title: "Fuga repudiandae perspiciatis amet ipsa nihil.",
              status: "DRAFT",
            },
            {
              id: "329",
              title: "Quisquam perspiciatis fuga et consequuntur.",
              status: "PUBLISHED",
            },
            {
              id: "330",
              title: "Modi optio dicta assumenda explicabo.",
              status: "PUBLISHED",
            },
            {
              id: "331",
              title: "Pariatur iste eum porro odit quia.",
              status: "REJECTED",
            },
            { id: "332", title: "Quae ratione officia.", status: "DRAFT" },
            {
              id: "335",
              title: "Aut magni non dolor corrupti nisi.",
              status: "DRAFT",
            },
            { id: "336", title: "Vitae ipsum quos.", status: "DRAFT" },
            { id: "337", title: "Eos minima sequi.", status: "REJECTED" },
            {
              id: "338",
              title: "Temporibus consequatur aut ullam atque sed perspiciatis.",
              status: "DRAFT",
            },
            {
              id: "339",
              title:
                "Officia nesciunt fugiat possimus nesciunt possimus autem error.",
              status: "REJECTED",
            },
            {
              id: "340",
              title: "Alias autem dolor consectetur.",
              status: "REJECTED",
            },
            {
              id: "341",
              title: "Quaerat dignissimos optio consequuntur vero.",
              status: "PUBLISHED",
            },
            {
              id: "342",
              title:
                "Aspernatur voluptates debitis ex deserunt distinctio ipsa incidunt officiis eligendi.",
              status: "PUBLISHED",
            },
            {
              id: "343",
              title: "Sit reiciendis perferendis voluptatum.",
              status: "REJECTED",
            },
            {
              id: "344",
              title: "Dolorem facere earum quod.",
              status: "PUBLISHED",
            },
            {
              id: "345",
              title:
                "Veritatis atque autem inventore id tenetur quo laboriosam.",
              status: "REJECTED",
            },
            {
              id: "346",
              title: "Nesciunt tenetur unde illo nesciunt.",
              status: "DRAFT",
            },
            {
              id: "347",
              title:
                "Quaerat iusto dolorem fugiat aliquid nisi consectetur quos.",
              status: "DRAFT",
            },
            {
              id: "348",
              title:
                "Sint inventore itaque velit ut quia asperiores corrupti exercitationem.",
              status: "REJECTED",
            },
            {
              id: "349",
              title: "Sequi blanditiis ea voluptates.",
              status: "DRAFT",
            },
            {
              id: "350",
              title:
                "Magnam fugiat ipsa ullam itaque modi dolorem ad temporibus provident.",
              status: "REJECTED",
            },
            {
              id: "351",
              title: "Praesentium dolor soluta excepturi.",
              status: "PUBLISHED",
            },
            {
              id: "352",
              title: "Odio quia distinctio rerum suscipit eum.",
              status: "REJECTED",
            },
            {
              id: "353",
              title: "Porro iusto quis distinctio iure ratione.",
              status: "DRAFT",
            },
            {
              id: "354",
              title: "Facilis incidunt itaque inventore.",
              status: "REJECTED",
            },
            {
              id: "355",
              title: "Ipsa consectetur reiciendis placeat architecto minus.",
              status: "PUBLISHED",
            },
            {
              id: "356",
              title:
                "Iste aperiam cumque doloremque suscipit voluptatum veritatis tempora ut.",
              status: "PUBLISHED",
            },
            {
              id: "357",
              title: "Distinctio cupiditate dolore quaerat ea nisi magni.",
              status: "REJECTED",
            },
            {
              id: "358",
              title:
                "Aperiam accusamus soluta non deleniti numquam dolore corrupti saepe.",
              status: "PUBLISHED",
            },
            {
              id: "359",
              title: "Nesciunt nam inventore vitae architecto.",
              status: "DRAFT",
            },
            {
              id: "360",
              title: "A voluptate adipisci magnam.",
              status: "DRAFT",
            },
            {
              id: "361",
              title:
                "Necessitatibus praesentium facere amet esse architecto vero repudiandae.",
              status: "PUBLISHED",
            },
            {
              id: "362",
              title: "Sunt porro quam a atque architecto dolore voluptas.",
              status: "REJECTED",
            },
            { id: "363", title: "Mollitia quo quos.", status: "PUBLISHED" },
            {
              id: "364",
              title: "Sint aperiam temporibus provident pariatur.",
              status: "REJECTED",
            },
            {
              id: "365",
              title: "Corrupti ipsam molestias unde.",
              status: "DRAFT",
            },
            {
              id: "366",
              title: "Excepturi nostrum laborum est.",
              status: "REJECTED",
            },
            {
              id: "367",
              title: "Aliquid perspiciatis magni sunt odio corrupti.",
              status: "PUBLISHED",
            },
            {
              id: "368",
              title:
                "Praesentium asperiores natus unde officiis quisquam repellat aliquid recusandae.",
              status: "PUBLISHED",
            },
            {
              id: "369",
              title:
                "Repellendus quaerat possimus eos alias eius maiores a molestias beatae.",
              status: "REJECTED",
            },
            { id: "370", title: "Porro magni a.", status: "REJECTED" },
            {
              id: "371",
              title:
                "Iure doloremque tenetur libero voluptatibus omnis a labore sequi.",
              status: "REJECTED",
            },
            {
              id: "372",
              title:
                "Expedita quasi sequi esse quo labore voluptatem maiores velit exercitationem.",
              status: "PUBLISHED",
            },
            {
              id: "373",
              title: "Ipsa fugit itaque corporis facere accusamus ab.",
              status: "REJECTED",
            },
            {
              id: "374",
              title: "Reprehenderit eius labore suscipit.",
              status: "REJECTED",
            },
            {
              id: "375",
              title: "Distinctio cum suscipit sed.",
              status: "REJECTED",
            },
            {
              id: "376",
              title: "Aspernatur possimus placeat voluptate.",
              status: "REJECTED",
            },
            {
              id: "377",
              title:
                "Eveniet voluptate aliquid neque inventore alias consectetur tempore.",
              status: "PUBLISHED",
            },
            {
              id: "378",
              title:
                "Repudiandae exercitationem ipsa quaerat illo maxime adipisci.",
              status: "REJECTED",
            },
            {
              id: "379",
              title:
                "Alias accusamus est reiciendis numquam sit expedita assumenda praesentium illum.",
              status: "PUBLISHED",
            },
            {
              id: "380",
              title: "Commodi ab repellat natus modi ea.",
              status: "PUBLISHED",
            },
            {
              id: "381",
              title:
                "Nostrum quam tempore rem quos molestias nulla maxime voluptas officiis.",
              status: "PUBLISHED",
            },
            {
              id: "382",
              title:
                "Quaerat sequi ea asperiores reiciendis repellendus cumque.",
              status: "PUBLISHED",
            },
            {
              id: "383",
              title:
                "Maxime laboriosam deserunt iste distinctio neque voluptas quas adipisci laboriosam.",
              status: "DRAFT",
            },
            { id: "384", title: "Maiores nemo cupiditate.", status: "DRAFT" },
            {
              id: "385",
              title:
                "Repudiandae sint amet nam maxime inventore sed repellendus quasi eligendi.",
              status: "DRAFT",
            },
            {
              id: "386",
              title:
                "Fuga officia exercitationem consequuntur explicabo reprehenderit.",
              status: "PUBLISHED",
            },
            {
              id: "387",
              title: "Quaerat architecto officia eum mollitia ipsum provident.",
              status: "PUBLISHED",
            },
            {
              id: "388",
              title:
                "Laboriosam cupiditate quod cupiditate labore laboriosam odit numquam repellat.",
              status: "PUBLISHED",
            },
            {
              id: "389",
              title: "Accusamus quae ullam optio qui dicta.",
              status: "REJECTED",
            },
            {
              id: "390",
              title: "Praesentium voluptatum placeat tempore.",
              status: "PUBLISHED",
            },
            {
              id: "391",
              title:
                "Porro cum deserunt natus nulla corporis nihil aliquid quidem quam.",
              status: "DRAFT",
            },
            {
              id: "392",
              title: "Facere illum rem aliquam libero.",
              status: "DRAFT",
            },
            {
              id: "393",
              title: "Illum voluptatum assumenda.",
              status: "REJECTED",
            },
            {
              id: "394",
              title: "Ipsum harum error blanditiis hic laborum occaecati.",
              status: "PUBLISHED",
            },
            {
              id: "395",
              title: "Quisquam ratione facilis similique.",
              status: "REJECTED",
            },
            {
              id: "396",
              title: "Beatae tenetur itaque minima ad nesciunt.",
              status: "REJECTED",
            },
            {
              id: "397",
              title: "Exercitationem occaecati occaecati quae.",
              status: "REJECTED",
            },
            {
              id: "398",
              title: "Nostrum illum veritatis quam quaerat eius commodi earum.",
              status: "DRAFT",
            },
            {
              id: "399",
              title: "Nemo fugit voluptates quam assumenda.",
              status: "DRAFT",
            },
            {
              id: "400",
              title:
                "Eos exercitationem dolor repellendus atque odit tempora voluptatem deleniti necessitatibus.",
              status: "REJECTED",
            },
            {
              id: "401",
              title:
                "Accusantium impedit voluptatibus maxime libero optio tenetur architecto.",
              status: "DRAFT",
            },
            {
              id: "402",
              title:
                "Nulla dicta fugit ea aliquam ad rem exercitationem in quo.",
              status: "REJECTED",
            },
            {
              id: "403",
              title: "Facilis explicabo ipsa ex quam ipsa.",
              status: "DRAFT",
            },
            {
              id: "404",
              title:
                "Consectetur voluptate exercitationem dolor dolor tempore est accusamus.",
              status: "PUBLISHED",
            },
            {
              id: "405",
              title:
                "Quas deserunt voluptates vitae quos ut repudiandae repellat.",
              status: "PUBLISHED",
            },
            {
              id: "406",
              title:
                "Sequi dignissimos accusantium laudantium numquam unde expedita reiciendis.",
              status: "PUBLISHED",
            },
            {
              id: "407",
              title: "Natus ipsum cum vel eaque.",
              status: "REJECTED",
            },
            {
              id: "408",
              title: "Nostrum sequi tenetur nostrum eaque.",
              status: "REJECTED",
            },
            {
              id: "409",
              title: "Exercitationem neque nihil ratione explicabo quod quos.",
              status: "REJECTED",
            },
            {
              id: "410",
              title: "Rem alias necessitatibus cumque facere odit.",
              status: "DRAFT",
            },
            {
              id: "411",
              title:
                "Deserunt ab repudiandae eos voluptas deleniti quaerat quas officiis.",
              status: "DRAFT",
            },
            {
              id: "412",
              title:
                "Deleniti pariatur aliquid quod ex facere atque sint fugit.",
              status: "PUBLISHED",
            },
            { id: "413", title: "Dolores cupiditate et.", status: "PUBLISHED" },
            {
              id: "414",
              title:
                "Aperiam delectus ratione recusandae laudantium omnis deserunt mollitia minus veritatis.",
              status: "DRAFT",
            },
            {
              id: "415",
              title: "Libero velit delectus magnam natus dolor.",
              status: "PUBLISHED",
            },
            {
              id: "416",
              title: "Animi dolorem magnam nesciunt nobis.",
              status: "REJECTED",
            },
            {
              id: "417",
              title:
                "Ex quibusdam voluptatem repudiandae et nihil dignissimos optio.",
              status: "PUBLISHED",
            },
            { id: "418", title: "Nemo itaque qui.", status: "DRAFT" },
            {
              id: "419",
              title: "Nemo cupiditate quam quis cum quod iure eos.",
              status: "PUBLISHED",
            },
            {
              id: "420",
              title:
                "Commodi pariatur ipsa placeat cum delectus pariatur et perspiciatis.",
              status: "DRAFT",
            },
            {
              id: "421",
              title: "Accusantium soluta beatae.",
              status: "PUBLISHED",
            },
            {
              id: "422",
              title: "Rem ullam recusandae maxime ullam.",
              status: "DRAFT",
            },
            {
              id: "423",
              title:
                "Quo impedit laboriosam unde sit molestiae nam iure consequatur molestias.",
              status: "PUBLISHED",
            },
            { id: "424", title: "Eos amet dolorum.", status: "DRAFT" },
            {
              id: "425",
              title:
                "Corporis vel cum omnis laudantium velit ducimus ad quae quas.",
              status: "REJECTED",
            },
            {
              id: "426",
              title: "Placeat a quisquam ipsum est.",
              status: "PUBLISHED",
            },
            {
              id: "427",
              title: "Unde optio doloremque labore deserunt doloribus.",
              status: "REJECTED",
            },
            {
              id: "428",
              title:
                "Asperiores vel qui natus incidunt aliquam totam non dolorum molestiae.",
              status: "DRAFT",
            },
            {
              id: "429",
              title: "Reiciendis voluptatum nemo enim.",
              status: "PUBLISHED",
            },
            {
              id: "430",
              title: "Repellendus saepe ad rem odit.",
              status: "REJECTED",
            },
            {
              id: "431",
              title:
                "Molestias tenetur perferendis dignissimos neque cum natus ducimus aliquid.",
              status: "PUBLISHED",
            },
            {
              id: "432",
              title:
                "Dolores quae enim doloremque aut cupiditate hic labore culpa modi.",
              status: "REJECTED",
            },
            {
              id: "433",
              title: "Molestiae maiores ratione architecto officia.",
              status: "REJECTED",
            },
            {
              id: "434",
              title:
                "Assumenda possimus nesciunt ratione magni reiciendis perferendis natus.",
              status: "DRAFT",
            },
            {
              id: "435",
              title: "Minus aperiam consectetur.",
              status: "REJECTED",
            },
            {
              id: "436",
              title:
                "Impedit laboriosam dolore iusto quasi ad culpa consequatur ipsum reprehenderit.",
              status: "REJECTED",
            },
            {
              id: "437",
              title:
                "Similique consequatur impedit dolores porro recusandae dolore necessitatibus.",
              status: "DRAFT",
            },
            {
              id: "438",
              title:
                "Enim odio sequi laborum autem eligendi quisquam voluptatum sint.",
              status: "DRAFT",
            },
            {
              id: "439",
              title:
                "Quo incidunt eligendi rem odit fugit explicabo odit amet veniam.",
              status: "DRAFT",
            },
            { id: "440", title: "Omnis saepe expedita.", status: "REJECTED" },
            {
              id: "441",
              title: "Ratione ipsa odio quisquam asperiores.",
              status: "PUBLISHED",
            },
            {
              id: "443",
              title: "Hic est nemo sequi blanditiis tempora.",
              status: "PUBLISHED",
            },
            {
              id: "444",
              title:
                "Laudantium praesentium tempora rem molestias enim nisi assumenda magnam.",
              status: "DRAFT",
            },
            {
              id: "445",
              title: "Adipisci cumque aut dolorum.",
              status: "PUBLISHED",
            },
            {
              id: "446",
              title:
                "Necessitatibus nam recusandae pariatur facere quasi laborum porro nulla.",
              status: "DRAFT",
            },
            {
              id: "447",
              title:
                "Possimus blanditiis repellendus laboriosam eum facere dolores facere.",
              status: "PUBLISHED",
            },
            {
              id: "448",
              title: "Atque tenetur repellendus.",
              status: "REJECTED",
            },
            {
              id: "449",
              title: "Impedit perferendis iste quam culpa dolorum porro.",
              status: "DRAFT",
            },
            {
              id: "450",
              title: "Culpa quas facere laudantium mollitia.",
              status: "DRAFT",
            },
            {
              id: "451",
              title:
                "Tempore quidem commodi ipsa sint debitis laudantium vel recusandae id.",
              status: "PUBLISHED",
            },
            {
              id: "452",
              title:
                "Quibusdam omnis porro eaque quaerat dicta aliquid facere.",
              status: "REJECTED",
            },
            {
              id: "453",
              title: "Ad totam deserunt minus corporis.",
              status: "PUBLISHED",
            },
            {
              id: "454",
              title:
                "Asperiores modi maxime numquam sequi delectus perspiciatis dolores architecto.",
              status: "DRAFT",
            },
            {
              id: "455",
              title:
                "Dicta numquam veniam inventore nostrum quae aperiam accusantium suscipit similique.",
              status: "REJECTED",
            },
            {
              id: "456",
              title: "Deserunt eos modi molestias at dolores.",
              status: "DRAFT",
            },
            {
              id: "457",
              title: "Voluptatem veritatis neque.",
              status: "REJECTED",
            },
            {
              id: "458",
              title: "Eius minus culpa nulla sunt voluptatibus.",
              status: "REJECTED",
            },
            {
              id: "459",
              title: "Sit eos culpa et vitae vero.",
              status: "DRAFT",
            },
            {
              id: "460",
              title: "Fuga quos assumenda iusto at.",
              status: "REJECTED",
            },
            {
              id: "461",
              title: "Explicabo aut atque dolorem porro dolorum.",
              status: "REJECTED",
            },
            {
              id: "462",
              title:
                "Corrupti odit vel debitis delectus omnis numquam ducimus corporis animi.",
              status: "REJECTED",
            },
            { id: "463", title: "Laborum hic impedit.", status: "REJECTED" },
            {
              id: "464",
              title:
                "Accusamus aut consequatur repudiandae ipsum facilis sed quisquam.",
              status: "REJECTED",
            },
            {
              id: "465",
              title: "Mollitia ducimus delectus reprehenderit voluptate.",
              status: "DRAFT",
            },
            {
              id: "466",
              title:
                "Doloremque quaerat praesentium fugiat velit illo eveniet error.",
              status: "REJECTED",
            },
            {
              id: "467",
              title:
                "Mollitia tempora cupiditate error doloribus id cupiditate adipisci beatae illum.",
              status: "PUBLISHED",
            },
            { id: "468", title: "Accusamus nesciunt dolor.", status: "DRAFT" },
            {
              id: "469",
              title: "Labore ullam quod fuga sint quaerat cumque amet.",
              status: "PUBLISHED",
            },
            {
              id: "470",
              title:
                "Enim odit eum nesciunt alias expedita mollitia natus labore blanditiis.",
              status: "REJECTED",
            },
            { id: "471", title: "Fugit vero non neque.", status: "REJECTED" },
            {
              id: "472",
              title: "Nemo alias delectus numquam.",
              status: "PUBLISHED",
            },
            {
              id: "473",
              title:
                "Cupiditate similique sed aperiam quasi facilis corporis repellendus.",
              status: "REJECTED",
            },
            {
              id: "474",
              title:
                "Quibusdam expedita doloremque earum earum maxime pariatur.",
              status: "PUBLISHED",
            },
            {
              id: "475",
              title: "Ratione pariatur delectus.",
              status: "PUBLISHED",
            },
            {
              id: "476",
              title: "Omnis soluta reprehenderit officia eligendi.",
              status: "DRAFT",
            },
            {
              id: "477",
              title: "Dolorem ut eligendi suscipit labore unde sint.",
              status: "DRAFT",
            },
            {
              id: "478",
              title:
                "Consequatur iure sit asperiores iste harum reiciendis voluptate.",
              status: "REJECTED",
            },
            {
              id: "479",
              title:
                "Fuga deserunt exercitationem quae ipsa iure minus eum illo doloremque.",
              status: "REJECTED",
            },
            {
              id: "480",
              title:
                "Accusamus nihil esse quas at delectus voluptatem provident.",
              status: "PUBLISHED",
            },
            {
              id: "481",
              title: "Dolorem quo consequatur.",
              status: "PUBLISHED",
            },
            {
              id: "482",
              title: "Assumenda amet exercitationem recusandae.",
              status: "REJECTED",
            },
            {
              id: "483",
              title: "Commodi harum adipisci nesciunt doloremque.",
              status: "REJECTED",
            },
            {
              id: "484",
              title: "Nemo illo perspiciatis mollitia magnam.",
              status: "REJECTED",
            },
            {
              id: "485",
              title: "Voluptatibus ad odit maxime soluta nisi cumque vel.",
              status: "DRAFT",
            },
            {
              id: "486",
              title:
                "Veritatis necessitatibus dolor vel eaque consequatur ullam consectetur numquam.",
              status: "PUBLISHED",
            },
            {
              id: "487",
              title:
                "Tempora perspiciatis magnam quae blanditiis vel inventore sequi ipsa ad.",
              status: "REJECTED",
            },
            {
              id: "488",
              title: "Ipsum ipsum possimus assumenda saepe.",
              status: "PUBLISHED",
            },
            {
              id: "489",
              title:
                "Optio cupiditate nostrum magni ipsam dolore mollitia dolores cumque.",
              status: "DRAFT",
            },
            {
              id: "490",
              title: "Nostrum quia nihil perspiciatis nihil facere.",
              status: "DRAFT",
            },
            {
              id: "491",
              title: "Autem ipsum repellat deleniti.",
              status: "PUBLISHED",
            },
            {
              id: "492",
              title: "Repellendus ad ullam sequi blanditiis.",
              status: "PUBLISHED",
            },
            {
              id: "493",
              title: "Id cupiditate quam veritatis earum.",
              status: "REJECTED",
            },
            {
              id: "494",
              title: "Iusto error quas debitis est.",
              status: "DRAFT",
            },
            {
              id: "495",
              title: "Nulla iste magnam iure sapiente commodi fuga.",
              status: "PUBLISHED",
            },
            {
              id: "496",
              title:
                "Cum ipsam laboriosam voluptate fugiat molestiae placeat suscipit ut.",
              status: "PUBLISHED",
            },
            {
              id: "497",
              title: "Earum illo saepe explicabo assumenda blanditiis.",
              status: "DRAFT",
            },
            {
              id: "498",
              title:
                "Architecto molestias dolorem praesentium corporis voluptas.",
              status: "REJECTED",
            },
            {
              id: "499",
              title:
                "Consectetur magnam recusandae eligendi quisquam excepturi.",
              status: "REJECTED",
            },
            { id: "504", title: "foo", status: "DRAFT" },
            { id: "500", title: "OK", status: "PUBLISHED" },
            { id: "501", title: "foo", status: "DRAFT" },
            {
              id: "1",
              title: "1st record Similique qui magnam fugiat quidem.",
              status: "PUBLISHED",
            },
            { id: "502", title: "foo1", status: "DRAFT" },
            { id: "503", title: "foo2", status: "DRAFT" },
            { id: "113", title: "Updated Title 3", status: "PUBLISHED" },
            { id: "505", title: "foo1", status: "DRAFT" },
            { id: "506", title: "foo2", status: "DRAFT" },
            { id: "507", title: "foo", status: "DRAFT" },
          ],
          totalCount: 503,
        },
      },
    },
    {
      "access-control-allow-origin": "*",
      "cache-control": "no-store",
      connection: "keep-alive",
      "content-length": "45233",
      "content-type": "application/graphql-response+json; charset=utf-8",
      date: "Tue, 03 Dec 2024 13:31:07 GMT",
      etag: 'W/"b0b1-p888snSOc4YA7l4i5qEZuzHJ6/M"',
      "strict-transport-security": "max-age=15724800; includeSubDomains",
      "x-powered-by": "Express",
    },
  );

nock("https://api.nestjs-query.refine.dev:443", { encodedQueryParams: true })
  .post("/graphql", {
    operationName: "BlogPosts",
    query:
      "\n  query BlogPosts($paging: OffsetPaging!, $filter: BlogPostFilter!, $sorting: [BlogPostSort!]!) {\n    blogPosts(paging: $paging, filter: $filter, sorting: $sorting) {\n      nodes {\n        id\n        title\n        status\n      }\n      totalCount\n    }\n  }\n",
    variables: { filter: {}, paging: { limit: 10, offset: 0 }, sorting: [] },
  })
  .reply(
    200,
    {
      data: {
        blogPosts: {
          nodes: [
            {
              id: "3",
              title:
                "Laudantium ut atque quia quibusdam accusantium dolore architecto.",
              status: "DRAFT",
            },
            {
              id: "4",
              title:
                "Vero dolores quis reprehenderit eveniet libero ut reiciendis aspernatur.",
              status: "REJECTED",
            },
            { id: "5", title: "Nobis inventore ipsum.", status: "REJECTED" },
            {
              id: "6",
              title: "Adipisci voluptatem voluptatibus maiores illum.",
              status: "REJECTED",
            },
            {
              id: "7",
              title: "Suscipit omnis dignissimos.",
              status: "PUBLISHED",
            },
            {
              id: "8",
              title: "Non iure error magni rerum voluptatum repellat.",
              status: "PUBLISHED",
            },
            {
              id: "9",
              title: "Ipsa ipsam veritatis nobis temporibus eligendi deserunt.",
              status: "PUBLISHED",
            },
            { id: "10", title: "Animi veritatis sint.", status: "REJECTED" },
            { id: "11", title: "Est aspernatur assumenda.", status: "DRAFT" },
            { id: "13", title: "Commodi nostrum fugiat.", status: "DRAFT" },
          ],
          totalCount: 503,
        },
      },
    },
    {
      "access-control-allow-origin": "*",
      "cache-control": "no-store",
      connection: "keep-alive",
      "content-length": "874",
      "content-type": "application/graphql-response+json; charset=utf-8",
      date: "Tue, 03 Dec 2024 13:31:07 GMT",
      etag: 'W/"36a-lYljvtdjSjKrDMHiKT6WNjsEeFs"',
      "strict-transport-security": "max-age=15724800; includeSubDomains",
      "x-powered-by": "Express",
    },
  );

nock("https://api.nestjs-query.refine.dev:443", { encodedQueryParams: true })
  .post("/graphql", {
    operationName: "BlogPosts",
    query:
      "\n  query BlogPosts($paging: OffsetPaging!, $filter: BlogPostFilter!, $sorting: [BlogPostSort!]!) {\n    blogPosts(paging: $paging, filter: $filter, sorting: $sorting) {\n      nodes {\n        id\n        title\n        status\n      }\n      totalCount\n    }\n  }\n",
    variables: {
      filter: {},
      paging: { limit: 10, offset: 0 },
      sorting: [{ direction: "DESC", field: "id" }],
    },
  })
  .reply(
    200,
    {
      data: {
        blogPosts: {
          nodes: [
            { id: "507", title: "foo", status: "DRAFT" },
            { id: "506", title: "foo2", status: "DRAFT" },
            { id: "505", title: "foo1", status: "DRAFT" },
            { id: "504", title: "foo", status: "DRAFT" },
            { id: "503", title: "foo2", status: "DRAFT" },
            { id: "502", title: "foo1", status: "DRAFT" },
            { id: "501", title: "foo", status: "DRAFT" },
            { id: "500", title: "OK", status: "PUBLISHED" },
            {
              id: "499",
              title:
                "Consectetur magnam recusandae eligendi quisquam excepturi.",
              status: "REJECTED",
            },
            {
              id: "498",
              title:
                "Architecto molestias dolorem praesentium corporis voluptas.",
              status: "REJECTED",
            },
          ],
          totalCount: 503,
        },
      },
    },
    {
      "access-control-allow-origin": "*",
      "cache-control": "no-store",
      connection: "keep-alive",
      "content-length": "616",
      "content-type": "application/graphql-response+json; charset=utf-8",
      date: "Tue, 03 Dec 2024 13:31:07 GMT",
      etag: 'W/"268-1Bj8/pRfjseJafeiKITwDv4QvwM"',
      "strict-transport-security": "max-age=15724800; includeSubDomains",
      "x-powered-by": "Express",
    },
  );

nock("https://api.nestjs-query.refine.dev:443", { encodedQueryParams: true })
  .post("/graphql", {
    operationName: "BlogPosts",
    query:
      "\n  query BlogPosts($paging: OffsetPaging!, $filter: BlogPostFilter!, $sorting: [BlogPostSort!]!) {\n    blogPosts(paging: $paging, filter: $filter, sorting: $sorting) {\n      nodes {\n        id\n        title\n        status\n      }\n      totalCount\n    }\n  }\n",
    variables: {
      filter: { status: { eq: "DRAFT" } },
      paging: { limit: 10, offset: 0 },
      sorting: [],
    },
  })
  .reply(
    200,
    {
      data: {
        blogPosts: {
          nodes: [
            {
              id: "3",
              title:
                "Laudantium ut atque quia quibusdam accusantium dolore architecto.",
              status: "DRAFT",
            },
            { id: "11", title: "Est aspernatur assumenda.", status: "DRAFT" },
            { id: "13", title: "Commodi nostrum fugiat.", status: "DRAFT" },
            { id: "14", title: "Neque sit iure.", status: "DRAFT" },
            {
              id: "15",
              title: "Enim repellendus ab amet ipsum perferendis.",
              status: "DRAFT",
            },
            { id: "12", title: "OK", status: "DRAFT" },
            { id: "20", title: "Incidunt sequi repellendus.", status: "DRAFT" },
            {
              id: "24",
              title:
                "Corrupti ex fugit dolore soluta recusandae aperiam ad neque adipisci.",
              status: "DRAFT",
            },
            {
              id: "30",
              title: "Provident earum velit optio enim delectus rerum.",
              status: "DRAFT",
            },
            {
              id: "33",
              title: "Porro voluptatem non quaerat.",
              status: "DRAFT",
            },
          ],
          totalCount: 162,
        },
      },
    },
    {
      "access-control-allow-origin": "*",
      "cache-control": "no-store",
      connection: "keep-alive",
      "content-length": "797",
      "content-type": "application/graphql-response+json; charset=utf-8",
      date: "Tue, 03 Dec 2024 13:31:07 GMT",
      etag: 'W/"31d-2VqxFLd0ixru8PTkvcuExK79g1M"',
      "strict-transport-security": "max-age=15724800; includeSubDomains",
      "x-powered-by": "Express",
    },
  );

nock("https://api.nestjs-query.refine.dev:443", { encodedQueryParams: true })
  .post("/graphql", {
    operationName: "BlogPosts",
    query:
      "\n  query BlogPosts($paging: OffsetPaging!, $filter: BlogPostFilter!, $sorting: [BlogPostSort!]!) {\n    blogPosts(paging: $paging, filter: $filter, sorting: $sorting) {\n      nodes {\n        id\n        title\n        status\n      }\n      totalCount\n    }\n  }\n",
    variables: {
      filter: { and: [{ id: { lt: 10 }, status: { eq: "DRAFT" } }] },
      paging: { limit: 10, offset: 0 },
      sorting: [],
    },
  })
  .reply(
    200,
    {
      data: {
        blogPosts: {
          nodes: [
            {
              id: "3",
              title:
                "Laudantium ut atque quia quibusdam accusantium dolore architecto.",
              status: "DRAFT",
            },
          ],
          totalCount: 1,
        },
      },
    },
    {
      "access-control-allow-origin": "*",
      "cache-control": "no-store",
      connection: "keep-alive",
      "content-length": "154",
      "content-type": "application/graphql-response+json; charset=utf-8",
      date: "Tue, 03 Dec 2024 13:31:07 GMT",
      etag: 'W/"9a-/esgToFXNm+/tzjxXHLTW43JxOE"',
      "strict-transport-security": "max-age=15724800; includeSubDomains",
      "x-powered-by": "Express",
    },
  );

nock("https://api.nestjs-query.refine.dev:443", { encodedQueryParams: true })
  .post("/graphql", {
    operationName: "BlogPosts",
    query:
      "\n  query BlogPosts($paging: OffsetPaging!, $filter: BlogPostFilter!, $sorting: [BlogPostSort!]!) {\n    blogPosts(paging: $paging, filter: $filter, sorting: $sorting) {\n      nodes {\n        id\n        title\n        status\n      }\n      totalCount\n    }\n  }\n",
    variables: {
      filter: { or: [{ status: { eq: "PUBLISHED" } }] },
      paging: { limit: 10, offset: 0 },
      sorting: [],
    },
  })
  .reply(
    200,
    {
      data: {
        blogPosts: {
          nodes: [
            {
              id: "7",
              title: "Suscipit omnis dignissimos.",
              status: "PUBLISHED",
            },
            {
              id: "8",
              title: "Non iure error magni rerum voluptatum repellat.",
              status: "PUBLISHED",
            },
            {
              id: "9",
              title: "Ipsa ipsam veritatis nobis temporibus eligendi deserunt.",
              status: "PUBLISHED",
            },
            {
              id: "2",
              title: "1st Delectus consequatur temporibus magnam voluptatibus.",
              status: "PUBLISHED",
            },
            {
              id: "16",
              title: "Eaque id distinctio iste placeat doloribus commodi.",
              status: "PUBLISHED",
            },
            {
              id: "17",
              title: "Suscipit libero dolore saepe ab numquam esse blanditiis.",
              status: "PUBLISHED",
            },
            {
              id: "18",
              title:
                "Ratione molestias velit nobis sequi quisquam nemo nobis iure ipsam.",
              status: "PUBLISHED",
            },
            {
              id: "19",
              title:
                "Fugit ab odio cupiditate debitis velit similique voluptatem quisquam.",
              status: "PUBLISHED",
            },
            {
              id: "21",
              title: "Beatae quas enim voluptatem.",
              status: "PUBLISHED",
            },
            {
              id: "26",
              title: "Cupiditate quo aspernatur.",
              status: "PUBLISHED",
            },
          ],
          totalCount: 176,
        },
      },
    },
    {
      "access-control-allow-origin": "*",
      "cache-control": "no-store",
      connection: "keep-alive",
      "content-length": "971",
      "content-type": "application/graphql-response+json; charset=utf-8",
      date: "Tue, 03 Dec 2024 13:31:07 GMT",
      etag: 'W/"3cb-UcIpWSXZ8QasaNLF+Kd6LrD0TDQ"',
      "strict-transport-security": "max-age=15724800; includeSubDomains",
      "x-powered-by": "Express",
    },
  );

nock("https://api.nestjs-query.refine.dev:443", { encodedQueryParams: true })
  .post("/graphql", {
    operationName: "BlogPosts",
    query:
      "\n  query BlogPosts($paging: OffsetPaging!, $filter: BlogPostFilter!, $sorting: [BlogPostSort!]!) {\n    blogPosts(paging: $paging, filter: $filter, sorting: $sorting) {\n      nodes {\n        id1\n        title\n        status\n      }\n      totalCount\n    }\n  }\n",
    variables: { filter: {}, paging: { limit: 10, offset: 0 }, sorting: [] },
  })
  .reply(
    400,
    {
      errors: [
        {
          message:
            'Cannot query field "id1" on type "BlogPost". Did you mean "id"?',
          locations: [{ line: 5, column: 9 }],
          extensions: { code: "GRAPHQL_VALIDATION_FAILED" },
        },
      ],
    },
    {
      "access-control-allow-origin": "*",
      "cache-control": "no-store",
      connection: "keep-alive",
      "content-length": "183",
      "content-type": "application/graphql-response+json; charset=utf-8",
      date: "Tue, 03 Dec 2024 13:31:08 GMT",
      etag: 'W/"b7-TnrA0R/moVYD7u6apib94f8+1rs"',
      "strict-transport-security": "max-age=15724800; includeSubDomains",
      "x-powered-by": "Express",
    },
  );
