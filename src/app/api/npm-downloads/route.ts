import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const packageName = searchParams.get('package');

  if (!packageName) {
    return NextResponse.json({ error: 'Package name is required' }, { status: 400 });
  }

  try {
    const today = new Date().toISOString().split('T')[0];
    const startDate = '2026-01-01';

    const response = await fetch(
      `https://api.npmjs.org/downloads/point/${startDate}:${today}/${packageName}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );

    if (!response.ok) {
      throw new Error('Failed to fetch npm downloads');
    }

    const data = await response.json();

    return NextResponse.json({
      downloads: data.downloads,
      package: data.package,
      start: data.start,
      end: data.end
    });
  } catch (error) {
    console.error('Error fetching npm downloads:', error);
    return NextResponse.json(
      { error: 'Failed to fetch download statistics' },
      { status: 500 }
    );
  }
}
