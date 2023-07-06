import type { NextApiRequest, NextApiResponse } from "next";
import { Generator, checkUrl, CreateItem } from "@/lib/index";

type RequestData = {
  url?: string;
};

const isUrl = (str: string): boolean => {
  const urlPattern =
    /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(:\d{2,5})?(\/\S*)?$/i;
  return urlPattern.test(str);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method !== "POST") {
    return res.status(405).json({
      message: "Method not allowed",
    });
  }

  const { url }: RequestData = req.query;

  if (!url) {
    return res.status(400).json({
      message: "Parameters missing",
    });
  }

  //   const { url }: RequestData = req.body;
  const host = req.headers.host;
  const { shortCode, shortUrl } = Generator(host!);

  if (!isUrl(url)) {
    return res.status(400).json({
      message: "Invalid Url",
    });
  }

  const { result, error } = await checkUrl(url);
  if (error) {
    return res.status(500).json({ message: error });
  }

  if (result?.length === 0) {
    const { info, error } = await CreateItem(url, shortUrl, shortCode);
    if (error) {
      return res.status(500).json({ error });
    }
    return res.status(200).json({
      message: "Created Item",
      ...info,
    });
  }

  // OtherWise return the old one
  return res.status(200).json({
    message: "Item already exists",
    ...(result && result[0]),
  });
}
