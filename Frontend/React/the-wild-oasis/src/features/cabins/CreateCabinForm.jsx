import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin, editCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;
  console.log("editValues", editValues);
  let isEdit = Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEdit ? editValues : {},
  });
  const { errors } = formState;
  console.log("first", errors);
  console.log(errors?.name?.message);
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: mutateCreate } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("cabin created successfully");

      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });

      reset();
      onCloseModal?.();
    },

    onError: (e) => {
      toast.error(e.message);
    },
  });

  const { isLoading: isUpdating, mutate: mutateEdit } = useMutation({
    mutationFn: ({ newCabinData, id }) => editCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("cabin edited successfully");

      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });

      reset();
      onCloseModal?.();
    },

    onError: (e) => {
      toast.error(e.message);
    },
  });
  function onHandleSubmit(data) {
    console.log("my data", data.image[0]);
    if (isEdit) {
      if (typeof data.image === "string" || data.image instanceof String) {
        mutateEdit({ newCabinData: data, id: editId });
      } else {
        mutateEdit({ newCabin: { ...data, image: data.image[0] }, id: editId });
      }
    } else {
      mutateCreate({ ...data, image: data.image[0] });
    }
  }

  function onError(error) {
    console.log("eror from req fileds", error);
  }

  const isWorking = isCreating || isUpdating;
  return (
    <Form
      onSubmit={handleSubmit(onHandleSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This field is required",
            min: {
              value: 1,
              message: "value should be greater than 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) => {
              return (
                value <= Number(getValues().regularPrice) ||
                "discount should be less or equal than discount"
              );
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          {...register("image", {
            required: isEdit ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={(e) => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEdit ? "Edit cabin " : "Create cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
