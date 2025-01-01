import { Card, CardContent } from "@/components/ui/card";
import { simpleBlogCard } from "./lib/interface";
import { client, urlFor} from "./lib/sanity";
import Image from 'next/image'
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const revalidate =30; 




async function getData() {
  const query =
  `
  *[_type== "blog"] | order(_createdAt desc) {
    title,
    smalDescription,
    "currentSlug": slug.current,
    "titleImage": titleImage.asset->url
  }
`;
//    `
//   *[_type== "blog"]| order(_createdAt desc){
//   title,
//     smalDescription,
//     "currentSlug":slug.current,
//     titleImage
    
// }`;
const data = await client.fetch(query);
return data;
}

export default async function Home() {
const data: simpleBlogCard[] = await getData();
console.log(data);



  return (
    <div className='grid grid-cols-1 mg:grid-cols-2 mt-5 gap-5'>
      {data.map((post, idx) => (
      
        <Card key={idx}>
        
        
        
         {/* <Image src={urlFor(post.titleImage).url()} alt="image" height={500} width={500}/> */}
         {/* <Image
            // src={urlFor(post.titleImage).url()}
            src={post.titleImage}
            // "https://cdn.sanity.io/images/project-id/dataset-id/image-id.jpg"
            alt="image"
            width={500}
            height={500}
            className="rounded-t-lg h-[200px] object-cover"
          /> */}
          <Image
  // src={post.titleImage || "/fallback-image.jpg"}
  src={post.titleImage ? urlFor(post.titleImage).url() : "/fallback-image.jpg"}
  width={800}
  height={800}
  alt="Title image"
/>


{/* <Image
  src={post.titleImage} // Directly use the resolved URL
  alt="image"
  width={500}
  height={500}
  className="rounded-t-lg h-[200px] object-cover"
/> */}
          <CardContent className="mt-5">
          <h3 className="text-lg line-clamp-2 font-bold">{post.title}</h3>
          <p className="text-sm line-clamp-3 mt-2 text-gray-600 dark:text-gray-300">{post.smalDescription}</p>
          <Button asChild className="w-full mt-7">
          <Link href={`/blog/${post.currentSlug}`}>Read More</Link>
          
          </Button>
          </CardContent>
          </Card>
      ))}
      
     
    </div>
   
  );
}
