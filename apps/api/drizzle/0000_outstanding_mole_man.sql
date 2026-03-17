CREATE TABLE "expenses" (
	"id" uuid PRIMARY KEY NOT NULL,
	"amount" numeric(12, 2) NOT NULL,
	"category" text NOT NULL,
	"payment_type" text NOT NULL,
	"bank" text,
	"date" date NOT NULL,
	"note" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"user_id" uuid NOT NULL,
	CONSTRAINT "category_check" CHECK ("expenses"."category" in ('general','food','transportation','bills','subscriptions','shopping','entertainment')),
	CONSTRAINT "payment_type_check" CHECK ("expenses"."payment_type" in ('cash','online')),
	CONSTRAINT "bank_check" CHECK ("expenses"."bank" in ('gcash','maya','maribank') or "expenses"."bank" is null),
	CONSTRAINT "bank_required_for_online" CHECK (("expenses"."payment_type" = 'online' and "expenses"."bank" is not null) or ("expenses"."payment_type" = 'cash' and "expenses"."bank" is null)),
	CONSTRAINT "amount_positive" CHECK ("expenses"."amount" > 0)
);
