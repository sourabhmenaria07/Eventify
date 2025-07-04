import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";

function EventForm({ event }) {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  return (
    <form>
      <div>
        <Input
          label="Title"
          placeholder="Title"
          className="mb-4"
          {...register("title", {
            required: true,
          })}
        />
        <Input
          label="Slug"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", {
            required: true,
          })}
        />
        <Input
          label="Description"
          placeholder="Description"
          className="mb-4"
          {...register("description", {
            required: true,
          })}
        />
        <Input
          label="Date"
          type="date"
          className="mb-4"
          placeholder="Date"
          {...register("date", {
            required: true,
          })}
        />
        <Input
          label="Time"
          type="time"
          className="mb-4"
          placeholder="Time"
          {...register("time", {
            required: true,
          })}
        />
        <Select
          label="Category"
          className="mb-4"
          options={[]}
          {...register("category", {
            required: true,
          })}
        />
        <Input
          label="Cover Image"
          type="file"
          className="mb-4"
          placeholder="choose image:"
          {...register("coverImage", {
            required: true,
          })}
        />
      </div>
    </form>
  );
}

export default EventForm;
