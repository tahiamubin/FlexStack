import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(request) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");
    const userSession = await auth.api.getSession({
      headers: await headers(),
    });
    const user = userSession?.user;
    //console.log(user)

    const formData = await request.formData(); 
    const price = formData.get("price");
    const className = formData.get("className");
    const classId = formData.get("classId");

    const schedule = formData.get("schedule");

    

    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email,
      line_items: [
        {
          price_data: {
            currency: "USD",
            unit_amount: Number(price) * 100,
            product_data: {
              name: className,
              
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        price: price,
        userId: user?.id,
        userEmail: user?.email,
        schedule,
        className,
        classId,
      },
      mode: "payment",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel`,
    });

    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
