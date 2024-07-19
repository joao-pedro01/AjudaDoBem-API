/*
  Warnings:

  - You are about to drop the column `cpf` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cpf_user]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cpf_user` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `complement_user_address` to the `user_address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number_user_address` to the `user_address` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `user_cpf_key` ON `user`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `cpf`,
    ADD COLUMN `cpf_user` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user_address` ADD COLUMN `complement_user_address` VARCHAR(191) NOT NULL,
    ADD COLUMN `number_user_address` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `user_cpf_user_key` ON `user`(`cpf_user`);
