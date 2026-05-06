import { createFileRoute } from "@tanstack/react-router";
import ThankYouPage from "../../ui/page/ThankYouPage";

export const Route = createFileRoute("/thankyou/")({
  component: ThankYouPage,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      tid: search.tid as string | undefined,
    };
  },
});
