import { z } from "zod";

const environmentSchema = z.object({
  backendURI: z.string(),
});

const validate = (data: z.infer<typeof environmentSchema>) => {
  return environmentSchema.parse(data);
};

export const environment = validate({
  backendURI: import.meta.env.VITE_BACKEND_URI,
});
