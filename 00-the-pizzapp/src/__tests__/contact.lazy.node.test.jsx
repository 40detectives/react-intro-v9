import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import createFetchMock from "vitest-fetch-mock";
import { Route } from "../routes/contact.lazy";

const queryClient = new QueryClient();

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

test("Can submit contact form", async () => {
  fetchMocker.mockResponse(JSON.stringify({ status: "ok" }));
  const screen = render(
    <QueryClientProvider client={queryClient}>
      <Route.options.component />
    </QueryClientProvider>,
  );

  const nameInput = screen.getByPlaceholderText("Name");
  const eamilInput = screen.getByPlaceholderText("Email");
  const msgTxtArea = screen.getByPlaceholderText("Message");

  const testData = {
    name: "Brian",
    email: "dustinshatemail@example.com",
    message: "just let Brian teach, Dustin",
  };

  nameInput.value = testData.name;
  eamilInput.value = testData.email;
  msgTxtArea.value = testData.message;

  const btn = screen.getByRole("button");
  btn.click();

  const h3 = await screen.findByRole("heading", { level: 3 });
  expect(h3.innerText).toContain("Submitted");

  const requests = fetchMocker.requests();
  expect(requests.length).toBe(1);
  expect(requests[0].url).toBe(new URL("/api/contact", location.origin).href);
  expect(fetchMocker).toHaveBeenCalledWith("/api/contact", {
    body: JSON.stringify(testData),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  });
});
