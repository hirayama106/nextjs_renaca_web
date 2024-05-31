import type { Works } from '@/lib/microcms';
import { WorksListContainer, WorksListItem } from '@/components/works/list-item';
import { WorksPagination } from '@/components/works/pagination';

export const worksPerPage = 8;

export function WorksList({ contents, totalCount, currentPage }: { contents: Works[]; totalCount: number; currentPage: number }) {
	return (
		<>
			<WorksListContainer>
				{contents.map((item) => {
					return <WorksListItem key={item.id} id={item.id} image={`${item.image.url}?w=1000`} title={item.title} />;
				})}
			</WorksListContainer>
			{totalCount > worksPerPage && (
				<div className='pt-12'>
					<WorksPagination currentPage={currentPage} totalPage={Math.ceil(totalCount / worksPerPage)} />
				</div>
			)}
		</>
	);
}
