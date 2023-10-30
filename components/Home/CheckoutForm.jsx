'use client';
import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { useRouter } from 'next/navigation';

function CheckoutForm({ amount }) {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (elements == null) {
      return;
    }
    const { error: submitError } = await elements.submit();
    if (submitError) return;

    const res = await fetch('/api/create-intent', {
      method: 'POST',
      body: JSON.stringify({
        amount: amount,
      }),
    });

    const secretKey = await res.json();
    console.log(secretKey);

    const { error } = await stripe.confirmPayment({
      clientSecret: secretKey,
      elements,
      confirmParams: {
        // return_url: 'http://localhost:3000',
        return_url: router.push('/Payment-confirm'),
      },
    });
  };

  return (
    <div className=" flex flex-col justify-center items-center w-full mt-10">
      <h2 className="m-5 font-bold underline underline-offset-2">
        Amount to pay {amount}
      </h2>
      <form
        onSubmit={handleSubmit}
        className=" max-w-md"
      >
        <PaymentElement />
        <button className=" w-full bg-black text-white rounded-lg mt-4 cursor-pointer active:scale-95">
          Pay
        </button>
      </form>
    </div>
  );
}

export default CheckoutForm;
