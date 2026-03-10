export { renderers } from '../../renderers.mjs';

const prerender = false;
async function POST({
  request
}) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    if (!file) {
      return new Response(JSON.stringify({
        error: "No file provided"
      }), {
        status: 400
      });
    }
    const cloudName = "dw4fmucml";
    const uploadPreset = "kinbo1";
    const uploadFormData = new FormData();
    uploadFormData.append("file", file);
    uploadFormData.append("upload_preset", uploadPreset);
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
      method: "POST",
      body: uploadFormData
    });
    const data = await response.json();
    if (data.secure_url) {
      return new Response(JSON.stringify({
        url: data.secure_url
      }), {
        status: 200
      });
    } else {
      console.error("Cloudinary Error:", data);
      return new Response(JSON.stringify({
        error: data.error?.message || "Upload failed"
      }), {
        status: 500
      });
    }
  } catch (e) {
    console.error("Upload API Error:", e);
    return new Response(JSON.stringify({
      error: e.message
    }), {
      status: 500
    });
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST,
    prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
