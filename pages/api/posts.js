// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createClient } from "contentful";

export default async function handler(req, res) {
  const { pageIndex = 1, limit = 6 } = req.query;
  const data = await client.getEntries({
    content_type: "webdev",
    skip: pageIndex * limit,
    // order: "-sys.createdAt",
    order: "-sys.updatedAt",
    // order: "-fields.publishDate",
    limit,
  });

  res.json(data);
}

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});
