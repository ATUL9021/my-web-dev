import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: deleteCabin,

    onSuccess: () => {
      toast.success("succesfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },

    onError: (e) => {
      toast.error(e.message);
    },
  });

  return { isDeleting, mutate };
}
