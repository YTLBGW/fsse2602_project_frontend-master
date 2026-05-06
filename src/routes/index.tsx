import { createFileRoute } from "@tanstack/react-router";
import HomePage from "../ui/page/HomePage/HomePage";

export const Route = createFileRoute("/")({
  component: HomePage,
});
