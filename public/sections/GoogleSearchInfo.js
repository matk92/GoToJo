import Spinner from "../components/Spinner.js";
import DOMPlugin from "../core/DOMPlugin.js";

export default function GoogleSearchInfo(searchInfo, images, loading = false) {
  //   searchInfo = exampleSearch;
  //   images = exampleImage;

  let searchItems = [{ type: "div" }];
  if (searchInfo != undefined) {
    searchItems = searchInfo?.items.map((item) => ({
      type: "div",
      props: {
        style: {
          padding: "10px",
          border: "1px solid #2e2e38",
          "border-radius": "10px",
        },
      },
      children: [
        {
          type: "h2",
          props: {
            style: {
              "font-size": "1.1rem",
              "margin-bottom": "5px",
            },
          },
          children: [
            {
              type: "TEXT_NODE",
              content: item.title,
            },
          ],
        },
        {
          type: "p",
          props: {
            style: {
              "font-size": "0.9rem",
            },
          },
          children: [
            {
              type: "TEXT_NODE",
              content: item.snippet,
            },
          ],
        },
        {
          type: "a",
          props: {
            href: item.link,
            target: "_blank",
            style: {
              "margin-top": "10px",
              "font-size": "0.8rem",
            },
          },
          children: [
            {
              type: "TEXT_NODE",
              content: "Voir plus",
            },
          ],
        },
      ],
    }));
  }
  let imageItems = [{ type: "div" }];
  if (images != undefined) {
    imageItems = images?.items.map((image) => ({
      type: "img",
      props: {
        src: image.link,
        style: {
          width: "100%",
          height: "180px",
          border: "1px solid #2e2e38",
          "border-radius": "10px",
          "object-fit": "cover",
        },
      },
    }));
  }

  return {
    type: "div",
    head: ["<link rel='stylesheet' href='/sections//GoogleSearchInfo.css'>"],
    props: {
      id: "google_search_info",
      style: {
        display: searchInfo == undefined && loading == false ? "none" : "block",
        position: "absolute",
        left: "0",
        to: "0",
        width: "35%",
        padding: "1% 1% 0% 1%",
        height: "100%",
        "background-color": "rgba(0, 0, 0, 0.4)",
        "overflow-y": "scroll",
      },
    },
    children:
      loading == true
        ? [Spinner()]
        : [
            {
              type: "div",
              props: {
                class: "slide-in",
                style: {
                  display: "flex",
                  "justify-content": "center",
                  "align-items": "center",
                  "flex-direction": "column",
                  gap: "10px",
                  width: "100%",
                  height: "fit-content",
                  "border-radius": "10px 10px 0px 00px",
                  "background-color": "#f5f5f5",
                  color: "#2e2e38",
                  padding: "10px",
                },
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      display: "flex",
                      width: "100%",
                      "padding-bottom": "10px",
                      "border-bottom": "1px solid #cccccc",
                      "justify-content": "space-between",
                      "align-items": "center",
                    },
                  },
                  children: [
                    {
                      type: "h1",
                      props: {
                        class: "barlow-bold",
                        style: {
                          "flex-grow": "1",
                          "font-size": "1.25rem",
                        },
                      },
                      children: [
                        {
                          type: "TEXT_NODE",
                          content: "Resultats de la recherche",
                        },
                      ],
                    },
                    {
                      type: "button",
                      props: {
                        onclick: () => {
                          DOMPlugin.reRender("google_search_info", GoogleSearchInfo());
                        },
                        style: {
                          border: "none",
                          background: "none",
                          cursor: "pointer",
                          color: "#000",
                          "font-size": "1.5rem",
                        },
                      },
                      children: [
                        {
                          type: "HTML_NODE",
                          content:
                            '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="20px" heigh="20px" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>',
                        },
                      ],
                    },
                  ],
                },
                ...[...searchItems, ...imageItems].sort(() => Math.random() - 0.5),
              ],
            },
          ],
  };
}

