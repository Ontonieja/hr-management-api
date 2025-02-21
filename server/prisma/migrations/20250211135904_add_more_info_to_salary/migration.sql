/*
  Warnings:

  - Added the required column `bonuses` to the `Salary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deductions` to the `Salary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Salary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPaid` to the `Salary` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PayrollStatus" AS ENUM ('NEEDSETUP', 'COMPLETED');

-- AlterTable
ALTER TABLE "Salary" ADD COLUMN     "bonuses" INTEGER NOT NULL,
ADD COLUMN     "deductions" INTEGER NOT NULL,
ADD COLUMN     "status" "PayrollStatus" NOT NULL,
ADD COLUMN     "totalPaid" INTEGER NOT NULL;
