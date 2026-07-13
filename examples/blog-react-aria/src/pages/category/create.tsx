import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import type { HttpError } from "@refinedev/core";
import { useOverlayTriggerState } from "@react-stately/overlays";

import Modal from "../../components/Modal";
import Input from "../../components/Input";
import Button from "../../components/Button";

export const CategoryCreate: React.FC = () => {
  const state = useOverlayTriggerState({});

  const {
    refineCore: { onFinish },
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ title: string }, HttpError, { title: string }>({
    refineCoreProps: {
      onMutationSuccess: () => {
        state.close();
      },
    },
  });

  return (
    <div className="container">
      <div className="flex w-full justify-end">
        <Button onPress={state.open}>Create</Button>
      </div>
      <Modal overlayState={state} title="Create a category">
        <form
          onSubmit={handleSubmit(onFinish)}
          className="flex w-full flex-col gap-4"
        >
          <Controller
            control={control}
            name="title"
            rules={{ required: "field is required" }}
            render={({ field }) => (
              <>
                <Input {...field} type="text" placeholder="Title" />
                {errors?.title && (
                  <div className="mt-1 text-xs font-semibold text-red-500">
                    {errors.title.message}
                  </div>
                )}
              </>
            )}
          />
          <Button type="submit">Create</Button>
        </form>
      </Modal>
    </div>
  );
};
