export default function Category({ params }: { params: { slug: string } }) {
  return <h1>Category: {params.slug}</h1>;
}