export default async function getPastOrder(order) {
  await new Promise((resolve) => setTimeout(resolve, 4000)); // fake a delay like there's real network delay

  const response = await fetch(`/api/past-order/${order}`);
  const data = await response.json();
  return data;
}
