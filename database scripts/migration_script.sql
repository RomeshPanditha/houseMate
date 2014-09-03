-- ----------------------------------------------------------------------------
-- MySQL Workbench Migration
-- Migrated Schemata: housemate
-- Source Schemata: housemate
-- Created: Wed Aug 27 09:55:03 2014
-- ----------------------------------------------------------------------------

SET FOREIGN_KEY_CHECKS = 0;;

-- ----------------------------------------------------------------------------
-- Schema housemate
-- ----------------------------------------------------------------------------
DROP SCHEMA IF EXISTS `housemate` ;
CREATE SCHEMA IF NOT EXISTS `housemate` ;

-- ----------------------------------------------------------------------------
-- Table housemate.chore_allocation
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `housemate`.`chore_allocation` (
  `PK_allocationID` INT(11) NOT NULL DEFAULT '1',
  `FK_choreID` INT(11) NOT NULL,
  `FK_tenantID` INT(11) NOT NULL,
  `dayOfWeek` VARCHAR(10) NULL DEFAULT NULL,
  `cycle` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`PK_allocationID`),
  INDEX `allocation_to_chore_idx` (`FK_choreID` ASC),
  INDEX `allocation_to_tenant_idx` (`FK_tenantID` ASC),
  CONSTRAINT `allocation_to_chore`
    FOREIGN KEY (`FK_choreID`)
    REFERENCES `housemate`.`chores` (`PK_choreID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `allocation_to_tenant`
    FOREIGN KEY (`FK_tenantID`)
    REFERENCES `housemate`.`tenant` (`PK_tenantID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- ----------------------------------------------------------------------------
-- Table housemate.chores
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `housemate`.`chores` (
  `PK_choreID` INT(11) NOT NULL DEFAULT '1',
  `FK_houseID` INT(11) NULL DEFAULT NULL,
  `choreName` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`PK_choreID`),
  INDEX `chore_to_house_idx` (`FK_houseID` ASC),
  CONSTRAINT `chore_to_house`
    FOREIGN KEY (`FK_houseID`)
    REFERENCES `housemate`.`house` (`PK_houseID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- ----------------------------------------------------------------------------
-- Table housemate.tenant
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `housemate`.`tenant` (
  `PK_tenantID` INT(11) NOT NULL DEFAULT '1',
  `FK_houseID` INT(11) NOT NULL,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `email` VARCHAR(45) NULL DEFAULT NULL,
  `username` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`PK_tenantID`),
  INDEX `FK_houseID_idx` (`FK_houseID` ASC),
  CONSTRAINT `tenant_constraint`
    FOREIGN KEY (`FK_houseID`)
    REFERENCES `housemate`.`house` (`PK_houseID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- ----------------------------------------------------------------------------
-- Table housemate.house
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `housemate`.`house` (
  `PK_houseID` INT(11) NOT NULL DEFAULT '1',
  `houseName` VARCHAR(45) NOT NULL,
  `address` VARCHAR(45) NULL DEFAULT NULL,
  `city` VARCHAR(45) NULL DEFAULT NULL,
  `postcode` INT(11) NULL DEFAULT NULL,
  `state` VARCHAR(20) NULL DEFAULT NULL,
  PRIMARY KEY (`PK_houseID`),
  UNIQUE INDEX `houseName_UNIQUE` (`houseName` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- ----------------------------------------------------------------------------
-- Table housemate.house_bill
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `housemate`.`house_bill` (
  `PK_houseBillID` INT(11) NOT NULL DEFAULT '1',
  `FK_houseID` INT(11) NOT NULL,
  `billType` VARCHAR(45) NOT NULL,
  `amount` DOUBLE NOT NULL,
  `dueDate` DATE NOT NULL,
  PRIMARY KEY (`PK_houseBillID`),
  INDEX `FK_houseID_idx` (`FK_houseID` ASC),
  CONSTRAINT `bill_constraint`
    FOREIGN KEY (`FK_houseID`)
    REFERENCES `housemate`.`house` (`PK_houseID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- ----------------------------------------------------------------------------
-- Table housemate.individual_bills
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `housemate`.`individual_bills` (
  `PK_indivBillID` INT(11) NOT NULL DEFAULT '1',
  `FK_houseBillID` INT(11) NOT NULL,
  `FK_tenantID` INT(11) NOT NULL,
  `splitAmount` DOUBLE NULL DEFAULT NULL,
  `datePaid` DATE NULL DEFAULT NULL,
  `dueDate` DATE NULL DEFAULT NULL,
  `billType` VARCHAR(45) NULL DEFAULT NULL,
  `recurring?` BINARY(1) NULL DEFAULT NULL,
  PRIMARY KEY (`PK_indivBillID`),
  INDEX `individual_bill_constraint_idx` (`FK_houseBillID` ASC),
  INDEX `individual_tenant_constraint_idx` (`FK_tenantID` ASC),
  CONSTRAINT `individual_bill_constraint`
    FOREIGN KEY (`FK_houseBillID`)
    REFERENCES `housemate`.`house_bill` (`PK_houseBillID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `individual_tenant_constraint`
    FOREIGN KEY (`FK_tenantID`)
    REFERENCES `housemate`.`tenant` (`PK_tenantID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- ----------------------------------------------------------------------------
-- Table housemate.item
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `housemate`.`item` (
  `PK_itemID` INT(11) NOT NULL DEFAULT '1',
  `FK_listID` INT(11) NOT NULL,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `description` VARCHAR(100) NULL DEFAULT NULL,
  `category` VARCHAR(25) NULL DEFAULT NULL,
  `bought?` BINARY(1) NULL DEFAULT NULL,
  `store?` BINARY(1) NULL DEFAULT NULL,
  PRIMARY KEY (`PK_itemID`),
  INDEX `item_to_list_idx` (`FK_listID` ASC),
  CONSTRAINT `item_to_list`
    FOREIGN KEY (`FK_listID`)
    REFERENCES `housemate`.`list` (`PK_listID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- ----------------------------------------------------------------------------
-- Table housemate.list
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `housemate`.`list` (
  `PK_listID` INT(11) NOT NULL DEFAULT '1',
  `FK_houseID` INT(11) NOT NULL,
  PRIMARY KEY (`PK_listID`),
  INDEX `list_to_house_idx` (`FK_houseID` ASC),
  CONSTRAINT `list_to_house`
    FOREIGN KEY (`FK_houseID`)
    REFERENCES `housemate`.`house` (`PK_houseID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- ----------------------------------------------------------------------------
-- Table housemate.list_records
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `housemate`.`list_records` (
  `PK_recordID` INT(11) NOT NULL AUTO_INCREMENT,
  `FK_itemID` INT(11) NOT NULL,
  `FK_tenantID` INT(11) NOT NULL,
  `dateBought` DATE NOT NULL,
  PRIMARY KEY (`PK_recordID`),
  INDEX `item_to_record_idx` (`FK_itemID` ASC),
  INDEX `tenant_to_record_idx` (`FK_tenantID` ASC),
  CONSTRAINT `item_to_record`
    FOREIGN KEY (`FK_itemID`)
    REFERENCES `housemate`.`item` (`PK_itemID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `tenant_to_record`
    FOREIGN KEY (`FK_tenantID`)
    REFERENCES `housemate`.`tenant` (`PK_tenantID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- ----------------------------------------------------------------------------
-- Table housemate.notice
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `housemate`.`notice` (
  `PK_noticeID` INT(11) NOT NULL DEFAULT '1',
  `FK_noticeBoardID` INT(11) NOT NULL,
  `FK_tenantID` INT(11) NOT NULL,
  `title` VARCHAR(45) NOT NULL,
  `message` VARCHAR(200) NOT NULL,
  `datePosted` DATETIME NOT NULL,
  `type` VARCHAR(15) NOT NULL,
  PRIMARY KEY (`PK_noticeID`),
  INDEX `notice_constraint_idx` (`FK_noticeBoardID` ASC),
  INDEX `tenant-notice_constraint_idx` (`FK_tenantID` ASC),
  CONSTRAINT `notice_constraint`
    FOREIGN KEY (`FK_noticeBoardID`)
    REFERENCES `housemate`.`notice_board` (`PK_noticeBoardID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `tenant-notice_constraint`
    FOREIGN KEY (`FK_tenantID`)
    REFERENCES `housemate`.`tenant` (`PK_tenantID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- ----------------------------------------------------------------------------
-- Table housemate.notice_board
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `housemate`.`notice_board` (
  `PK_noticeBoardID` INT(11) NOT NULL DEFAULT '1',
  `FK_houseID` INT(11) NOT NULL,
  PRIMARY KEY (`PK_noticeBoardID`),
  INDEX `noticeboard_constraint_idx` (`FK_houseID` ASC),
  CONSTRAINT `noticeboard_constraint`
    FOREIGN KEY (`FK_houseID`)
    REFERENCES `housemate`.`house` (`PK_houseID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;
SET FOREIGN_KEY_CHECKS = 1;;
