/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `User`;

-- CreateTable
CREATE TABLE `user` (
    `id_user` INTEGER NOT NULL AUTO_INCREMENT,
    `id_address_user` INTEGER NOT NULL,
    `name_user` VARCHAR(191) NOT NULL,
    `email_user` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `birth_date_user` DATETIME(3) NOT NULL,
    `phone_user` INTEGER NOT NULL,
    `created_at_user` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at_user` DATETIME(3) NOT NULL,

    UNIQUE INDEX `user_email_user_key`(`email_user`),
    UNIQUE INDEX `user_cpf_key`(`cpf`),
    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_address` (
    `id_user_address` INTEGER NOT NULL,
    `id_user` INTEGER NOT NULL,
    `id_address` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_user`, `id_address`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `address` (
    `id_address` INTEGER NOT NULL AUTO_INCREMENT,
    `zip_code_address` INTEGER NOT NULL,
    `street_address` VARCHAR(191) NOT NULL,
    `complement_address` VARCHAR(191) NOT NULL,
    `neighborhood_address` VARCHAR(191) NOT NULL,
    `city_address` VARCHAR(191) NOT NULL,
    `state_address` VARCHAR(2) NOT NULL,
    `created_at_address` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at_address` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_address`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_address` ADD CONSTRAINT `user_address_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `user`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_address` ADD CONSTRAINT `user_address_id_address_fkey` FOREIGN KEY (`id_address`) REFERENCES `address`(`id_address`) ON DELETE RESTRICT ON UPDATE CASCADE;
