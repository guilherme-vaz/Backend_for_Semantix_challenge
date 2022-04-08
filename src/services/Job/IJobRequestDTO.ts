// import User from "src/models/User";

export interface IUser {
    id: string
    createdAt: string
    fullName: string
    email: string
    cellphone: string
    password: string
}

export type status = "Ativo" | "Inativo";

export type recurrence = "Intervalo" | "Horário fixo";