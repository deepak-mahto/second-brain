import { z } from "zod";

const signinBodySchema = z.object({
  username: z.string(),
  password: z.string(),
});

export default signinBodySchema;
