import { z } from "zod";

const signupBodySchema = z.object({
  username: z.string().min(3),
  password: z.string().min(8),
});

export default signupBodySchema;
