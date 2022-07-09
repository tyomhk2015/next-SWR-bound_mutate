import { NextApiRequest, NextApiResponse } from "next";

export default function videoHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.json({
    ok: true
  });
}
