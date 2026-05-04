import { createFileRoute } from '@tanstack/react-router'
import ThankYouPage from "../../ui/page/ThankYouPage";

export const Route = createFileRoute('/thankyou/')({
  component: ThankYouPage,
})
