import { z } from "zod";

const contentSchema = z.object({
  link: z.string(),
  type: z.string(),
  title: z.string(),
});

export default contentSchema;
