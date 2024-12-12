/*
  Warnings:

  - The values [HR_MANAGER] on the enum `EmployeeRole` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `category` on the `Company` table. All the data in the column will be lost.
  - Added the required column `companyType` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CompanyType" AS ENUM ('TECHNOLOGY', 'FINANCE', 'HEALTHCARE', 'EDUCATION', 'OTHER', 'MANUFACTURING', 'RETAIL', 'E_COMMERCE', 'CONSTRUCTION', 'TRANSPORTATION', 'HOSPITALITY', 'ENTERTAINMENT', 'ENERGY', 'LEGAL', 'GOVERNMENT', 'REAL_ESTATE', 'SPORTS', 'AGRICULTURE', 'MEDIA', 'NON_PROFIT');

-- AlterEnum
BEGIN;
CREATE TYPE "EmployeeRole_new" AS ENUM ('ADMIN', 'MANAGER', 'EMPLOYEE');
ALTER TABLE "User" ALTER COLUMN "role" TYPE "EmployeeRole_new" USING ("role"::text::"EmployeeRole_new");
ALTER TYPE "EmployeeRole" RENAME TO "EmployeeRole_old";
ALTER TYPE "EmployeeRole_new" RENAME TO "EmployeeRole";
DROP TYPE "EmployeeRole_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_companyId_fkey";

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "category",
ADD COLUMN     "companyType" "CompanyType" NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "companyId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
