import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import authService from "../appwrite/auth";
import { login } from "../store/authSlice";

export default function Profile() {
  const userData = useSelector((state) => state.auth.userData);
  const { register, handleSubmit, reset } = useForm({ defaultValues: { name: userData?.name || "" } });
  const dispatch = useDispatch();

  useEffect(() => {
    reset({ name: userData?.name || "" });
  }, [userData, reset]);

  const onSubmit = async ({ name }) => {
    try {
      const updated = await authService.updateName(name);
      if (updated) {
        const user = await authService.getCurrentUser();
        dispatch(login({ userData: user }));
        alert("Name updated successfully");
      }
    } catch (error) {
      console.error("Update name failed", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-surface shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Update Name</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">New Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="w-full px-3 py-2 rounded border bg-input text-body"
          />
        </div>
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
          Update
        </button>
      </form>
    </div>
  );
}
