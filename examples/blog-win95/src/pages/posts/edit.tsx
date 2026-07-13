import { useForm } from "@refinedev/react-hook-form";
import { useSelect } from "@refinedev/core";
import {
  Select,
  GroupBox,
  Button,
  TextInput,
  Window,
  WindowHeader,
  WindowContent,
} from "react95";
import { Controller } from "react-hook-form";

export const PostEdit: React.FC = () => {
  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { options } = useSelect({
    resource: "categories",

    pagination: {
      mode: "server",
    },
  });

  return (
    <Window style={{ width: "100%", height: "100%" }}>
      <WindowHeader>
        <span>Edit Post</span>
      </WindowHeader>
      <WindowContent>
        <form onSubmit={handleSubmit(onFinish)}>
          <label>Title: </label>
          <br />
          <TextInput
            {...register("title", { required: true })}
            placeholder="Type here..."
          />
          {errors.title && <span>This field is required</span>}
          <br />
          <br />

          <Controller
            name="categoryId"
            control={control}
            render={({ field: { onChange, value } }) => (
              <GroupBox label={"Category"}>
                <Select
                  options={options}
                  menuMaxHeight={160}
                  width={160}
                  variant="flat"
                  onChange={(option) => onChange(option.value)}
                  value={value}
                />
              </GroupBox>
            )}
          />
          {errors.category && <span>This field is required</span>}
          <br />
          <label>Content: </label>
          <br />
          <TextInput
            {...register("content", { required: true })}
            multiline
            rows={10}
            cols={50}
          />

          {errors.content && <span>This field is required</span>}
          <br />
          <Button type="submit" value="Submit">
            Submit
          </Button>
          {formLoading && <p>Loading</p>}
        </form>
      </WindowContent>
    </Window>
  );
};
