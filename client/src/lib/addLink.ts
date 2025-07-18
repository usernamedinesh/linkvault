export const addLink = async (
  token: string,
  link: { title: string; url: string; tags: string }
) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/link/add-link`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(link),
    });

    const data = await res.json();
    return { success: res.ok, data };
  } catch (err) {
    console.error("addLink error", err);
    return { success: false, data: null, error: err };
  }
};

