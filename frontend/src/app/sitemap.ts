import prisma from '@/lib/prisma'

const URL = process.env.NEXT_PUBLIC_URL

export default async function sitemap() {
   const products = (await prisma.equipment.findMany()).map(
      ({ id }) => ({
         url: `${URL}/products/${id}`,
         lastModified: new Date(),
      })
   )

   return [
      {
         url: URL,
         lastModified: new Date(),
      },
      {
         url: `${URL}/products`,
         lastModified: new Date(),
      },
      ...products,
   ]
}
