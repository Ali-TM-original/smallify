// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getRedirectUrl } from "@/lib/index";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method !== "GET") {
    return res.status(400).json({
      message: "Only GET request are allowed!",
    });
  }

  const { code } = req.query;

  if (typeof code == "string") {
    console.log(code);

    const { result, error } = await getRedirectUrl(code);
    if (error) {
      return res.status(500).json({
        message: error,
      });
    }
    if (!result) {
      return res.status(400).json({
        message: "could not find url",
      });
    }

    return res.redirect(result.original);
  }
  return res.status(400).json({
    message: "Could not find url",
  });
}
