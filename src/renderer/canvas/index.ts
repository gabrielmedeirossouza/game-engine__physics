import { Vector2 } from '@/math';

import { Line } from './line';
import { Clear } from './clear';
import { Polygon } from './polygon';
import { Circle } from './circle';

const COLORS_TYPE = {
	black: '#1A202C',
	red: '#E53E3E',
	blue: '#2B6CB0',
	purple: '#B83280',
	white: '#FFFFFF',
};

export class Canvas {
	public static Clear(): void {
		new Clear();
	}

	public static Circle(origin: Vector2, radius:  number): void {
		new Circle(origin, radius, COLORS_TYPE.white);
	}

	public static Line(origin: Vector2, line: Vector2): void {
		new Line(origin, line, COLORS_TYPE.white);
	}

	public static Polygon(origin: Vector2, vertices: Vector2[]): void {
		new Polygon(origin, vertices, COLORS_TYPE.white);
	}
}
