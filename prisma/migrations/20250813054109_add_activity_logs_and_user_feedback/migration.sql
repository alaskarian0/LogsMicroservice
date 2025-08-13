-- CreateTable
CREATE TABLE "public"."activity_logs" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "system_id" INTEGER NOT NULL,
    "ip_address" INET,
    "action" VARCHAR(255) NOT NULL,
    "details" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "activity_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."user_feedback" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "system_id" INTEGER NOT NULL,
    "activity_log_id" INTEGER NOT NULL,
    "comment" VARCHAR(255),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_feedback_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."user_feedback" ADD CONSTRAINT "user_feedback_activity_log_id_fkey" FOREIGN KEY ("activity_log_id") REFERENCES "public"."activity_logs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
