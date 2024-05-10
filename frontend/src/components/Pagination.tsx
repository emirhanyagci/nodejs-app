import { useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import { POST_PER_PAGE } from "@/utils/constants";
export default function Pagination({ count }: { count: number }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = searchParams.get("page") || 1;
  const maxPage = Math.ceil(count / POST_PER_PAGE);

  function prevHandler() {
    if (currentPage === 1) return;

    const prevPage = Number(currentPage) - 1;
    searchParams.set("page", prevPage.toString());
    setSearchParams(searchParams);
  }
  function nextHandler() {
    if (currentPage === maxPage) return;
    const nextPage = Number(currentPage) + 1;
    searchParams.set("page", nextPage.toString());
    setSearchParams(searchParams);
  }
  return (
    <div>
      <Button
        disabled={+currentPage <= 1}
        onClick={prevHandler}
        variant="ghost"
      >
        Prev
      </Button>
      <Button
        disabled={+currentPage >= maxPage}
        onClick={nextHandler}
        variant="ghost"
      >
        Next
      </Button>
    </div>
  );
}
