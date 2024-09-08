-- CreateTable
CREATE TABLE "machines" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "isHeadless" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "machines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "app_users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(254) NOT NULL,
    "password" VARCHAR(128) NOT NULL,
    "role" VARCHAR(50) NOT NULL,

    CONSTRAINT "app_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bookings" (
    "id" SERIAL NOT NULL,
    "start_time" TIMESTAMPTZ(0) NOT NULL,
    "end_time" TIMESTAMPTZ(0) NOT NULL,
    "job_type" TEXT NOT NULL,
    "notes" TEXT,
    "dateCreated" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMPTZ(0) NOT NULL,
    "machineId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "bookings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "machines_name_key" ON "machines"("name");

-- CreateIndex
CREATE UNIQUE INDEX "app_users_name_key" ON "app_users"("name");

-- CreateIndex
CREATE UNIQUE INDEX "app_users_email_key" ON "app_users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "app_users_password_key" ON "app_users"("password");

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_machineId_fkey" FOREIGN KEY ("machineId") REFERENCES "machines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "app_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
