import JobRepository from "src/repositories/JobRepository";
import Job from "src/models/Job";
import { IUser, recurrence, status } from "./IJobRequestDTO";

export default class JobService {
  jobRepository: JobRepository;

  constructor(jobRepository: JobRepository = new JobRepository()) {
    this.jobRepository = jobRepository;
  }

  async getAllJobs(): Promise<Job[]> {
    return this.jobRepository.getAllJobs();
  }

  async createJob(
    jobName: string,
    user: IUser,
    status: status,
    recurrenceValue: number,
    recurrence: recurrence
  ): Promise<Job> {
    const newJob = new Job(jobName, user, status, recurrenceValue, recurrence);

    return await this.jobRepository.createJob(newJob);
  }

  async updateJob(partialJob: Partial<Job>) {
    return await this.jobRepository.updateJob(partialJob);
  }

  async deleteJobById(id: string) {
    return await this.jobRepository.deleteJobById(id);
  }
}
