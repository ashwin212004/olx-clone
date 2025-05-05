import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51Q6X5XK3sk3b8D6f9qpQcjL1m6Sf63JNZ4o7dNj5bXKy4c3qJi0bVItYSqvi41nTaN3k690o9GmNqj46WjFQglaj00k6h4vtuQ');
const dopayment = async (formData,user)=> {
    try {
        const stripe = await stripePromise;
  
        const response = await fetch('http://localhost:4000/create-checkout-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: user.username,
            email: user.email,
            amount: formData.price,
            productname:formData.pname
          }),
        });
  
        const session = await response.json();
        const result = await stripe.redirectToCheckout({
          sessionId: session.id,
        });
  
        if (result.error) {
          console.log(result.error.message)
        }
      } catch (error) {
        console.log(error,"something went wrong")
      }
}

export default dopayment