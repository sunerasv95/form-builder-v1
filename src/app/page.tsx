import FormBuilder from "./components/form-builder/";

export default function Home() {
  return (
    <div className="grid h-screen grid-cols-[300px_1fr] mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 pt-[50px]">
      <FormBuilder />
    </div>
  );
}
