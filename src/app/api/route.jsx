import { createClient } from "@supabase/supabase-js";
import { auth } from "@clerk/nextjs/server";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST() {
  const { userId } = await auth();

  const { data, error } = await supabase
    .from("users")
    .insert({ clerk_user_id: userId });

  return Response.json({ data, error });
}
