import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";
export function useUpdateSetting() {
  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutate: mutateSetting } = useMutation({
    mutationFn: updateSetting,
    onSuccess: (data) => {
      toast.success("settings updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },

    onError: (e) => {
      toast.error(e?.message);
    },
  });

  return { isUpdating, mutateSetting };
}
