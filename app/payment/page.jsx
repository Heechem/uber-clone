'use client';
import CheckoutForm from './../components/Home/CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
import { useSearchParams } from 'next/navigation';
import { Elements } from '@stripe/react-stripe-js';
function Payment() {
  const searchParam = useSearchParams();
  const amount = searchParam.get('amount');
  console.log(amount);
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY
  );
  const options = {
    mode: 'payment',
    amount: Math.round(amount * 100),
    currency: 'cad',
  };
  return (
    <Elements
      stripe={stripePromise}
      options={options}
    >
      <CheckoutForm amount={amount} />
    </Elements>
  );
}

export default Payment;
