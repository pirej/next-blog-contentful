const dotenv = require("dotenv");
const fetch = require("node-fetch");
const algoliasearch = require("algoliasearch/lite");
const richTextPlainTextRenderer = require("@contentful/rich-text-plain-text-renderer");

async function callContentful(query) {
  try {
    const data = await fetch(
      `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      }
    ).then(response => response.json());
    return data;
  } catch (error) {
    throw new Error("Could not fetch data from Contentful!");
  }
}

async function getPosts() {
  const query = `{
    webdevCollection {
        items {
          title
          slug
          requirements
          sys {
            id
            firstPublishedAt
            publishedAt
          }
          featuredImage {
            title
            contentType
            fileName
            size
            url
            width
            height
          }
          thumbnail {
            title
            contentType
            fileName
            size
            url
            width
            height
          }
          content {
            json
        }
      }
    }
  }`;

  const response = await callContentful(query);
  const posts = response.data.webdevCollection.items
    ? response.data.webdevCollection.items
    : [];
  return posts;
}

///-------------------

function transformPostsToSearchObjects(posts) {
  const transformed = posts.map(post => {
    return {
      objectID: post.sys.id,
      title: post.title,
      requirements: post.requirements,
      slug: post.slug,
      featuredImage: post.featuredImage,
      thumbnail: post.thumbnail,
      firstPublishedAt: post.sys.firstPublishedAt,
      publishedAt: post.sys.publishedAt,
      content: richTextPlainTextRenderer.documentToPlainTextString(
        post.content.json
      ),
    };
  });

  return transformed;
}
///-------------------

(async function () {
  dotenv.config();

  try {
    const posts = await getPosts();
    const transformedPosts = transformPostsToSearchObjects(posts);

    if (posts.length > 0) {
      const client = algoliasearch(
        process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
        process.env.ALGOLIA_SEARCH_ADMIN_KEY
      );

      const index = client.initIndex("first-next-contentful-blog");
      const algoliaResponse = await index.saveObjects(transformedPosts);

      console.log(
        `Sucessfully added ${
          algoliaResponse.objectIDs.length
        } records to Algolia search. Object IDs:\n${algoliaResponse.objectIDs.join(
          "\n"
        )}`
      );
    }
  } catch (error) {
    console.log(error);
  }
})();
