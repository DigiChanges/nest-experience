import { applyDecorators, SetMetadata, UseInterceptors } from '@nestjs/common';
import CriteriaInterceptor from '@shared/Criteria/CriteriaInterceptor';
import { MapCriteria } from '@shared/Criteria/MapCriteria';

export const CRITERIAS = 'CRITERIAS';

const Criterias = (filter: typeof MapCriteria, sort: typeof MapCriteria) =>
{
    return applyDecorators(
      SetMetadata(CRITERIAS, [filter, sort]),
      UseInterceptors(CriteriaInterceptor)
    );
};


export default Criterias;
