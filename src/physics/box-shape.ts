import { Vector2 } from '@/math';
import { Shape, EShapeType } from './shape';

export class BoxShape extends Shape {
	private _width: number;

	private _height: number;

	private _localVertices: Vector2[] = [];

	private _worldVertices: Vector2[] = [];

	constructor(width: number, height: number) {
		super(EShapeType.BOX);

		this._width = width;
		this._height = height;

		this._localVertices = [
			new Vector2(-this._width / 2, -this._height / 2),
			new Vector2(this._width / 2, -this._height / 2),
			new Vector2(this._width / 2, this._height / 2),
			new Vector2(-this._width / 2, this._height / 2)
		];

		this._worldVertices = [
			new Vector2(-this._width / 2, -this._height / 2),
			new Vector2(this._width / 2, -this._height / 2),
			new Vector2(this._width / 2, this._height / 2),
			new Vector2(-this._width / 2, this._height / 2)
		];
	}

	public get width(): number {
		return this._width;
	}

	public get height(): number {
		return this._height;
	}

	public get getLocalVertices(): Vector2[] {
		return this._localVertices;
	}

	public get getWorldVertices(): Vector2[] {
		return this._worldVertices;
	}

	public UpdateVertices(position: Vector2, angle: number): void {
		for (let i = 0; i < this._localVertices.length; i++) {
			this._worldVertices[i] = Vector2.Rotate(this._localVertices[i], angle);
			this._worldVertices[i] = Vector2.Add(this._worldVertices[i], position);
		}
	}

	public GetMomentOfInertia(mass: number): number {
		/**
     * The moment of inertia of a rectangle is:
     * I = 1/12 * m * (w² + h²)
     *
     * Notation:
     * - I: Moment of inertia
     * - m: Mass
     * - w: Width
     * - h: Height
     */

		return (1 / 12) * mass * (this._width * this._width + this.height * this.height);
	}
}
