import type {NextApiRequest, NextApiResponse} from "next";

type HealthResponse = {message: string};

// can be hit at /api/health to confirm app is running
export default function handler(req: NextApiRequest, res: NextApiResponse<HealthResponse>) {
    return res.status(200).json({message: "success"});
}
