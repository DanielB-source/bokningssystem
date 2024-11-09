import { z } from "zod";

const schema = z.object({
  name: z.string(),
  capacity: z.number().int(),
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  bookedBy: z.string().optional(),
});

export default schema;
