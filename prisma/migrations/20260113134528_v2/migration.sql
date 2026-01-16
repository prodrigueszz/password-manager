/*
  Warnings:

  - You are about to drop the column `password` on the `Secret` table. All the data in the column will be lost.
  - Added the required column `auth_tag` to the `Secret` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ciphertext` to the `Secret` table without a default value. This is not possible if the table is not empty.
  - Added the required column `iv` to the `Secret` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Secret` table without a default value. This is not possible if the table is not empty.
  - Added the required column `master_key_salt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Secret" DROP COLUMN "password",
ADD COLUMN     "auth_tag" TEXT NOT NULL,
ADD COLUMN     "ciphertext" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "iv" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "master_key_salt" TEXT NOT NULL;
