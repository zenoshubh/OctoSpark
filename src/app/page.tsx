import { type Metadata } from 'next';
import { PageClient } from './client';

export const metadata: Metadata = {
  title: 'OctoSpark | Reveal the Spark',
  description: 'Analyze any GitHub developer profile with OctoSpark - measure contributions, repository quality, community engagement, and technical diversity.',
};

export default async function Page() {
  return <PageClient />;
}
