import { z } from "zod";

export const kontaktSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  telefon: z.string().min(5).max(40).optional().or(z.literal("")),
  nachricht: z.string().min(10).max(5000),
  dsgvo: z.literal(true),
  // honeypot — muss leer bleiben
  website: z.string().max(0).optional().or(z.literal("")),
});

export type KontaktInput = z.infer<typeof kontaktSchema>;

export const suchprofilSchema = z.object({
  absicht: z.enum(["kauf", "miete"]),
  art: z.enum([
    "villa",
    "mehrfamilienhaus",
    "einfamilienhaus",
    "wohnung",
    "apartment",
    "sonstiges",
  ]),
  orte: z.string().min(2).max(500),
  wohnflaeche: z.coerce.number().int().min(10).max(10000).optional(),
  grundstueck: z.coerce.number().int().min(0).max(100000).optional(),
  limit: z.coerce.number().int().min(50000).max(50000000).optional(),
  ausstattung: z.array(z.string()).optional(),
  wuensche: z.string().max(5000).optional(),
  lage: z.array(z.string()).optional(),
  name: z.string().min(2).max(100),
  email: z.string().email(),
  telefon: z.string().min(5).max(40),
  dsgvo: z.literal(true),
  // honeypot — muss leer bleiben
  website: z.string().max(0).optional().or(z.literal("")),
});

export type SuchprofilInput = z.infer<typeof suchprofilSchema>;
