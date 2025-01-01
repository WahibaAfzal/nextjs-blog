// // export default function BlogArticle(){
// //     return 
// //      <h1>hello from the blog article route</h1>
    
        
    
// }
import { fullBlog } from '@/app/lib/interface';
import { client, urlFor } from '@/app/lib/sanity'
import React from 'react'
import Image from 'next/image'
import { PortableText } from '@portabletext/react';

export const revalidate =30; 

async function getData(slug:string){
    const qurey =
//      `
//     *[_type == "blog" && slug.current == '${slug}']{
// "currentSlug":slug.current,
//   title,
//   content,
//   titleImage
// }[0]`

`
*[_type== "blog"] | order(_createdAt desc) {
  title,
  smalDescription,
  "currentSlug": slug.current,
  "titleImage": titleImage.asset->url
}
`;

const data = await client.fetch(qurey);
return data;
}

export default async function BlogArticle({params} : {params: {slug:string}}) {
    const data: fullBlog = await getData(params.slug)
    console.log(data)
    
  return (
    <div className='mt-8'>
        <h1>  <span className="block text-base text-center text-primary font-semibold tracking-wide uppercase">Wahiba Afzal - Blog</span>
        <span className='mt-2 block text-center leading-8 font-bold tracking-tight sm:text-4xl'>{data.title}</span></h1>


        <Image
        // src={data.titleImage || "/fallback-image.jpg"}
        src={data.titleImage ? urlFor(data.titleImage).url() : "/fallback-image.jpg"}
          width={800} height={800} alt='Title image' priority className='rounded-lg mt-8 border' />
        <div className='mt-16 prose prose-blue prose-xl dark:prose-invert prose-headings:underline prose-li:marker:text-primary prose-a:text-primary'>
            <PortableText value={data.content} />
        </div>
  
    </div>
  )
}




