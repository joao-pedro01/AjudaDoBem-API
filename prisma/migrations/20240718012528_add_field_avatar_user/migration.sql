/*
  Warnings:

  - Added the required column `avatar_user` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `avatar_user` VARCHAR(191) NOT NULL;
