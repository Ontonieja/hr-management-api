import { PrismaClient } from "@prisma/client/extension";
import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended";

import prisma from "./prisma/db";

jest.mock("./prisma/db", () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

beforeEach(() => {
  mockReset(prismaMock);
});

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;
