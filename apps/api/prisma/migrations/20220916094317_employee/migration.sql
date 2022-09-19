-- CreateTable
CREATE TABLE `EmployeeRole` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `value` ENUM('ADMIN', 'USER', 'SOFTWARE_ENGINEER', 'PROJECT_MANAGER', 'SOLUTION_ARCHITECT', 'SOLUTION_ENGINEER', 'LEAD_ENGINEER', 'DELIVERY_MANAGER') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Employee` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `company` VARCHAR(191) NOT NULL,
    `project` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_EmployeeToEmployeeRole` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_EmployeeToEmployeeRole_AB_unique`(`A`, `B`),
    INDEX `_EmployeeToEmployeeRole_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_EmployeeToEmployeeRole` ADD FOREIGN KEY (`A`) REFERENCES `Employee`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EmployeeToEmployeeRole` ADD FOREIGN KEY (`B`) REFERENCES `EmployeeRole`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
