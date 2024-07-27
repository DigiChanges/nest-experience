import { SetMetadata } from '@nestjs/common';

export const PAGINATE_DATA = 'PAGINATE_DATA';

const Paginate = () => SetMetadata(PAGINATE_DATA, true);

export default Paginate;
