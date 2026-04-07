import { HomeClient } from '@/app/components/homeClient';
import { getWorkItems } from '@/src/work';

export default function Page() {
  return <HomeClient workItems={getWorkItems()} />;
}
