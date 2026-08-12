import { AccountRepository } from "../repositories/account.repository";
import { ProjectRepository } from "../repositories/project.repository";
import { TransactionRepository } from "../repositories/transaction.repository";
import { UserRepository } from "../repositories/user.repository";
import { AccountService } from "../services/account.service";
import { ProjectService } from "../services/project.service";
import { TransactionService } from "../services/transaction.service";
import { UserService } from "../services/user.service";

const accountRepository = new AccountRepository()
export const accountService = new AccountService(accountRepository)

const transactionRepository = new TransactionRepository()
export const transactionService = new TransactionService(transactionRepository)

const projectRepository = new ProjectRepository()
export const projectService = new ProjectService(projectRepository)

const userRepository = new UserRepository()
export const userService = new UserService(userRepository)