const exampleSearch = {
  kind: "customsearch#search",
  url: {
    type: "application/json",
    template:
      "https://www.googleapis.com/customsearch/v1?q={searchTerms}&num={count?}&start={startIndex?}&lr={language?}&safe={safe?}&cx={cx?}&sort={sort?}&filter={filter?}&gl={gl?}&cr={cr?}&googlehost={googleHost?}&c2coff={disableCnTwTranslation?}&hq={hq?}&hl={hl?}&siteSearch={siteSearch?}&siteSearchFilter={siteSearchFilter?}&exactTerms={exactTerms?}&excludeTerms={excludeTerms?}&linkSite={linkSite?}&orTerms={orTerms?}&dateRestrict={dateRestrict?}&lowRange={lowRange?}&highRange={highRange?}&searchType={searchType}&fileType={fileType?}&rights={rights?}&imgSize={imgSize?}&imgType={imgType?}&imgColorType={imgColorType?}&imgDominantColor={imgDominantColor?}&alt=json",
  },
  queries: {
    request: [
      {
        title: "Google Custom Search - riviera fuga",
        totalResults: "1550000",
        searchTerms: "riviera fuga",
        count: 10,
        startIndex: 1,
        inputEncoding: "utf8",
        outputEncoding: "utf8",
        safe: "off",
        cx: "639a89b0e9e4343b0",
      },
    ],
    nextPage: [
      {
        title: "Google Custom Search - riviera fuga",
        totalResults: "1550000",
        searchTerms: "riviera fuga",
        count: 10,
        startIndex: 11,
        inputEncoding: "utf8",
        outputEncoding: "utf8",
        safe: "off",
        cx: "639a89b0e9e4343b0",
      },
    ],
  },
  context: {
    title: "GoToJo",
  },
  searchInformation: {
    searchTime: 0.150872,
    formattedSearchTime: "0.15",
    totalResults: "1550000",
    formattedTotalResults: "1,550,000",
  },
  items: [
    {
      kind: "customsearch#result",
      title: "Riviera Fuga - Restaurant péniche à Paris",
      htmlTitle: "<b>Riviera Fuga</b> - Restaurant péniche à Paris",
      link: "https://www.fugafamily.com/restaurants/riviera-fuga",
      displayLink: "www.fugafamily.com",
      snippet:
        "Découvrez Riviera Fuga, un restaurant unique sur la Seine offrant une vue imprenable sur le Pont Alexandre III, proches des Invalides et le Grand Palais.",
      htmlSnippet:
        "Découvrez <b>Riviera Fuga</b>, un restaurant unique sur la Seine offrant une vue imprenable sur le Pont Alexandre III, proches des Invalides et le Grand Palais.",
      formattedUrl: "https://www.fugafamily.com/restaurants/riviera-fuga",
      htmlFormattedUrl: "https://www.<b>fuga</b>family.com/restaurants/<b>riviera</b>-<b>fuga</b>",
      pagemap: {
        metatags: [
          {
            viewport: "width=device-width, initial-scale=1",
          },
        ],
      },
    },
    {
      kind: "customsearch#result",
      title: "RIVIERA FUGA, Paris - Menu, Prices, Restaurant Reviews ...",
      htmlTitle: "<b>RIVIERA FUGA</b>, Paris - Menu, Prices, Restaurant Reviews ...",
      link: "https://www.tripadvisor.com/Restaurant_Review-g187147-d25579641-Reviews-Riviera_Fuga-Paris_Ile_de_France.html",
      displayLink: "www.tripadvisor.com",
      snippet:
        "Oct 10, 2023 ... An excellent setting, menu and staff. This restaurant offers a very original Italian-Japanese fusion. In addition to the very romantic setting, ...",
      htmlSnippet:
        "Oct 10, 2023 <b>...</b> An excellent setting, menu and staff. This restaurant offers a very original Italian-Japanese fusion. In addition to the very romantic setting,&nbsp;...",
      formattedUrl: "https://www.tripadvisor.com/Restaurant_Review-g187147-d25579641-Revi...",
      htmlFormattedUrl: "https://www.tripadvisor.com/Restaurant_Review-g187147-d25579641-Revi...",
      pagemap: {
        cse_thumbnail: [
          {
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2h3YVMH6vHpa21kqAlG2c2xBu0ETN3CNujWwltBYKULwMqVaoI6uXC24&s",
            width: "259",
            height: "194",
          },
        ],
        metatags: [
          {
            "twitter:app:url:iphone":
              "tripadvisor://www.tripadvisor.com/Restaurant_Review-g187147-d25579641-Reviews-Riviera_Fuga-Paris_Ile_de_France.html?m=33762",
            "apple-itunes-app":
              "app-id=284876795, app-argument=https://www.tripadvisor.com/Restaurant_Review-g187147-d25579641-Reviews-Riviera_Fuga-Paris_Ile_de_France.html",
            "og:image": "https://media-cdn.tripadvisor.com/media/photo-s/29/53/41/05/a-deux-pas-du-pont-alexandre.jpg",
            "theme-color": "#34e0a1",
            "og:type": "website",
            "og:image:width": "550",
            "og:site_name": "Tripadvisor",
            "al:ios:app_name": "TripAdvisor",
            "twitter:app:url:ipad":
              "tripadvisor://www.tripadvisor.com/Restaurant_Review-g187147-d25579641-Reviews-Riviera_Fuga-Paris_Ile_de_France.html?m=33762",
            "og:title": "RIVIERA FUGA, Paris - Menu, Prices, Restaurant Reviews & Reservations - Tripadvisor",
            "twitter:app:id:ipad": "284876795",
            "og:image:height": "412",
            "twitter:app:id:iphone": "284876795",
            "al:ios:url":
              "tripadvisor://www.tripadvisor.com/Restaurant_Review-g187147-d25579641-Reviews-Riviera_Fuga-Paris_Ile_de_France.html?m=33762",
            "fb:pages": "5863091683",
            "og:description":
              "Reserve a table at Riviera Fuga, Paris on Tripadvisor: See 45 unbiased reviews of Riviera Fuga, rated 4.5 of 5 on Tripadvisor and ranked #4,022 of 15,293 restaurants in Paris.",
            "al:ios:app_store_id": "284876795",
            "twitter:image":
              "https://media-cdn.tripadvisor.com/media/photo-s/29/53/41/05/a-deux-pas-du-pont-alexandre.jpg",
            viewport: "width=device-width, initial-scale=1.0, viewport-fit=cover",
            "og:locale": "en-US",
            "og:url":
              "https://www.tripadvisor.com/Restaurant_Review-g187147-d25579641-Reviews-Riviera_Fuga-Paris_Ile_de_France.html",
            "format-detection": "telephone=no",
          },
        ],
        cse_image: [
          {
            src: "https://media-cdn.tripadvisor.com/media/photo-s/29/53/41/05/a-deux-pas-du-pont-alexandre.jpg",
          },
        ],
      },
    },
    {
      kind: "customsearch#result",
      title: "Riviera Fuga - Restaurant péniche à Paris",
      htmlTitle: "<b>Riviera Fuga</b> - Restaurant péniche à Paris",
      link: "https://www.fugafamily.com/en/restaurants/riviera-fuga",
      displayLink: "www.fugafamily.com",
      snippet:
        "Laïa. Laïa is an hidden restaurant in the 11th arrondissement of Paris. Located in a historic building of an old distillery, at the bottom of a garden, with a ...",
      htmlSnippet:
        "Laïa. Laïa is an hidden restaurant in the 11th arrondissement of Paris. Located in a historic building of an old distillery, at the bottom of a garden, with a&nbsp;...",
      formattedUrl: "https://www.fugafamily.com/en/restaurants/riviera-fuga",
      htmlFormattedUrl: "https://www.<b>fuga</b>family.com/en/restaurants/<b>riviera</b>-<b>fuga</b>",
      pagemap: {
        metatags: [
          {
            viewport: "width=device-width, initial-scale=1",
          },
        ],
      },
    },
    {
      kind: "customsearch#result",
      title: "Riviera Fuga in Paris - Restaurant Reviews, Menu and Prices ...",
      htmlTitle: "<b>Riviera Fuga</b> in Paris - Restaurant Reviews, Menu and Prices ...",
      link: "https://www.thefork.com/restaurant/riviera-fuga-r803102",
      displayLink: "www.thefork.com",
      snippet:
        "Riviera Fuga is rated 9.4/10.TheFork users have rated accordingly in the following categories: Quality of food: 9.5/10; Service: 9.2/10; Atmosphere: 9.3/10 ...",
      htmlSnippet:
        "<b>Riviera Fuga</b> is rated 9.4/10.TheFork users have rated accordingly in the following categories: Quality of food: 9.5/10; Service: 9.2/10; Atmosphere: 9.3/10&nbsp;...",
      formattedUrl: "https://www.thefork.com/restaurant/riviera-fuga-r803102",
      htmlFormattedUrl: "https://www.thefork.com/restaurant/<b>riviera</b>-<b>fuga</b>-r803102",
      pagemap: {
        cse_thumbnail: [
          {
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpOHbhpqdIygqd8AIMZv0NXh7ECzuXfR_LO1VVfMiXW2ejscahNHsA2VIx&s",
            width: "224",
            height: "224",
          },
        ],
        metatags: [
          {
            "msapplication-tilecolor": "#00645A",
            "og:image":
              "https://res.cloudinary.com/tf-lab/image/upload/w_520,h_520,c_fill,q_auto,f_auto/restaurant/aef99149-1805-41a2-8908-2792506e3ccf/14205e6d-b8f1-4912-ad71-3208f5e0b2fe.png",
            "theme-color": "#00645A",
            "og:type": "website",
            "twitter:title": "Riviera Fuga in Paris - Restaurant Reviews, Menu and Prices | TheFork",
            "og:site_name": "TheFork",
            "og:title": "Riviera Fuga in Paris - Restaurant Reviews, Menu and Prices | TheFork",
            "og:description":
              "Make a booking at Riviera Fuga in Paris. Find diner reviews, menus, prices, and opening hours for Riviera Fuga on TheFork.",
            "next-head-count": "50",
            "fb:app_id": "224589267619751",
            "twitter:site": "TheFork",
            "msapplication-tap-highlight": "no",
            viewport: "width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no",
            "twitter:description":
              "Make a booking at Riviera Fuga in Paris. Find diner reviews, menus, prices, and opening hours for Riviera Fuga on TheFork.",
            "apple-mobile-web-app-capable": "yes",
            "og:url": "https://www.thefork.com/restaurant/riviera-fuga-r803102",
          },
        ],
        cse_image: [
          {
            src: "https://res.cloudinary.com/tf-lab/image/upload/w_520,h_520,c_fill,q_auto,f_auto/restaurant/aef99149-1805-41a2-8908-2792506e3ccf/14205e6d-b8f1-4912-ad71-3208f5e0b2fe.png",
          },
        ],
      },
    },
    {
      kind: "customsearch#result",
      title: "Riviera Fuga Restaurant - Paris, Ile-de-France | OpenTable",
      htmlTitle: "<b>Riviera Fuga</b> Restaurant - Paris, Ile-de-France | OpenTable",
      link: "https://www.opentable.com/r/riviera-fuga-paris",
      displayLink: "www.opentable.com",
      snippet:
        'Book now at Riviera Fuga in Paris, Ile-de-France. Explore menu, see photos and read 5 reviews: "As always, a top experience, and a very attractive value for ...',
      htmlSnippet:
        "Book now at <b>Riviera Fuga</b> in Paris, Ile-de-France. Explore menu, see photos and read 5 reviews: &quot;As always, a top experience, and a very attractive value for&nbsp;...",
      formattedUrl: "https://www.opentable.com/r/riviera-fuga-paris",
      htmlFormattedUrl: "https://www.opentable.com/r/<b>riviera</b>-<b>fuga</b>-paris",
      pagemap: {
        cse_thumbnail: [
          {
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG3UFqtpwta7Yu46u8tZV7K3ZfU-mznCBu1N7yKRdNVaRRpRB6VRuzMfA&s",
            width: "225",
            height: "225",
          },
        ],
        metatags: [
          {
            "place:location:longitude": "2.312379",
            "og:image": "https://images.otstatic.com/prod1/53870567/3/large.png",
            "og:image:width": "640",
            "twitter:card": "summary_large_image",
            "og:site_name": "OpenTable",
            "ot:seop": "1462376406",
            "business:contact_data:locality": "fr-FR",
            "place:location:latitude": "48.863142",
            "al:ios:url": "reservetable-com.contextoptional.OpenTable-1://?rid=331980&dt=2024-07-24T06%3A16%3A00&ps=2",
            "og:description": "Riviera Fuga, Casual Elegant Fusion / Eclectic cuisine. Read reviews and book now.",
            "twitter:creator": "@opentable",
            "al:ios:app_store_id": "296581815",
            "twitter:site": "@opentable",
            "business:contact_data:postal_code": "75007",
            "og:type": "website",
            "twitter:title": "Riviera Fuga - Paris, Ile-de-France on OpenTable",
            "business:contact_data:website": "https://riviera-fuga.com/",
            "al:ios:app_name": "OpenTable",
            "business:contact_data:region": "Champ de Mars",
            "business:contact_data:phone_number": "01 81 70 40 49",
            "og:title": "Riviera Fuga - Paris, Ile-de-France on OpenTable",
            "og:image:height": "640",
            "fb:pages": "123876194314735",
            "ot:page_type": "restaurants,restaurant-profile,network",
            "twitter:image:src": "https://images.otstatic.com/prod1/53870567/3/large.png",
            "fb:app_id": "123876194314735",
            viewport: "width=device-width, initial-scale=1",
            "twitter:description": "Riviera Fuga, Casual Elegant Fusion / Eclectic cuisine. Read reviews and book now.",
            "business:contact_data:country": "France",
            "business:contact_data:street_address": "10 Port des Invalides",
            "og:url": "https://www.opentable.com/r/riviera-fuga-paris",
          },
        ],
        cse_image: [
          {
            src: "https://images.otstatic.com/prod1/53870567/3/large.png",
          },
        ],
      },
    },
    {
      kind: "customsearch#result",
      title: "Riviera Fuga • Paris je t'aime - Tourist office",
      htmlTitle: "<b>Riviera Fuga</b> • Paris je t&#39;aime - Tourist office",
      link: "https://parisjetaime.com/eng/convention/restaurant/riviera-fuga-pc4385",
      displayLink: "parisjetaime.com",
      snippet:
        "Riviera Fuga ... Riviera Fuga is a barge moored under the Alexandre III Bridge offering Italian-Japanese fusion cuisine. It's a chance to take a shot of escape ...",
      htmlSnippet:
        "<b>Riviera Fuga</b> ... <b>Riviera Fuga</b> is a barge moored under the Alexandre III Bridge offering Italian-Japanese fusion cuisine. It&#39;s a chance to take a shot of escape&nbsp;...",
      formattedUrl: "https://parisjetaime.com/eng/convention/restaurant/riviera-fuga-pc4385",
      htmlFormattedUrl: "https://parisjetaime.com/eng/convention/restaurant/<b>riviera</b>-<b>fuga</b>-pc4385",
      pagemap: {
        cse_thumbnail: [
          {
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRhOQR7aS33el9UflGauIHt4wMI5rEwWEvvz15JwKO0IeRqEebM8CMTOo&s",
            width: "225",
            height: "225",
          },
        ],
        metatags: [
          {
            "og:image":
              "https://parisjetaime.com/data/layout_image/38770_Riviera-Fuga-restaurant-Iitalien-japonais-630x405-%C2%A9FugaFamily-4_square_1-1_xl.png?ver=1703590082",
            "og:type": "website",
            "og:site_name": "Paris je t'aime - Tourist office",
            viewport: "width=device-width, initial-scale=1",
            "apple-mobile-web-app-capable": "yes",
            "og:title": "Riviera Fuga",
            "mobile-web-app-capable": "yes",
            "og:locale": "en_US",
            "og:url": "https://parisjetaime.com/eng/convention/restaurant/riviera-fuga-pc4385",
            "og:updated_time": "1523541065",
            "format-detection": "telephone=no",
          },
        ],
        cse_image: [
          {
            src: "https://parisjetaime.com/data/layout_image/38770_Riviera-Fuga-restaurant-Iitalien-japonais-630x405-%C2%A9FugaFamily-4_square_1-1_xl.png?ver=1703590082",
          },
        ],
      },
    },
    {
      kind: "customsearch#result",
      title: "Monika Tarkowska-Carter | RIVIERA FUGA - A PERFECT PLACE ...",
      htmlTitle: "Monika Tarkowska-Carter | <b>RIVIERA FUGA</b> - A PERFECT PLACE ...",
      link: "https://www.instagram.com/p/C1AcMJRPF4P/",
      displayLink: "www.instagram.com",
      snippet:
        'Dec 18, 2023 ... 146 likes, 72 comments - travel.sophisticate on December 18, 2023: "RIVIERA FUGA - A PERFECT PLACE FOR YOUR PRE OR POST CRUISE DINNER ON THE ...',
      htmlSnippet:
        "Dec 18, 2023 <b>...</b> 146 likes, 72 comments - travel.sophisticate on December 18, 2023: &quot;<b>RIVIERA FUGA</b> - A PERFECT PLACE FOR YOUR PRE OR POST CRUISE DINNER ON THE&nbsp;...",
      formattedUrl: "https://www.instagram.com/p/C1AcMJRPF4P/",
      htmlFormattedUrl: "https://www.instagram.com/p/C1AcMJRPF4P/",
      pagemap: {
        metatags: [
          {
            "og:image":
              "https://scontent-lax3-2.cdninstagram.com/v/t51.29350-15/412061416_1279571449377415_6832711013958447155_n.jpg?stp=c288.0.864.864a_dst-jpg_s640x640&_nc_cat=111&ccb=1-7&_nc_sid=18de74&_nc_ohc=gvBvDH6v1pIQ7kNvgErmyr0&_nc_ht=scontent-lax3-2.cdninstagram.com&oh=00_AYBqIVFBZzOfkG-2htbnrgQZZsm3yjCm6FC9h2ZDglx2UQ&oe=669DC4D4",
            "theme-color": "#FFFFFF",
            "twitter:card": "summary_large_image",
            "og:site_name": "Instagram",
            "al:android:package": "com.instagram.android",
            bingbot: "noarchive",
            medium: "image",
            "al:ios:url": "instagram://media?id=3260730110105116175",
            "og:description":
              '146 likes, 72 comments - travel.sophisticate on December 18, 2023: "RIVIERA FUGA - A PERFECT PLACE FOR YOUR PRE OR POST CRUISE DINNER ON THE SEINE IN PARIS\n\nRiviera Fuga is a unique restaurant. Not only is it located right on the Seine, in front of the famous Grand Palais, and just a few steps away from Pont Alexandre III, the most beautiful bridge in Paris, but it is a floating barge restaurant that also rents 2 beautiful, private boats. One of them you saw in my previous post. \n\nDepending on the weather, you can enjoy its delicious dishes either inside or outside, with the view of the river and boats passing by. \n\nThe restaurant has a lovely nautical feel, with decor in blue and yellow stripes. The retro feel of the Riviera from the 70s comes to mind when you look around, with its gigantic custom designed carpet adding to the colorful look of the place. There’s a striking central bar, and the glass roof brings lots of light to enjoy the sunshine on sunny days. \n\nCombining the flavors of Italian and Japane',
            "twitter:image":
              "https://scontent-lax3-2.cdninstagram.com/v/t51.29350-15/412061416_1279571449377415_6832711013958447155_n.jpg?stp=c288.0.864.864a_dst-jpg_s640x640&_nc_cat=111&ccb=1-7&_nc_sid=18de74&_nc_ohc=gvBvDH6v1pIQ7kNvgErmyr0&_nc_ht=scontent-lax3-2.cdninstagram.com&oh=00_AYBqIVFBZzOfkG-2htbnrgQZZsm3yjCm6FC9h2ZDglx2UQ&oe=669DC4D4",
            "al:ios:app_store_id": "389801252",
            "twitter:site": "@instagram",
            "instapp:owner_user_id": "33006828474",
            "og:type": "article",
            "twitter:title": "Monika Tarkowska-Carter (@travel.sophisticate) • Instagram photos and videos",
            "al:ios:app_name": "Instagram",
            "og:title":
              'Monika Tarkowska-Carter on Instagram: "RIVIERA FUGA - A PERFECT PLACE FOR YOUR PRE OR POST CRUISE DINNER ON THE SEINE IN PARIS\n\nRiviera Fuga is a unique restaurant. Not only is it located right on the Seine, in front of the famous Grand Palais, and just a few steps away from Pont Alexandre III, the most beautiful bridge in Paris, but it is a floating barge restaurant that also rents 2 beautiful, private boats. One of them you saw in my previous post. \n\nDepending on the weather, you can enjoy its delicious dishes either inside or outside, with the view of the river and boats passing by. \n\nThe restaurant has a lovely nautical feel, with decor in blue and yellow stripes. The retro feel of the Riviera from the 70s comes to mind when you look around, with its gigantic custom designed carpet adding to the colorful look of the place. There’s a striking central bar, and the glass roof brings lots of light to enjoy the sunshine on sunny days. \n\nCombining the flavors of Italian and Japanese cuisines into a delightful',
            "twitter:maxage": "86400",
            "color-scheme": "light",
            "al:android:url": "https://www.instagram.com/p/C1AcMJRPF4P/",
            "fb:app_id": "124024574287414",
            "apple-mobile-web-app-status-bar-style": "default",
            viewport: "width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, viewport-fit=cover",
            "mobile-web-app-capable": "yes",
            "og:url": "https://www.instagram.com/p/C1AcMJRPF4P/",
            "al:android:app_name": "Instagram",
          },
        ],
        cse_image: [
          {
            src: "https://scontent-lax3-2.cdninstagram.com/v/t51.29350-15/412061416_1279571449377415_6832711013958447155_n.jpg?stp=c288.0.864.864a_dst-jpg_s640x640&_nc_cat=111&ccb=1-7&_nc_sid=18de74&_nc_ohc=gvBvDH6v1pIQ7kNvgErmyr0&_nc_ht=scontent-lax3-2.cdninstagram.com&oh=00_AYBqIVFBZzOfkG-2htbnrgQZZsm3yjCm6FC9h2ZDglx2UQ&oe=669DC4D4",
          },
        ],
      },
    },
    {
      kind: "customsearch#result",
      title: "Riviera Fuga",
      htmlTitle: "<b>Riviera Fuga</b>",
      link: "https://www.petitmadeleinehotel.com/blog/articles/riviera-fuga-49498",
      displayLink: "www.petitmadeleinehotel.com",
      snippet: "Oct 14, 2023 ... Riviera Fuga . A new Italian-Japanese restaurant on the Seine.",
      htmlSnippet: "Oct 14, 2023 <b>...</b> <b>Riviera Fuga</b> . A new Italian-Japanese restaurant on the Seine.",
      formattedUrl: "https://www.petitmadeleinehotel.com/blog/articles/riviera-fuga-49498",
      htmlFormattedUrl: "https://www.petitmadeleinehotel.com/blog/articles/<b>riviera</b>-<b>fuga</b>-49498",
      pagemap: {
        hcard: [
          {
            fn: "Le Petit Madeleine Hotel",
            photo:
              "https://d3dvd3b7ig5y49.cloudfront.net/cache/img/a230317392a1754788a25683ba6d6ce3afc3e2a3-a23031-200-100-auto.png?q=1538638081",
          },
        ],
        cse_thumbnail: [
          {
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF-mICL70fsRAu2-d3U4AXEIshhYa3RvdaZliHNGVAGbHerUwpFRRfVA&s",
            width: "280",
            height: "83",
          },
        ],
        metatags: [
          {
            "og:image": "https://www.petitmadeleinehotel.comcurrent_article.image|size(1200, 627,",
            "og:type": "article",
            "og:site_name": "Petit Madeleine",
            "geo.region": "FR-75",
            icbm: "48.873353, 2.317996",
            viewport: "width=device-width, initial-scale=1.0",
            "og:title": "Riviera Fuga",
            "og:url": "https://www.petitmadeleinehotel.com/blog",
            "geo.position": "48.873353;2.317996",
            "og:description": "Riviera Fuga . A new Italian-Japanese restaurant on the Seine",
            "geo.placename": "Paris",
            "format-detection": "telephone=no",
          },
        ],
        cse_image: [
          {
            src: "https://d3dvd3b7ig5y49.cloudfront.net/cache/img/d9c323af0fe8d2ef62edf1ee6dfd9003aa40c31d-d9c323-280-150-auto.png?q=1538638081",
          },
        ],
      },
    },
    {
      kind: "customsearch#result",
      title: "Riviera Fuga (@riviera_fuga) • Instagram photos and videos",
      htmlTitle: "<b>Riviera Fuga</b> (@riviera_fuga) • Instagram photos and videos",
      link: "https://www.instagram.com/riviera_fuga/?hl=en",
      displayLink: "www.instagram.com",
      snippet:
        '24K Followers, 191 Following, 211 Posts - Riviera Fuga (@riviera_fuga) on Instagram: "Une adresse de la @fuga_family Restaurant, bar sur la Seine - Paris ...',
      htmlSnippet:
        "24K Followers, 191 Following, 211 Posts - <b>Riviera Fuga</b> (@riviera_fuga) on Instagram: &quot;Une adresse de la @fuga_family Restaurant, bar sur la Seine - Paris&nbsp;...",
      formattedUrl: "https://www.instagram.com/riviera_fuga/?hl=en",
      htmlFormattedUrl: "https://www.instagram.com/<b>riviera</b>_<b>fuga</b>/?hl=en",
      pagemap: {
        xfn: [{}],
        metatags: [
          {
            "og:image":
              "https://scontent-atl3-1.cdninstagram.com/v/t51.2885-19/435474004_359537553083585_6223130707071833928_n.jpg?stp=dst-jpg_s100x100&_nc_cat=103&ccb=1-7&_nc_sid=3fd06f&_nc_ohc=_aKDSN80BsQQ7kNvgEui-26&_nc_ht=scontent-atl3-1.cdninstagram.com&oh=00_AYDlANd92gzWOnPLoeJxFqmjuZqXFa_UtRlaMUmAIMrTxQ&oe=66A51CD2",
            "theme-color": "#FFFFFF",
            "og:type": "profile",
            "al:ios:app_name": "Instagram",
            "og:title": "Riviera Fuga (@riviera_fuga) • Instagram photos and videos",
            "al:android:package": "com.instagram.android",
            bingbot: "noarchive",
            "al:ios:url": "instagram://user?username=riviera_fuga",
            "color-scheme": "light",
            "og:description":
              "24K Followers, 191 Following, 211 Posts - See Instagram photos and videos from Riviera Fuga (@riviera_fuga)",
            "al:ios:app_store_id": "389801252",
            "al:android:url": "https://instagram.com/_u/riviera_fuga/",
            "apple-mobile-web-app-status-bar-style": "default",
            viewport: "width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, viewport-fit=cover",
            "mobile-web-app-capable": "yes",
            "og:url": "https://www.instagram.com/riviera_fuga/",
            "al:android:app_name": "Instagram",
          },
        ],
        cse_image: [
          {
            src: "https://scontent-atl3-1.cdninstagram.com/v/t51.2885-19/435474004_359537553083585_6223130707071833928_n.jpg?stp=dst-jpg_s100x100&_nc_cat=103&ccb=1-7&_nc_sid=3fd06f&_nc_ohc=_aKDSN80BsQQ7kNvgEui-26&_nc_ht=scontent-atl3-1.cdninstagram.com&oh=00_AYDlANd92gzWOnPLoeJxFqmjuZqXFa_UtRlaMUmAIMrTxQ&oe=66A51CD2",
          },
        ],
      },
    },
    {
      kind: "customsearch#result",
      title: "Riviera Seine I Private cruises on the Seine",
      htmlTitle: "<b>Riviera</b> Seine I Private cruises on the Seine",
      link: "https://www.rivieraseine.com/en/home",
      displayLink: "www.rivieraseine.com",
      snippet:
        "Before or after your cruise, Riviera FUGA offers a dining experience, with a waterside table. Continue the journey by reserving your table! On the menu, is a ...",
      htmlSnippet:
        "Before or after your cruise, <b>Riviera FUGA</b> offers a dining experience, with a waterside table. Continue the journey by reserving your table! On the menu, is a&nbsp;...",
      formattedUrl: "https://www.rivieraseine.com/en/home",
      htmlFormattedUrl: "https://www.<b>riviera</b>seine.com/en/home",
      pagemap: {
        cse_thumbnail: [
          {
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcTXblZiN8aUeiLQPFGWseo4azNo1XckLXmyLPMflnJ75WFKb149XoYm0&s",
            width: "402",
            height: "125",
          },
        ],
        metatags: [
          {
            "og:image":
              "https://assets-global.website-files.com/6450e250b75b581447c93ad2/64627a33cd901d1026a68af6_Link%20Share%20Image%20—%20Webflow.png",
            "twitter:title": "Riviera Seine I Private cruises on the Seine",
            "og:type": "website",
            "twitter:card": "summary_large_image",
            viewport: "width=device-width, initial-scale=1",
            "twitter:description":
              "Embark with friends or family on the Seine in Paris! Our French-built 100% electric boats offer you outstanding comfort and sailing quality!",
            "og:title": "Riviera Seine I Private cruises on the Seine",
            "og:description":
              "Embark with friends or family on the Seine in Paris! Our French-built 100% electric boats offer you outstanding comfort and sailing quality!",
            "twitter:image":
              "https://assets-global.website-files.com/6450e250b75b581447c93ad2/64627a33cd901d1026a68af6_Link%20Share%20Image%20—%20Webflow.png",
            "facebook-domain-verification": "mlk59ybu44651lzcbhhxjfl8vfae8q",
          },
        ],
        cse_image: [
          {
            src: "https://assets-global.website-files.com/6450e250b75b581447c93ad2/64524924630f603a5b304e36_logo.svg",
          },
        ],
      },
    },
  ],
};

