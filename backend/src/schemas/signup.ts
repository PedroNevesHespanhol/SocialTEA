import { z } from "zod";

export const signupSchema = z.object({
    name: z.string({message: 'Nome é obrigatório!'}).min(2, 'Precisa ter 2 ou mais caracteres!'),
    email: z.string({message: 'E-mail é obrigatório!'}).email('E-mail inválido!'),
    password: z.string({message: 'Senha é obrigatória!'}).min(8, 'Precisa ter 8 ou mais caracteres!')
})