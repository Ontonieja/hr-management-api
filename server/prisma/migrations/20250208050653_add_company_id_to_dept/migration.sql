-- AlterTable
ALTER TABLE "Department" ADD COLUMN     "companyId" INTEGER;

-- AlterTable
ALTER TABLE "Employee" ALTER COLUMN "status" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "Department" ADD CONSTRAINT "Department_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
