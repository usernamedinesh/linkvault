import  { z } from "zod";

//Link Schema
export const LinkSchema = z.object ({
    // id: z.string(),
    url: z.string().url(),
    title: z.string(),
    tags: z.array(z.string()),
})

export type Link = z.infer<typeof LinkSchema>; 
