import CastMember from './CastMember';
import CrewMember from './CrewMember';

interface Credits {
  id: number;
  cast: Array<CastMember>;
  crew: Array<CrewMember>;
}

export default Credits;
