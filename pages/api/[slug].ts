import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, Url } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query;
  if (typeof slug === 'string') {
    const url: Url | null = await prisma.url.findUnique({
      where: { slug }
    })
    if (url) res.redirect(url.original);
  }
  res.redirect(`http://localhost:3000/404`);
};
