import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination';

interface Props {
	currentPage: number;
	totalPage: number;
}

export function WorksPagination({ currentPage, totalPage }: Props) {
	const displayPages = [];
	const items = [];

	for (let i = 1; i <= totalPage; i++) {
		if (i == 1 || i == totalPage || (i >= currentPage - 2 && i <= currentPage + 2)) {
			displayPages.push(i);
		}
	}

	let previousPage = 0;

	for (const page of displayPages) {
		if (previousPage) {
			if (page - previousPage === 2) {
				items.push(
					<PaginationItem key={previousPage + 1}>
						<PaginationLink
							href={previousPage === 1 ? `/works/` : `/works/page/${previousPage + 1}/`}
							isActive={previousPage + 1 === currentPage}
						>
							{previousPage + 1}
						</PaginationLink>
					</PaginationItem>
				);
			} else if (page - previousPage > 2) {
				items.push(<PaginationEllipsis key={previousPage + 1} />);
			}
		}
		items.push(
			<PaginationItem key={page}>
				<PaginationLink href={page === 1 ? `/works/` : `/works/page/${page}/`} isActive={page === currentPage}>
					{page}
				</PaginationLink>
			</PaginationItem>
		);
		previousPage = page;
	}

	return (
		<Pagination>
			<PaginationContent>{items}</PaginationContent>
		</Pagination>
	);
}
