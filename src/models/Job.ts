import { v4 as uuidv4 } from "uuid";
import User from "./User";

type status = "Ativo" | "Inativo";

type recurrence = "Intervalo" | "Horário fixo";

class Job {
  public readonly id?: string;

  public readonly createdAt: string;

  public jobName: string;

  public user: User;

  public statusCode: status;

  public recurrence: recurrence;

  constructor(
    jobName: string,
    user: User,
    statusCode: status,
    recurrence: recurrence
  ) {
    this.id = uuidv4();
    this.createdAt = new Date().toISOString();
    this.jobName = jobName;
    this.user = user;
    this.statusCode = statusCode;
    this.recurrence = recurrence;
  }
}

export default Job;
