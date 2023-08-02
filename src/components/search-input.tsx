import Icon from "@/components/lucide-icon";
import { useRouter } from "next/router";
import { type FormEvent } from "react";

function SearchInput() {
  const router = useRouter();

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { currentTarget: form } = event;
    const formData = new FormData(form);

    const search = formData.get("search") as string;

    if (!search) return;

    router.push(`/user/${search}/wall`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex border border-gray-400 rounded focus-within:border-pink-500 focus-within:ring-pink-500 focus-within:ring-1"
    >
      <label htmlFor="search-input" className="sr-only">
        Search
      </label>
      <input
        id="search-input"
        type="text"
        name="search"
        placeholder="Search users here..."
        className="flex-1 text-sm border-transparent rounded placeholder:text-gray-400 focus-within:border-transparent focus-within:ring-transparent"
      />
      <button className="px-4 group">
        <Icon
          name="search"
          width={20}
          height={20}
          className="transition-colors group-hover:text-pink-500"
        />
      </button>
    </form>
  );
}

export default SearchInput;
