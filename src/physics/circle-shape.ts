import { Shape, EShapeType } from './shape';

export class CircleShape extends Shape {
	private _radius: number;

	constructor(radius: number) {
		super(EShapeType.CIRCLE);

		this._radius = radius;
	}

	public get radius(): number {
		return this._radius;
	}

	public get getType(): EShapeType {
		return this._type;
	}

	public GetMomentOfInertia(mass: number): number {
		/**
		 * The moment of inertia of a circle is:
		 * I = r²/2 * m
		 *
		 * Notation:
		 * - I: Moment of inertia
		 * - r: Radius
		 * - m: Mass
		 */

		return (this._radius * this._radius) / 2 * mass;
	}
}

