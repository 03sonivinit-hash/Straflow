import { NextResponse } from "next/server";
import { z } from "zod";

const leadSchema = z.object({
  industry: z.string().min(1),
  companySize: z.string().min(1),
  currentSystems: z.array(z.string()).min(1),
  bottleneck: z.string().min(1),
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = leadSchema.parse(body);

    // If Supabase is configured, store the lead
    if (
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ) {
      const { createClient } = await import("@supabase/supabase-js");
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      );

      await supabase.from("leads").insert({
        industry: data.industry,
        company_size: data.companySize,
        current_systems: data.currentSystems,
        biggest_bottleneck: data.bottleneck,
        full_name: data.fullName,
        email: data.email,
        phone: data.phone || null,
        message: data.message || null,
        status: "new",
        source: "website",
      });
    }

    // If Resend is configured, send notification email
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: "StrataFlow <onboarding@resend.dev>",
        to: "strataflow.02@gmail.com",
        subject: `New Lead: ${data.fullName} — ${data.industry}`,
        html: `
          <h2>New System Assessment Submission</h2>
          <p><strong>Name:</strong> ${data.fullName}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone || "N/A"}</p>
          <p><strong>Industry:</strong> ${data.industry}</p>
          <p><strong>Company Size:</strong> ${data.companySize}</p>
          <p><strong>Current Systems:</strong> ${data.currentSystems.join(", ")}</p>
          <p><strong>Biggest Bottleneck:</strong> ${data.bottleneck}</p>
          <p><strong>Message:</strong> ${data.message || "N/A"}</p>
        `,
      });
    }

    return NextResponse.json(
      { success: true, message: "Lead captured successfully" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.issues },
        { status: 400 }
      );
    }

    console.error("Lead capture error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
