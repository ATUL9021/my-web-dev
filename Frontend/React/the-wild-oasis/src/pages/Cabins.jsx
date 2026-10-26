import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { useEffect, useState } from "react";
import { getCabins } from "../services/apiCabins";
import CabinTable from "../features/cabins/CabinTable";
import { useQuery } from "@tanstack/react-query";
import Button from "../ui/Button";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import AddCabin from "../features/cabins/AddCabin";
function Cabins() {
  // useEffect(function () {
  //   async function get() {
  //     const cabins = await getCabins();
  //     console.log("autl", cabins);
  //   }

  //   get();
  // }, []);

  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  console.log(cabins);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter/Sort</p>
      </Row>

      <Row>
        <CabinTable cabins={cabins} isLoading={isLoading} error={error} />
        {/* <Button onClick={(e) => setShowForm(!showForm)}>Add new Cabin</Button>
        {showForm && <CreateCabinForm />} */}
        <AddCabin />
      </Row>
      <Row></Row>
    </>
  );
}

export default Cabins;
