import DownloadPayload from '../../Domain/Payloads/DownloadPayload';

class DownloadQuery {
  constructor(public payload: DownloadPayload) {}
}

export default DownloadQuery;
