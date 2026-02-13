import ProductsPage from "./products/page";


export default function Home() {
  return (
    <div className="flex">
      <ProductsPage />
    </div>
  );
}


// -------------------------------
// import { redirect } from "next/navigation";

// export default function HomePage() {
//   redirect("/products");
// }