import { createCabin } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useCreateCabin() {
  const queryClient = useQueryClient();
  const { isLoading: isCreating, mutate } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("cabin created successfully");

      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },

    onError: (e) => {
      toast.error(e.message);
    },
  });

  return { isCreating, mutate };
}
