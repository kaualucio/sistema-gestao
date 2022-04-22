/*
  Warnings:

  - You are about to alter the column `userPlan` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Enum("users_userPlan")`.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `userPlan` ENUM('BRONZE', 'PRATA', 'OURO') NOT NULL DEFAULT 'BRONZE';
