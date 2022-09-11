import { Vector2 } from "@/math";

export abstract class Body {
	public position: Vector2;

	public velocity = new Vector2(0, 0);

	public acceleration = new Vector2(0, 0);

	public mass: number;

	private _sumOfForces = Vector2.zero;

	constructor(position = Vector2.zero, mass = 1) {
		this.position = position;
		this.mass = mass;
	}

	public AddForce(force: Vector2): void {
		this._sumOfForces.Add(force);
	}

	public Integrate(dt: number): void {
		// Find the acceleration from the sum of forces and mass | a = F / m
		this.acceleration = this._sumOfForces.DivideScalar(this.mass);

		// Euler Method - Integrate the acceleration to find new velocity in the next frame | v = v0 + a * dt
		this.velocity.Add(Vector2.MultiplyScalar(this.acceleration, dt));

		// Euler Method - Integrate the velocity to find new position in the next frame | p = p0 + v * dt
		this.position.Add(Vector2.MultiplyScalar(this.velocity, dt));

		// Clear all forces for the next frame
		this._ClearForces();
	}

	private _ClearForces(): void {
		this._sumOfForces = Vector2.zero;
	}
}
