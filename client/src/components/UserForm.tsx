import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 5; // 5MB
const schema = z.object({
  name: z.string().min(3, { message: "Name must be atleast 3 characters" }),
  age: z
    .number({ message: "Age field is required" })
    .min(18, { message: "Age must be atleast 18" }),
  email: z.string({ message: " field is required" }).email(),
  profilePicture: z
    .instanceof(File)
    .refine((file) => {
      return !file || file.size > MAX_UPLOAD_SIZE;
    }, "File size must be less than 5MB")
    .refine((file) => {
      return file.type == "image/png";
    }, "File must be a PNG"),
  cv: z
    .instanceof(File)
    .refine((file) => {
      return !file || file.size > MAX_UPLOAD_SIZE;
    }, "File size must be less than 5MB")
    .refine((file) => {
      return file.type == "image/png";
    }, "File must be a pdf"),
});
type FormData = z.infer<typeof schema>;
export default function UserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  console.log(errors.name?.message, isValid);
  const onSubmit = (data: FieldValues) => {
    console.log("Form data", data);
  };
  return (
    <form className="flex flex-col gap-10" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-3">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          {...register("name")}
          className="border rounded-md h-14 px-5"
        />
        {errors.name && <p className="text-red-600">{errors.name.message}</p>}
      </div>
      <div className="flex flex-col gap-3">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          {...register("email")}
          className="border rounded-md h-14 px-5"
        />
        {errors.email && <p className="text-red-600">{errors.email.message}</p>}
      </div>
      <div className="flex flex-col gap-3">
        <label htmlFor="age">Age</label>
        <input
          type="number"
          id="age"
          {...register("age", { valueAsNumber: true })}
          className="border rounded-md h-14 px-5"
        />
        {errors.age && <p className="text-red-600">{errors.age.message}</p>}
      </div>
      <div className="flex flex-col gap-3">
        <label htmlFor="profilePicture">profilePicture</label>
        <input
          type="file"
          id="ProfilePicture"
          {...register("profilePicture")}
          className="border rounded-md h-14 px-5"
        />
      </div>
      <div className="flex flex-col gap-3">
        <label htmlFor="cv">cv</label>
        <input
          type="file"
          id="cv"
          {...register("cv")}
          className="border rounded-md h-14 px-5"
        />
        {errors.cv && <p className="text-red-600">{errors.cv.message}</p>}
      </div>
      <button
        // disabled={!isValid}
        type="submit"
        className={`w-max px-5 h-14 rounded-md ${
          isValid ? "bg-cyan-900" : "bg-gray-600"
        }  text-white`}
      >
        Submit
      </button>
    </form>
  );
}
