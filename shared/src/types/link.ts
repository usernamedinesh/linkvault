import  { z } from "zod";

//Link Schema
export const LinkSchema = z.object ({
    url: z.string(),
    title: z.string(),
    tags: z.string(),
})

export type Link = z.infer<typeof LinkSchema>; 
