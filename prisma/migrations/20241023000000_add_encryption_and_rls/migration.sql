-- Enable Row Level Security on Transaction table
ALTER TABLE "Transaction" ENABLE ROW LEVEL SECURITY;

-- Create policy for users to only access their own transactions
-- Note: This assumes you have a way to set current_user_id in session
-- For Prisma/PostgreSQL, you might need to use a custom session variable
-- This is a basic setup; adjust based on your auth system
CREATE POLICY user_own_transactions ON "Transaction"
  FOR ALL
  USING (userId = current_setting('app.current_user_id', true)::text);

-- Note: You need to set the session variable before queries
-- e.g., SET app.current_user_id = 'user-id';
-- This can be done in your application code before running queries
