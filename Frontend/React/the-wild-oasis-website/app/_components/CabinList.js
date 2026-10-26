import CabinCard from "./CabinCard";
import { getCabins } from "../_lib/data-service";
import { unstable_noStore } from "next/cache";

async function CabinList({ filter }) {
  unstable_noStore();
  const cabins = await getCabins();
  let filteredCabins = null;
  if (!cabins.length) return null;

  if (filter === "small") {
    filteredCabins = cabins.filter((cabin) => {
      return cabin.maxCapacity <= 2;
    });
  } else if (filter === "medium") {
    filteredCabins = cabins.filter((cabin) => {
      return cabin.maxCapacity > 2 && cabin.maxCapacity <= 4;
    });
  } else if (filter === "large") {
    filteredCabins = cabins.filter((cabin) => {
      return cabin.maxCapacity > 4;
    });
  } else {
    filteredCabins = cabins;
  }

  console.log("length", filteredCabins.length);
  return (
    <div>
      {filteredCabins.length > 0 && (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
          {filteredCabins.map((cabin) => (
            <CabinCard cabin={cabin} key={cabin.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CabinList;
