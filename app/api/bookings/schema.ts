import { z } from "zod";

const schema = z.object({
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  bookedBy: z.string(),
  roomId: z.number().int(),
});

export default schema;
