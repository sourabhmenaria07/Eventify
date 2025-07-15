import { useForm } from "react-hook-form";
import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Input from "../Input";
import Select from "../Select";
import ToggleBtn from "../ToggleBtn";
import Textarea from "../Textarea";
import databaseService from "../../../appwrite/database";
import Button from "../Button";

function EventForm({ event }) {
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    // formState: { errors },
  } = useForm({
    defaultValues: {
      title: event?.title || "",
      slug: event?.slug || "",
      description: event?.description || "",
      category: event?.category || "",
      isFree: event?.isFree ? "Free" : "Paid",
      price: event?.price || "",
      discount: event?.discount || "",
      date: event?.date ? event.date.split("T")[0] : "",
      time: event?.time ? event.date.split("T")[1]?.slice(0, 5) : "",
      location: event?.location || "",
      organizer: userData?.name || "",
    },
  });

  const options = ["Music", "Tech", "Education"];

  const onSubmit = async (data) => {
    try {
      const file = data.image[0]
        ? await databaseService.uploadCover(data.image[0])
        : null;

      data.organizer = userData.name;
      data.date = new Date(`${data.date}T${data.time}`).toISOString();
      delete data.time;

      if (event) {
        if (data.slug !== event.slug) {
          const existing = await databaseService.getEventsBySlug(data.slug);

          // If a doc is found and it's not the same one, show error
          if (existing && existing.$id !== event.$id) {
            alert("Slug already exists. Please choose a different title.");
            return;
          }
        }
        if (file && event.coverImage) {
          await databaseService.deleteCover(event.coverImage);
        }

        const updated = databaseService.editEvent(event.$id, {
          ...data,
          isFree: data.isFree === "Free",
          price: data.isFree === "Free" ? 0 : Number(data.price),
          discount: data.isFree === "Free" ? 0 : Number(data.discount),
          coverImage: file ? file.$id : event.coverImage,
        });

        if (updated) {
          navigate(`/event/${updated.slug}`);
        }
      } else {
        const existing = await databaseService.getEventsBySlug(data.slug);

        if (existing) {
          alert("Slug already exists. Please use a different title.");
          return;
        }

        if (!file) {
          alert("Please upload a cover image.");
          return;
        }

        const created = await databaseService.createEvent({
          ...data,
          isFree: data.isFree === "Free",
          price: data.isFree === "Free" ? 0 : Number(data.price),
          discount: data.isFree === "Free" ? 0 : Number(data.discount),
          coverImage: file.$id,
          userId: userData.$id,
        });

        if (created) {
          navigate(`/event/${created.slug}`);
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-") // replace non-alphanumerics with hyphen
        .replace(/^-+|-+$/g, ""); // remove leading/trailing hyphens

    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title, { shouldValidate: true }));
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  return (
    <>
      <h2 className="text-2xl font-semibold text-[#f06543] my-4 text-center">
        {event ? `Edit: ${event.title}` : "Create a New Event"}
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:flex-row gap-24 p-4 mx-12"
      >
        <div className="w-full md:w-2/3 space-y-4">
          <Input
            label="Title"
            placeholder="Title"
            // className="mb-4"
            {...register("title", {
              required: true,
            })}
          />
          <Input
            label="Slug"
            placeholder="Slug"
            // className="mb-4"
            {...register("slug", { required: true })}
            onBlur={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), {
                shouldValidate: true,
              });
            }}
          />
          <Textarea
            label="Description"
            placeholder="Enter your event description"
            // className="mb-4"
            {...register("description", {
              required: true,
            })}
          />
          <Input
            label="Location"
            type="text"
            className="mb-4"
            placeholder="Location"
            {...register("location", {
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
        </div>

        <div className="w-full md:w-1/3 space-y-4">
          {event?.coverImage && (
            <img
              src={databaseService.getFilePreview(event.coverImage)}
              alt={event.title || "Event cover"}
              className="w-full rounded-lg object-cover"
            />
          )}
          <Input
            label="Cover Image"
            type="file"
            // className="mb-2"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("coverImage", {
              required: !event,
            })}
          />
          <Select
            label="Category"
            // className="mb-4"
            options={options}
            {...register("category", {
              required: true,
            })}
          />
          <ToggleBtn
            labels={["Free", "Paid"]}
            name="isFree"
            control={control}
            className="my-6"
          />

          {watch("isFree") === "Paid" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Price (₹)"
                type="number"
                {...register("price", { required: true })}
              />
              <Input
                label="Discount (%)"
                type="number"
                {...register("discount")}
              />
            </div>
          )}

          <Button type="submit" className="w-full max-w-xs block mx-auto mt-10">
            {event ? "Update Event" : "Create Event"}
          </Button>
        </div>
      </form>
    </>
  );
}

export default EventForm;
