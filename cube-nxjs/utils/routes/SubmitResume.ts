export async function submitResume({
  fullName,
  number,
  file,
  jobId,
}: {
  fullName: string;
  number: string;
  file: File;
  jobId?: string;
}) {
  try {
    // Upload resume file to Payload's media collection
    const formData = new FormData();
    formData.append("file", file);

    const uploadRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/media`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!uploadRes.ok) throw new Error("Resume upload failed");

    const uploaded = await uploadRes.json();
    const uploadedFileId = uploaded?.doc?.id;

    // Submit resume entry to resumes collection
    const resumeRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/resumes`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          number,
          jobId: jobId || null,
          resumeUpload: uploadedFileId,
        }),
      }
    );

    if (!resumeRes.ok) throw new Error("Resume submission failed");

    return await resumeRes.json();
  } catch (error) {
    console.error("Error submitting resume:", error);
    throw error;
  }
}
