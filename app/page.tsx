import { HomeClient } from '@/app/components/homeClient';
import { workItems } from '@/src/data';

export default function Page() {
  return <HomeClient workItems={workItems} />;
}
