"use client";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import StyledComponentsRegistry from "./AntdRegistry";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK!);

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    // redux provider
    <Provider store={store}>
      {/* ant design provider */}
      <StyledComponentsRegistry>
        {/* stripe provider */}
        <Elements stripe={stripePromise}>{children}</Elements>
      </StyledComponentsRegistry>
    </Provider>
  );
};

export default Providers;
