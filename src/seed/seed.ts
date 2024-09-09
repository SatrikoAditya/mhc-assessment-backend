import mongoose, { Types } from "mongoose";
import connectDB from "@src/config/db";
import { generateHashPassword } from "@src/plugins/bcrypt/bcrypt";

import User from "@src/models/user.model";
import Company from "@src/models/company.model";
import Event from "@src/models/event.model";
import Vendor from "@src/models/vendor.model";

import { logger } from "@src/plugins/logger";

import { ICompanyWithId } from "@src/interfaces/company.interface";
import { IUser } from "@src/interfaces/user.interface";
import { IEventWithId } from "@src/interfaces/event.interface";
import { IVendorWithId } from "@src/interfaces/vendor.interface";

const seedDb = async () => {
  try {
    await connectDB();

    const eventData: IEventWithId[] = [
      {
        _id: new Types.ObjectId("66deac4f5604dd463b38f55e"),
        name: "Health Talks",
      },
      {
        _id: new Types.ObjectId("66deac5d7e7cefe71e7472f7"),
        name: "Onsite Screening",
      },
      {
        _id: new Types.ObjectId("66deaca6bdd74f38f288e7b9"),
        name: "Mental Wellness Workshop",
      },
    ];

    const companyData: ICompanyWithId[] = [
      {
        _id: new Types.ObjectId("667c1e6ce72a3edc52661a18"),
        name: "Company A",
      },
      {
        _id: new Types.ObjectId("66df2ffc8b31ea154bf05c02"),
        name: "Company B",
      },
    ];

    const vendorData: IVendorWithId[] = [
      {
        _id: new Types.ObjectId("66deab864682143f682a2a60"),
        name: "Vendor A",
        vendorTags: [
          new Types.ObjectId("66deac4f5604dd463b38f55e"),
          new Types.ObjectId("66deac5d7e7cefe71e7472f7"),
          new Types.ObjectId("66deaca6bdd74f38f288e7b9"),
        ],
      },
      {
        _id: new Types.ObjectId("66df30187c49f31970df4f41"),
        name: "Vendor B",
        vendorTags: [
          new Types.ObjectId("66deac4f5604dd463b38f55e"),
          new Types.ObjectId("66deac5d7e7cefe71e7472f7"),
        ],
      },
    ];

    const userData: IUser[] = [
      {
        username: "userhr1",
        password: await generateHashPassword("password123"),
        userType: "HR",
        role: "admin",
        company: new Types.ObjectId("667c1e6ce72a3edc52661a18"),
      },
      {
        username: "uservendor1",
        password: await generateHashPassword("password123"),
        userType: "Vendor",
        role: "admin",
        vendor: new Types.ObjectId("66deab864682143f682a2a60"),
      },
      {
        username: "userhr2",
        password: await generateHashPassword("password123"),
        userType: "HR",
        role: "admin",
        company: new Types.ObjectId("66df2ffc8b31ea154bf05c02"),
      },
      {
        username: "uservendor2",
        password: await generateHashPassword("password123"),
        userType: "Vendor",
        role: "admin",
        vendor: new Types.ObjectId("66df30187c49f31970df4f41"),
      },
    ];

    // seed event
    await Event.insertMany(eventData);
    logger.info("event seeded successfully!");

    // Seed company
    await Company.insertMany(companyData);
    logger.info("company seeded successfully!");

    // seed vendor
    await Vendor.insertMany(vendorData);
    logger.info("vendor seeded successfully!");

    // seed user
    await User.insertMany(userData);
    logger.info("user seeded successfully!");
  } catch (error) {
    logger.error("Error seeding data:", error);
    process.exit(1);
  } finally {
    mongoose.connection.close();
  }
};

seedDb();
