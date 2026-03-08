import { s as supabaseAdmin } from '../../chunks/supabase_C2AHM8W4.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
async function GET() {
  try {
    if (!supabaseAdmin) {
      return new Response(JSON.stringify({
        error: "Supabase client not initialized.",
        details: "Check PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables."
      }), {
        status: 500
      });
    }
    const {
      data,
      error
    } = await supabaseAdmin.from("posts").select("*").order("date", {
      ascending: false
    });
    if (error) throw error;
    const formattedPosts = data.map((post) => ({
      slug: post.slug,
      title: post.title,
      category: post.category,
      date: post.date,
      excerpt: post.excerpt,
      body: post.body
    }));
    return new Response(JSON.stringify(formattedPosts), {
      status: 200
    });
  } catch (e) {
    console.error("API Blog GET Error:", e);
    return new Response(JSON.stringify({
      error: "Internal Server Error",
      message: e.message,
      stack: e.stack
    }), {
      status: 500
    });
  }
}
async function POST({
  request
}) {
  try {
    if (!supabaseAdmin) {
      return new Response(JSON.stringify({
        error: "Supabase client not initialized."
      }), {
        status: 500
      });
    }
    const {
      slug,
      title,
      category,
      date,
      excerpt,
      body
    } = await request.json();
    const {
      error
    } = await supabaseAdmin.from("posts").upsert({
      slug,
      title,
      category,
      date,
      excerpt,
      body,
      updated_at: (/* @__PURE__ */ new Date()).toISOString()
    });
    if (error) throw error;
    return new Response(JSON.stringify({
      success: true
    }), {
      status: 200
    });
  } catch (e) {
    console.error("API Blog POST Error:", e);
    return new Response(JSON.stringify({
      error: "Internal Server Error",
      message: e.message,
      stack: e.stack
    }), {
      status: 500
    });
  }
}
async function DELETE({
  request
}) {
  try {
    if (!supabaseAdmin) {
      return new Response(JSON.stringify({
        error: "Supabase client not initialized."
      }), {
        status: 500
      });
    }
    const url = new URL(request.url);
    const slug = url.searchParams.get("slug");
    if (!slug) return new Response("Missing slug", {
      status: 400
    });
    const {
      error
    } = await supabaseAdmin.from("posts").delete().eq("slug", slug);
    if (error) throw error;
    return new Response(JSON.stringify({
      success: true
    }), {
      status: 200
    });
  } catch (e) {
    console.error("API Blog DELETE Error:", e);
    return new Response(JSON.stringify({
      error: "Internal Server Error",
      message: e.message,
      stack: e.stack
    }), {
      status: 500
    });
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    DELETE,
    GET,
    POST,
    prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
