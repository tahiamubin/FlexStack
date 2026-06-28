'use client'
import { Pagination } from "@heroui/react";
import { useRouter } from "next/navigation";

const PaginationForum = ({ totalPage, currentPage }) => {
  const router = useRouter();

  return (
    <div>
      <Pagination className="justify-center">
        <Pagination.Content>
          <Pagination.Item>
            <Pagination.Previous
              isDisabled={currentPage === 1}
              onPress={() => router.push(`?page=${currentPage - 1}`)}
            >
              <Pagination.PreviousIcon />
              <span>Previous</span>
            </Pagination.Previous>
          </Pagination.Item>

          {Array.from({ length: totalPage }, (_, i) => i + 1).map((p) => (
            <Pagination.Item key={p}>
              <Pagination.Link
                isActive={p === currentPage}
                onPress={() => router.push(`?page=${p}`)}
              >
                {p}
              </Pagination.Link>
            </Pagination.Item>
          ))}

          <Pagination.Item>
            <Pagination.Next
              isDisabled={currentPage === totalPage}
              onPress={() => router.push(`?page=${currentPage + 1}`)}
            >
              <span>Next</span>
              <Pagination.NextIcon />
            </Pagination.Next>
          </Pagination.Item>
        </Pagination.Content>
      </Pagination>
    </div>
  );
};

export default PaginationForum;