const exampleImage = {
  kind: "customsearch#search",
  url: {
    type: "application/json",
    template:
      "https://www.googleapis.com/customsearch/v1?q={searchTerms}&num={count?}&start={startIndex?}&lr={language?}&safe={safe?}&cx={cx?}&sort={sort?}&filter={filter?}&gl={gl?}&cr={cr?}&googlehost={googleHost?}&c2coff={disableCnTwTranslation?}&hq={hq?}&hl={hl?}&siteSearch={siteSearch?}&siteSearchFilter={siteSearchFilter?}&exactTerms={exactTerms?}&excludeTerms={excludeTerms?}&linkSite={linkSite?}&orTerms={orTerms?}&dateRestrict={dateRestrict?}&lowRange={lowRange?}&highRange={highRange?}&searchType={searchType}&fileType={fileType?}&rights={rights?}&imgSize={imgSize?}&imgType={imgType?}&imgColorType={imgColorType?}&imgDominantColor={imgDominantColor?}&alt=json",
  },
  queries: {
    request: [
      {
        title: "Google Custom Search - riviera fuga",
        totalResults: "29600000",
        searchTerms: "riviera fuga",
        count: 10,
        startIndex: 1,
        inputEncoding: "utf8",
        outputEncoding: "utf8",
        safe: "off",
        cx: "639a89b0e9e4343b0",
        searchType: "image",
      },
    ],
    nextPage: [
      {
        title: "Google Custom Search - riviera fuga",
        totalResults: "29600000",
        searchTerms: "riviera fuga",
        count: 10,
        startIndex: 11,
        inputEncoding: "utf8",
        outputEncoding: "utf8",
        safe: "off",
        cx: "639a89b0e9e4343b0",
        searchType: "image",
      },
    ],
  },
  context: {
    title: "GoToJo",
  },
  searchInformation: {
    searchTime: 0.203977,
    formattedSearchTime: "0.20",
    totalResults: "29600000",
    formattedTotalResults: "29,600,000",
  },
  items: [
    {
      kind: "customsearch#result",
      title: "Riviera Fuga, an Italian-Japanese restaurant floating on the Seine ...",
      htmlTitle: "<b>Riviera Fuga</b>, an Italian-Japanese restaurant floating on the Seine ...",
      link: "https://cdn.sortiraparis.com/images/80/102958/932275-riviera-fuga-peniche-restaurant-seine.jpg",
      displayLink: "www.sortiraparis.com",
      snippet: "Riviera Fuga, an Italian-Japanese restaurant floating on the Seine ...",
      htmlSnippet: "<b>Riviera Fuga</b>, an Italian-Japanese restaurant floating on the Seine ...",
      mime: "image/jpeg",
      fileFormat: "image/jpeg",
      image: {
        contextLink:
          "https://www.sortiraparis.com/en/where-to-eat-in-paris/restaurant/articles/296584-riviera-fuga-an-italian-japanese-restaurant-floating-on-the-seine-as-beautiful-as-it-is-delicious",
        height: 1200,
        width: 1600,
        byteSize: 964467,
        thumbnailLink:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIyC3Vi9gQvXY4xP5pYHq4Yby_U4zJD2OfRQYzNXLF3o8SFjna2IMAqDE&s",
        thumbnailHeight: 113,
        thumbnailWidth: 150,
      },
    },
    {
      kind: "customsearch#result",
      title: "RIVIERA FUGA, Paris - Menu, Prices, Restaurant Reviews ...",
      htmlTitle: "<b>RIVIERA FUGA</b>, Paris - Menu, Prices, Restaurant Reviews ...",
      link: "https://media-cdn.tripadvisor.com/media/photo-s/29/53/41/05/a-deux-pas-du-pont-alexandre.jpg",
      displayLink: "www.tripadvisor.com",
      snippet: "RIVIERA FUGA, Paris - Menu, Prices, Restaurant Reviews ...",
      htmlSnippet: "<b>RIVIERA FUGA</b>, Paris - Menu, Prices, Restaurant Reviews ...",
      mime: "image/jpeg",
      fileFormat: "image/jpeg",
      image: {
        contextLink:
          "https://www.tripadvisor.com/Restaurant_Review-g187147-d25579641-Reviews-Riviera_Fuga-Paris_Ile_de_France.html",
        height: 412,
        width: 550,
        byteSize: 43911,
        thumbnailLink:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStmCgqSQ9XQ5H-W9XWiwbfhMr106FYptryoUIs9p-ZlP1kKtI0-Y_tJw&s",
        thumbnailHeight: 100,
        thumbnailWidth: 133,
      },
    },
    {
      kind: "customsearch#result",
      title: "Riviera Fuga - Restaurant péniche à Paris",
      htmlTitle: "<b>Riviera Fuga</b> - Restaurant péniche à Paris",
      link: "https://cdn.prod.website-files.com/65cfd65e40a11657644709a5/65f420deabe6ff4d75f87193_Riviera%20barge.jpg",
      displayLink: "www.fugafamily.com",
      snippet: "Riviera Fuga - Restaurant péniche à Paris",
      htmlSnippet: "<b>Riviera Fuga</b> - Restaurant péniche à Paris",
      mime: "image/jpeg",
      fileFormat: "image/jpeg",
      image: {
        contextLink: "https://www.fugafamily.com/en/restaurants/riviera-fuga",
        height: 921,
        width: 630,
        byteSize: 702441,
        thumbnailLink:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaExcchNrGlFrD0-qVXnKARi-v0IiCCnnOqAm2aiOa396F6WWnrFfl2pQ&s",
        thumbnailHeight: 147,
        thumbnailWidth: 101,
      },
    },
    {
      kind: "customsearch#result",
      title: "Riviera Fuga in Paris - Restaurant Reviews, Menu and Prices | TheFork",
      htmlTitle: "<b>Riviera Fuga</b> in Paris - Restaurant Reviews, Menu and Prices | TheFork",
      link: "https://res.cloudinary.com/tf-lab/image/upload/restaurant/aef99149-1805-41a2-8908-2792506e3ccf/14205e6d-b8f1-4912-ad71-3208f5e0b2fe.png",
      displayLink: "www.thefork.com",
      snippet: "Riviera Fuga in Paris - Restaurant Reviews, Menu and Prices | TheFork",
      htmlSnippet: "<b>Riviera Fuga</b> in Paris - Restaurant Reviews, Menu and Prices | TheFork",
      mime: "image/png",
      fileFormat: "image/png",
      image: {
        contextLink: "https://www.thefork.com/restaurant/riviera-fuga-r803102",
        height: 1152,
        width: 2048,
        byteSize: 3867520,
        thumbnailLink:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6TxxCPaOvtAC1qR1DPy6RHXe0iMxxf8mf_sATxaXgHEUzltFd2H7UxnM&s",
        thumbnailHeight: 84,
        thumbnailWidth: 150,
      },
    },
    {
      kind: "customsearch#result",
      title: "Riviera Fuga, an Italian-Japanese restaurant floating on the Seine ...",
      htmlTitle: "<b>Riviera Fuga</b>, an Italian-Japanese restaurant floating on the Seine ...",
      link: "https://cdn.sortiraparis.com/images/80/102958/932293-riviera-fuga-decoration.jpg",
      displayLink: "www.sortiraparis.com",
      snippet: "Riviera Fuga, an Italian-Japanese restaurant floating on the Seine ...",
      htmlSnippet: "<b>Riviera Fuga</b>, an Italian-Japanese restaurant floating on the Seine ...",
      mime: "image/jpeg",
      fileFormat: "image/jpeg",
      image: {
        contextLink:
          "https://www.sortiraparis.com/en/where-to-eat-in-paris/restaurant/articles/296584-riviera-fuga-an-italian-japanese-restaurant-floating-on-the-seine-as-beautiful-as-it-is-delicious",
        height: 1200,
        width: 1557,
        byteSize: 1107111,
        thumbnailLink:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUWQRksPDMyXO9ckDLGGNCY13v285I0KiRtnywWJ-yFVKH3s0YegDyaw&s",
        thumbnailHeight: 116,
        thumbnailWidth: 150,
      },
    },
    {
      kind: "customsearch#result",
      title: "Riviera Fuga in Paris - Restaurant Reviews, Menu and Prices | TheFork",
      htmlTitle: "<b>Riviera Fuga</b> in Paris - Restaurant Reviews, Menu and Prices | TheFork",
      link: "https://res.cloudinary.com/tf-lab/image/upload/restaurant/aef99149-1805-41a2-8908-2792506e3ccf/4d6e9c49-a4dd-4da2-8e95-90d747ce3a33.jpg",
      displayLink: "www.thefork.com",
      snippet: "Riviera Fuga in Paris - Restaurant Reviews, Menu and Prices | TheFork",
      htmlSnippet: "<b>Riviera Fuga</b> in Paris - Restaurant Reviews, Menu and Prices | TheFork",
      mime: "image/jpeg",
      fileFormat: "image/jpeg",
      image: {
        contextLink: "https://www.thefork.com/restaurant/riviera-fuga-r803102",
        height: 1152,
        width: 2048,
        byteSize: 364191,
        thumbnailLink:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1Q6wCCi7L6lLy5bXScVFqef0ImBoUfKXlddJo4Lw_DAfVXN4_AvgDgQ&s",
        thumbnailHeight: 84,
        thumbnailWidth: 150,
      },
    },
    {
      kind: "customsearch#result",
      title: "Riviera Fuga élu plus beaux restaurants du monde par le Prix ...",
      htmlTitle: "<b>Riviera Fuga</b> élu plus beaux restaurants du monde par le Prix ...",
      link: "https://cdn.prod.website-files.com/65cfd65e40a11657644709a5/65f1824c64dc070a55562c37_Riviera%20Fuga%20-%20ambiance.jpg",
      displayLink: "www.fugafamily.com",
      snippet: "Riviera Fuga élu plus beaux restaurants du monde par le Prix ...",
      htmlSnippet: "<b>Riviera Fuga</b> élu plus beaux restaurants du monde par le Prix ...",
      mime: "image/jpeg",
      fileFormat: "image/jpeg",
      image: {
        contextLink: "https://www.fugafamily.com/en/blog-posts/riviera-fuga-prix-versailles-architecture",
        height: 829,
        width: 567,
        byteSize: 505632,
        thumbnailLink:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2r-_BSuncOxv7qS-p7w3vDlKLd-JbtLUPholk7sty3JMXdEQjRMh4Bc4&s",
        thumbnailHeight: 144,
        thumbnailWidth: 98,
      },
    },
    {
      kind: "customsearch#result",
      title: "Riviera Fuga, an Italian-Japanese restaurant floating on the Seine ...",
      htmlTitle: "<b>Riviera Fuga</b>, an Italian-Japanese restaurant floating on the Seine ...",
      link: "https://cdn.sortiraparis.com/images/80/102958/932278-riviera-fuga-decoration.jpg",
      displayLink: "www.sortiraparis.com",
      snippet: "Riviera Fuga, an Italian-Japanese restaurant floating on the Seine ...",
      htmlSnippet: "<b>Riviera Fuga</b>, an Italian-Japanese restaurant floating on the Seine ...",
      mime: "image/jpeg",
      fileFormat: "image/jpeg",
      image: {
        contextLink:
          "https://www.sortiraparis.com/en/where-to-eat-in-paris/restaurant/articles/296584-riviera-fuga-an-italian-japanese-restaurant-floating-on-the-seine-as-beautiful-as-it-is-delicious",
        height: 1200,
        width: 1600,
        byteSize: 1239123,
        thumbnailLink:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiC2u5BYx0PTzObhB3y9Wjb1MhVwam18WoqYNCHoPUJfqDb6gUkbSjX9U&s",
        thumbnailHeight: 113,
        thumbnailWidth: 150,
      },
    },
    {
      kind: "customsearch#result",
      title: "Riviera Fuga - Restaurant péniche à Paris",
      htmlTitle: "<b>Riviera Fuga</b> - Restaurant péniche à Paris",
      link: "https://cdn.prod.website-files.com/65cfd65e40a11657644709a5/65f2d4c429c469c9f54d7767_event%20kway.jpg",
      displayLink: "www.fugafamily.com",
      snippet: "Riviera Fuga - Restaurant péniche à Paris",
      htmlSnippet: "<b>Riviera Fuga</b> - Restaurant péniche à Paris",
      mime: "image/jpeg",
      fileFormat: "image/jpeg",
      image: {
        contextLink: "https://www.fugafamily.com/en/restaurants/riviera-fuga",
        height: 921,
        width: 630,
        byteSize: 609547,
        thumbnailLink:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSAzBkdUl0jaZJqDhZhmeoSacRGwVcHjUkVzlXzLcX4wjTHzcxhsg8IA&s",
        thumbnailHeight: 147,
        thumbnailWidth: 101,
      },
    },
    {
      kind: "customsearch#result",
      title: "Riviera Fuga, an Italian-Japanese restaurant floating on the Seine ...",
      htmlTitle: "<b>Riviera Fuga</b>, an Italian-Japanese restaurant floating on the Seine ...",
      link: "https://cdn.sortiraparis.com/images/80/102958/932314-riviera-fuga-peniche-restaurant-seine.jpg",
      displayLink: "www.sortiraparis.com",
      snippet: "Riviera Fuga, an Italian-Japanese restaurant floating on the Seine ...",
      htmlSnippet: "<b>Riviera Fuga</b>, an Italian-Japanese restaurant floating on the Seine ...",
      mime: "image/jpeg",
      fileFormat: "image/jpeg",
      image: {
        contextLink:
          "https://www.sortiraparis.com/en/where-to-eat-in-paris/restaurant/articles/296584-riviera-fuga-an-italian-japanese-restaurant-floating-on-the-seine-as-beautiful-as-it-is-delicious",
        height: 1200,
        width: 1600,
        byteSize: 913389,
        thumbnailLink:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBnmyZf7Ldqd1N8HeAfJjg915-_CGaUhbobO65aAoWLvRMzb8GIuGLSYQ&s",
        thumbnailHeight: 113,
        thumbnailWidth: 150,
      },
    },
  ],
};
