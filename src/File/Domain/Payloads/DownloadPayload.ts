import VersionPayload from './VersionPayload';
import IdPayload from '../../../Shared/Payloads/IdPayload';

interface DownloadPayload extends VersionPayload, IdPayload {}

export default DownloadPayload;
