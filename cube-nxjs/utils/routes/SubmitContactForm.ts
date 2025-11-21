export const submitContactForm = async ({
  name,
  email,
  phone,
  interestedField,
  message,
}: {
  name: string;
  email: string;
  phone: string;
  interestedField: string;
  message: string;
}) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/contact-submissions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, phone, interestedField, message }),
    }
  );

  if (!response.ok) {
    throw new Error(`Server responded with status ${response.status}`);
  }

  return await response.json();
};
