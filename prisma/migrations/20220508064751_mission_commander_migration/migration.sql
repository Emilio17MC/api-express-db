-- CreateTable
CREATE TABLE "MissionCommander" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "mainStack" TEXT NOT NULL,
    "currentEnrollment" BOOLEAN NOT NULL,
    "hasAzureCertification" BOOLEAN NOT NULL,

    CONSTRAINT "MissionCommander_pkey" PRIMARY KEY ("id")
);
