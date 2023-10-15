import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, Url } from "@prisma/client";

const prisma = new PrismaClient();

export default async ({ method, body }: NextApiRequest, response: NextApiResponse) => {
  const { original } = body;
  let url: Url | null;
  if (method === 'POST') {
    url = await prisma.url.findFirst({
      where: { original }
    })

    if (!url) {
      const slug = Math.random().toString().substring(2, 6);
      url = await prisma.url.create({
        data: {
          original,
          slug
        }
      });
    }

    response.json(url);
  }
};