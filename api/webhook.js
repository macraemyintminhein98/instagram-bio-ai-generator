import Stripe from 'stripe';
import OpenAI from 'openai';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET; // Set this in Vercel env vars

export default async (req, res) => {
  if (req.method === 'POST') {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
      event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
    } catch (err) {
      console.log(`Webhook Error: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const { interests, profession, mood, cta } = session.metadata;

      // Generate Bio using LLM
      const prompt = `Generate a ${mood} Instagram bio for someone interested in ${interests}, whose profession is ${profession}. Include this call to action if provided: ${cta || ''}. Keep it concise.`;
      
      try {
        const completion = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 60,
        });

        const generatedBio = completion.choices[0].message.content.trim();
        console.log('Generated Bio:', generatedBio); // Log bio for now; in production, save to DB or email user.

        // In a real app, you'd associate this bio with the user/session ID
        // and make it retrievable from the /success page or via email.
        // For this example, we're just logging it.
        
      } catch (llmError) {
        console.error('LLM Generation Error:', llmError);
        // Handle LLM error (e.g., retry, notify admin)
      }
    }

    res.status(200).json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};
