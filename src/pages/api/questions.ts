import { getQuestionsByUserId } from "@/services/questions";
import { getUserIdByUsername } from "@/services/users";
import getMappedSBQuestions from "@/utils/get-mapped-sb-questions";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { type NextApiRequest, type NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(400).json({
      error: {
        status: 400,
        message: "Only 'GET' requests are allowed.",
      },
    });
  }

  const username = req.query.username as string;

  if (!username) {
    return res.status(401).json({
      error: {
        status: 401,
        message: "'username' is a required param.",
      },
    });
  }

  const supabaseClient = createPagesServerClient({ req, res });
  const id = await getUserIdByUsername(username, supabaseClient);

  if (!id) {
    return res.status(500).json({
      error: {
        status: 500,
        message: "Internal error, please try again.",
      },
    });
  }

  const sbQuestions = await getQuestionsByUserId(id, supabaseClient);
  const questions = getMappedSBQuestions(sbQuestions);

  return res.status(200).json({
    questions,
  });
}

export default handler;
