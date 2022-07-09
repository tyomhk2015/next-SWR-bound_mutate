import { NextApiRequest, NextApiResponse } from "next";

export default function likeHandler(req: NextApiRequest, res: NextApiResponse) {
  res.json({
    ok: true
  });
}
