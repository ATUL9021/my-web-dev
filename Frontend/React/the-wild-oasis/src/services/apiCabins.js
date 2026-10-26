import supabase from "./supabase";

export async function getCabins() {
  let { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return cabins;
}

export async function editCabin(newCabin, id) {
  let isImageString = false;
  if (typeof newCabin.image === "string" || newCabin.image instanceof String) {
    isImageString = true;
  }

  let imageName = "";
  let imagePath = "";
  if (isImageString) {
    imagePath = newCabin.image;
  } else {
    imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");
    imagePath = `https://blnnffxkcxotrhltqrqb.supabase.co/storage/v1/object/public/cabin-images/${imageName}`;
  }

  if (!isImageString) {
    const { error: imageUploadedError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);

    if (imageUploadedError) {
      console.log(imageUploadedError);
      throw new Error("Image was not uploaded and data is not updated");
    }
  }

  const { data, error } = await supabase
    .from("cabins")
    .update({ ...newCabin, image: imagePath })
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be edited");
  }

  return data;
}

export async function createCabin(newCabin) {
  let isImageString = false;
  if (typeof newCabin.image === "string" || newCabin.image instanceof String) {
    isImageString = true;
  }

  if (isImageString) {
    const { data, error } = await supabase
      .from("cabins")
      .insert([{ ...newCabin }])
      .select();

    if (error) {
      console.error(error);
      throw new Error("Cabins could not be created");
    }
    return data;
  }
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    "",
  );
  const imagePath = `https://blnnffxkcxotrhltqrqb.supabase.co/storage/v1/object/public/cabin-images/${imageName}`;

  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be created");
  }
  const { error: imageUploadedError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (imageUploadedError) {
    let { error: imageDeletedError } = await supabase
      .from("cabins")
      .delete()
      .eq("id", data.id);

    console.log(imageUploadedError);
    throw new Error("Image was not uploaded and data is not created");
  }

  return data;
}
export async function deleteCabin(id) {
  let { data: cabins, error } = await supabase
    .from("cabins")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted");
  }

  return cabins;
}
