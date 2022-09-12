import { Vector2 } from "@/math";

export abstract class Body {
	public mass: number;

	protected _velocity = new Vector2(0, 0);

	protected _position: Vector2;

	protected _acceleration = new Vector2(0, 0);

	private _sumOfForces = Vector2.zero;

	constructor(position = Vector2.zero, mass = 1) {
		this._position = position;
		this.mass = mass;
	}

	public get position(): Vector2 {
		return this._position;
	}

	public get velocity(): Vector2 {
		return this._velocity;
	}

	public get acceleration(): Vector2 {
		return this._acceleration;
	}

	public AddForce(force: Vector2): void {
		this._sumOfForces.Add(force);
	}

	public Integrate(dt: number): void {
		// Find the acceleration from the sum of forces and mass | a = F / m
		this._acceleration = this._sumOfForces.DivideScalar(this.mass);

		// Euler Method - Integrate the acceleration to find new velocity in the next frame | v = v0 + a * dt
		this._velocity.Add(Vector2.MultiplyScalar(this._acceleration, dt));

		// Euler Method - Integrate the velocity to find new position in the next frame | p = p0 + v * dt
		this._position.Add(Vector2.MultiplyScalar(this._velocity, dt));

		// Clear all forces for the next frame
		this._ClearForces();
	}

	private _ClearForces(): void {
		this._sumOfForces = Vector2.zero;
	}
}
