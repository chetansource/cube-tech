export async function submitNewsletter(email: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/newsletter`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "Newsletter subscription failed");
    }

    return data;
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    throw error;
  }
}
