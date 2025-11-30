import { NextResponse } from 'next/server';
import { AVAILABLE_STRATEGIES } from '@/strategy/registry';

export async function GET() {
    const strategies = Object.keys(AVAILABLE_STRATEGIES).map(key => ({
        id: key,
        name: key.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') // Simple title case
    }));

    return NextResponse.json(strategies);
}
