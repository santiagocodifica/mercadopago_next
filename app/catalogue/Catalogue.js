import Link from "next/link"
import { getCatalogue } from "./getCatalogue"

export default async function Catalogue(){

  const catalogue = await getCatalogue()

  return(
    <ul className="grid grid-cols-4 gap-4">
      { catalogue.map(product => {
        return (
          <Link href={`/producto/${product._id}`} key={product._id}>
            <h3>{product.name}</h3>
            <div className="w-100 h-96 bg-gray-300"></div>
            <s className="text-red-500">${product.display_previous_price}</s>
            <p>${product.display_price}</p>
          </Link>
        )
      })}
    </ul>
  )
}