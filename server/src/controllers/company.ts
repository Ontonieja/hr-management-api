import { createCompanyService } from "../services/companyService";
import tryCatch from "../utils/tryCatch";

export const createCompany = tryCatch(createCompanyService);
