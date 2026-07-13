/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  const { id } = params;
  const data = await fetch(`https://api.fake-rest.refine.dev/posts/${id}`).then(
    (res) => res.json(),
  );
  return data;
}
