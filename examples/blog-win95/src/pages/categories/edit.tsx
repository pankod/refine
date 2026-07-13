import { useForm } from "@refinedev/react-hook-form";
import {
  Button,
  TextInput,
  Window,
  WindowHeader,
  WindowContent,
} from "react95";

export const CategoryEdit: React.FC = () => {
  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <Window style={{ width: "100%", height: "100%" }}>
      <WindowHeader>
        <span>Edit Category</span>
      </WindowHeader>
      <WindowContent>
        <form onSubmit={handleSubmit(onFinish)}>
          <label>Title: </label>
          <br />
          <br />
          <TextInput
            {...register("title", { required: true })}
            placeholder="Type here..."
          />
          {errors.title && <span>This field is required</span>}
          <br />
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
