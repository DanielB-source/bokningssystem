import { z } from "zod";

const schema = z.object({
  name: z.string(),
  capacity: z.number().int(),
});

export default schema;
